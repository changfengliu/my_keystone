import { graphql } from "@keystone-6/core";
import WechatAuthUser from "./WeichatAuthUser";

// 定义返回类型
const WechatLoginResponse = graphql.object<{ token: string; user: WechatAuthUser }>()({
  name: "WechatLoginResponse",
  fields: {
    token: graphql.field({ type: graphql.String }),
    user: graphql.field({
      type: graphql.object<WechatAuthUser>()({
        name: "AuthUser",
        fields: {
          id: graphql.field({ type: graphql.String }),
          name: graphql.field({ type: graphql.String }),
          email: graphql.field({ type: graphql.String }),
          phone: graphql.field({ type: graphql.String }),
          sessionKey: graphql.field({ type: graphql.String }),
          openId: graphql.field({ type: graphql.String }),
          unionId: graphql.field({ type: graphql.String }),
          nickname: graphql.field({ type: graphql.String }),
          avatarUrl: graphql.field({ type: graphql.String }),
          gender: graphql.field({ type: graphql.Int }),
          birthday: graphql.field({ type: graphql.String }),
          createdAt: graphql.field({ type: graphql.String }),
          lastLoginAt: graphql.field({ type: graphql.String }),
        },
      }),
    }),
  },
});

export default WechatLoginResponse;
