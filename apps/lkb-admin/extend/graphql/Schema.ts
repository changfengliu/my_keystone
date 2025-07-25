import { graphql } from "@keystone-6/core";
import WechatLoginResponse from "./types/WechatLoginResponse";
import resolveWechatLogin from "./services/resolveWechatLogin";

const Schema = graphql.extend(baseSchema => {
  return {
    mutation: {
      /**
       * 微信小程序登录
       */
      wechatLogin: graphql.field({
        type: WechatLoginResponse,
        args: {
          code: graphql.arg({ type: graphql.nonNull(graphql.String) }),
        },
        resolve: resolveWechatLogin,
      }),
    },
  };
});

export default Schema;
