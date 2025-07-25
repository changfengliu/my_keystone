import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship, select, integer } from "@keystone-6/core/fields";

export const Menu = list({
  access: allowAll,
  ui: {
    label: "菜单管理",
    description: "主要用于 Schema 菜单分组",
    isHidden: false,
    listView: {
      initialColumns: ["name", "parent", "path"], // 只显示这三列
    },
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      label: "菜单名称",
    }),
    icon: text({
      label: "图标",
      ui: {
        description: "可以使用 emoji 或 SVG path",
      },
    }),
    type: select({
      type: "string",
      options: [
        { label: "分组", value: "group" },
        { label: "菜单项", value: "item" },
      ],
      defaultValue: "item",
      label: "类型",
      ui: { displayMode: "segmented-control" },
    }),
    path: text({
      label: "路由路径",
      ui: {
        description: "如: /page-designer",
      },
    }),
    parent: relationship({
      ref: "Menu",
      many: false,
      label: "父级菜单",
      ui: {
        hideCreate: true,
        linkToItem: false,
      },
    }),
    sort: integer({
      defaultValue: 0,
      label: "排序",
    }),
    isEnabled: select({
      type: "integer",
      defaultValue: 1,
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
      label: "状态",
      ui: { displayMode: "segmented-control" },
    }),
  },
});
