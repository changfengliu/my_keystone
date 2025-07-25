import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, select, json, image, integer } from "@keystone-6/core/fields";

/**
 * 卡项类型
 */
export const CardType = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    type: select({
      validation: { isRequired: true },
      options: [
        { label: "次卡", value: "count" },
        { label: "折扣卡", value: "discount" },
        { label: "充值卡", value: "prepaid" },
      ],
      ui: { displayMode: "segmented-control" },
    }),
    cover: image({ storage: "my_local_images" }),
    price: integer({
      validation: { isRequired: true },
    }),
    count: integer({}),
    discount: integer({}),
    duration: integer({
      ui: {
        description: "有效期（天）",
      },
    }),
    // 不同类型卡的具体规则
    rules: json({
      ui: {
        description: `次卡 ：{"price": 100, "count": 10}
折扣卡：{"discount": 0.85}
充值卡：{"rules": [{"pay": 100, "gift": 20}, {"pay": 200, "gift": 40}]}`,
      },
    }),
    status: select({
      defaultValue: "draft",
      options: [
        { label: "启用", value: "published" },
        { label: "禁用", value: "draft" },
      ],
      validation: { isRequired: true },
      ui: { displayMode: "segmented-control" },
    }),
    description: text({ ui: { displayMode: "textarea" } }),
  },
  ui: {
    label: "卡项类型管理",
    isHidden: false,
  },
});
