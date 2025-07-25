import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, password, timestamp, image, select, integer } from "@keystone-6/core/fields";

/**
 * 用户信息主表
 */
export const User = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true }, label: "用户名" }),
    nickname: text({ label: "昵称" }), // 用户名一般是真实姓名，昵称是用户自己设置的
    phone: text({ validation: { isRequired: true }, isIndexed: "unique", label: "手机号" }),
    email: text({ validation: { isRequired: true }, isIndexed: "unique", label: "邮箱" }),
    avatar: image({ storage: "user_avatar", label: "头像" }),
    gender: select({
      type: "integer",
      options: [
        { label: "女", value: 0 },
        { label: "男", value: 1 },
      ],
      defaultValue: 0,
      label: "性别",
      validation: { isRequired: true },
      ui: { displayMode: "segmented-control" },
    }),
    birthday: timestamp({ label: "生日" }),
    password: password({ validation: { isRequired: true }, label: "密码" }),
    openid: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      label: "创建时间",
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    lastLoginAt: timestamp({
      defaultValue: { kind: "now" },
      label: "最后登录时间",
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    address: text({
      label: "通信地址",
      validation: { length: { max: 2000 } }, // 设置最大长度限制
    }),
    remark: text({
      label: "备注",
      validation: { length: { max: 2000 } }, // 设置最大长度限制
      ui: { displayMode: "textarea" },
    }),
    userType: select({
      type: "string",
      options: [
        { label: "后台用户", value: "admin" },
        { label: "微信小程序用户", value: "wechat" },
        { label: "网页用户", value: "web" },
      ],
      defaultValue: "admin",
      label: "用户类型",
      validation: { isRequired: true },
      ui: { displayMode: "segmented-control" },
    }),
    status: select({
      type: "integer",
      options: [
        { label: "正常", value: 1 },
        { label: "禁用", value: 0 },
      ],
      defaultValue: 1,
      label: "状态",
      validation: { isRequired: true },
      ui: { displayMode: "segmented-control" },
    }),
    lastLoginIP: text({
      label: "最后登录IP",
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    loginCount: integer({
      label: "登录次数",
      defaultValue: 0,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
  },
  hooks: {
    beforeOperation: {
      delete: async ({ item, context }) => {
        // 删除 User 主表记录之前，先删除副表数据。
        const id = item?.id as string;
        // 首先查找关联的 WechatUser
        const wechatUsers = await context.query.WechatUser.findMany({ where: { user: { id: { equals: id } } } });
        // 然后删除找到的 WechatUser
        for (const wechatUser of wechatUsers) {
          const wechatUserId = wechatUser.id as string;
          await context.query.WechatUser.deleteOne({ where: { id: wechatUserId } });
        }
      },
    },
  },
  ui: {
    label: "用户管理",
    isHidden: false,
    path: "system-users",
  },
});
