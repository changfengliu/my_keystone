import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, integer, select } from "@keystone-6/core/fields";

/**
 * 服务项目分类
 */
export const ServiceCategory = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    status: select({
      defaultValue: "draft",
      options: [
        { label: "启用", value: "published" },
        { label: "禁用", value: "draft" },
      ],
      ui: { displayMode: "segmented-control" },
    }),
    order: integer({
      defaultValue: 0,
      validation: { isRequired: true },
    }),
  },
  ui: {
    label: "服务分类管理",
    labelField: "name",
    isHidden: false,
    listView: {
      initialColumns: ["name", "status", "order"],
      initialSort: { field: "order", direction: "ASC" },
    },
  },
});
