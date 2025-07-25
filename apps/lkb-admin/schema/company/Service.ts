import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, integer, select, relationship, decimal, image } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

/**
 * 服务项目
 */
export const Service = list({
  access: allowAll,
  fields: {
    title: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    price: integer({
      validation: { isRequired: true },
    }),
    duration: integer({
      validation: { isRequired: true },
      defaultValue: 60, // 默认60分钟
    }),
    status: select({
      defaultValue: "draft",
      options: [
        { label: "启用", value: "published" },
        { label: "禁用", value: "draft" },
      ],
      ui: { displayMode: "segmented-control" },
    }),
    serviceCategory: relationship({
      ref: "ServiceCategory",
      many: false,
      ui: {
        displayMode: "select",
        labelField: "name",
      },
    }),
    order: integer({
      defaultValue: 0,
      validation: { isRequired: true },
    }),
    cover: image({ storage: "my_local_images" }),
    images: relationship({ ref: "Image", many: true }),
    content: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
  },
  ui: {
    label: "服务项目管理",
    labelField: "title",
    isHidden: false,
    listView: {
      initialColumns: ["title", "price", "duration", "status", "serviceCategory", "order"],
      initialSort: { field: "order", direction: "ASC" },
    },
  },
});
