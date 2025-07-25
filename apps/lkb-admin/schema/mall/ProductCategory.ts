import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, integer, select, relationship } from "@keystone-6/core/fields";

/**
 * 商品分类
 */
export const ProductCategory = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    description: text({
      ui: { displayMode: "textarea" },
    }),
    status: select({
      options: [
        { label: "启用", value: "active" },
        { label: "禁用", value: "inactive" },
      ],
      defaultValue: "active",
    }),
    order: integer({
      defaultValue: 0,
    }),
    parentCategory: relationship({
      ref: "ProductCategory",
      many: false,
    }),
  },
  ui: {
    label: "商品分类",
    labelField: "name",
    isHidden: false,
    listView: {
      initialColumns: ["name", "status", "order"],
    },
  },
});
