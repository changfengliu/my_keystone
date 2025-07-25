import axios from "axios";
import { getLoginApi } from "../options";
import WechatAuthUser from "../types/WeichatAuthUser";
import { KeystoneContext } from "@keystone-6/core/types";
import WechatLoginRawResponse from "../types/WechatLoginRawResponse";

async function resolveWechatLogin(
  source: unknown,
  { code }: { code: string },
  context: KeystoneContext
): Promise<{ token: string; user: WechatAuthUser }> {
  /**
   * 1. 请求微信接口获取 openid / session_key / unionid
   * 参考：https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
   */
  const url = getLoginApi(code as string);
  const response = await axios.get<WechatLoginRawResponse>(url);
  const { openid, session_key, unionid, errcode, errmsg } = response.data;
  // console.log("wechat login response", response.data);
  if (errcode) throw new Error("微信登录失败: " + errmsg);

  const sessionKey = session_key;
  const mockEmail = `${openid}@wechat.com`;
  const queryUser =
    "id name nickname phone email avatar { url width height } gender birthday openid createdAt lastLoginAt";

  /**
   * 2. 根据 openid 查找 WechatUser
   */
  let user = await context.query.User.findOne({
    where: { email: mockEmail }, // 临时使用 email 作为查询条件, 微信用户 email 格式如 mockEmail.
    query: queryUser,
  });
  let wechatUser; // 微信用户副表信息。
  const lastLoginIP = context.req?.socket?.remoteAddress || context.req?.headers["x-forwarded-for"] || "未知"; // 获取客户端 IP 地址

  /**
   * 2.1 老用户
   */
  if (user) {
    console.log("老用户登录：", user);
    const userId = user.id.toString();
    // 更新 User 主表记录
    user = await context.query.User.updateOne({
      where: { id: userId },
      data: {
        lastLoginIP,
        loginCount: ((user.loginCount as number) || 0) + 1,
        lastLoginAt: new Date(),
      },
      query: queryUser,
    });
    // 更新 WechatUser 副表记录 - sessionKey
    wechatUser = await context.db.WechatUser.updateOne({ where: { openid }, data: { sessionKey } });
    if (!wechatUser) throw new Error("更新微信用户信息失败");
  } else {
    /**
     * 2.2 新用户
     */
    // 创建 User 主表记录
    user = await context.db.User.createOne({
      data: {
        name: `微信用户_${openid}`,
        nickname: `微信用户`,
        userType: "wechat",
        openid,
        email: mockEmail, // 伪邮箱
        phone: openid, // 临时使用 openid 作为 phone
        password: Math.random().toString(36).slice(-8), // 生成随机密码
        lastLoginAt: new Date(),
        lastLoginIP: lastLoginIP,
        loginCount: 0,
      },
    });
    // 创建 WechatUser 副表记录
    wechatUser = await context.db.WechatUser.createOne({
      data: {
        openid,
        unionid,
        sessionKey,
        user: { connect: { id: user.id } },
      },
    });
    if (!wechatUser) {
      // 如果创建失败，需要删除之前创建的 User 记录
      await context.db.User.deleteOne({ where: { id: user.id.toString() } });
      throw new Error("创建微信用户记录失败");
    }
    console.log("新用户登录：", user);
  }

  /**
   * 3. 创建 session
   */
  const sessionData = { listKey: "User", itemId: user.id };
  const token = await context.sessionStrategy?.start({ context, data: sessionData });

  if (!token) throw new Error("创建 session 失败");

  /**
   * 4. 返回结果
   */
  return {
    token: token as string,
    user: {
      // User 主表
      id: user.id.toString(),
      openId: openid,
      name: user.name as string,
      phone: user.phone as string,
      email: user.email as string,
      nickname: user.nickname as string,
      gender: user.gender as number,
      avatarUrl: user?.avatar?.url as string,
      createdAt: user.createdAt ? new Date(user.createdAt).getTime().toString() : null,
      lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt).getTime().toString() : null,
      birthday: user.birthday ? new Date(user.birthday).getTime().toString() : null,
      // WechatUser 副表
      unionId: unionid,
      sessionKey,
    },
  };
}

export default resolveWechatLogin;
