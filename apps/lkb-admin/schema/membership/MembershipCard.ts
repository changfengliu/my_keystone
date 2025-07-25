import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, integer, timestamp, select } from "@keystone-6/core/fields";

/**
 * 会员卡
 */
export const MembershipCard = list({
  access: allowAll,
  fields: {
    user: relationship({
      ref: "User",
      many: false,
    }),
    cardType: relationship({
      ref: "CardType",
      many: false,
    }),
    // 剩余次数（次卡）或余额（充值卡）
    balance: integer({}),
    remainingCount: integer({
      defaultValue: 0,
    }),
    status: select({
      options: [
        { label: "有效", value: "active" },
        { label: "已过期", value: "expired" },
        { label: "已用完", value: "depleted" },
      ],
      defaultValue: "active",
      validation: { isRequired: true },
      ui: { displayMode: "segmented-control" },
    }),
    expiryDate: timestamp(),
    purchaseDate: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
  ui: {
    label: "会员卡项管理",
    isHidden: false,
    listView: {
      initialColumns: ["user", "cardType", "balance", "remainingCount", "status", "expiryDate"],
    },
  },
});
