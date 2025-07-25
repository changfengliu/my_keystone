import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, decimal, timestamp, text, integer } from "@keystone-6/core/fields";

/**
 * 卡项消费记录
 */
export const CardConsumptionRecord = list({
  access: allowAll,
  fields: {
    card: relationship({
      ref: "MembershipCard",
      many: false,
    }),
    service: relationship({
      ref: "Service",
      many: false,
    }),
    originalAmount: integer({
      validation: { isRequired: true },
    }),
    discountedAmount: integer({
      validation: { isRequired: true },
    }),
    consumedCount: integer({
      defaultValue: 1,
    }),
    consumedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    note: text(),
  },
  ui: {
    label: "卡项消费记录",
    isHidden: false,
  },
});
