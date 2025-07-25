import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, image } from "@keystone-6/core/fields";

/**
 * 图片
 */
export const Image = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    altText: text(),
    image: image({ storage: "my_local_images" }),
  },
  ui: {
    label: "图片管理",
  },
});
