import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, integer, timestamp, select } from "@keystone-6/core/fields";

/**
 * 购物车
 */
export const Cart = list({
  access: allowAll,
  fields: {
    user: relationship({
      ref: "User",
      many: false,
    }),
    items: relationship({
      ref: "CartItem",
      many: true,
    }),
    totalAmount: integer({}),
    status: select({
      options: [
        { label: "活动", value: "active" },
        { label: "已结算", value: "checked" },
        { label: "已废弃", value: "abandoned" },
      ],
      defaultValue: "active",
    }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
  ui: {
    label: "购物车",
    labelField: "id",
    isHidden: false,
    listView: {
      initialColumns: ["user", "totalAmount", "status", "updatedAt"],
    },
  },
});
