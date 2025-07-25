import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship } from "@keystone-6/core/fields";

export const WechatUser = list({
  access: allowAll,
  fields: {
    openid: text({ isIndexed: "unique", validation: { isRequired: true } }),
    unionid: text(),
    sessionKey: text(),
    user: relationship({ ref: "User", many: false }),
  },
  ui: {
    label: "微信用户",
    isHidden: false,
  },
});
