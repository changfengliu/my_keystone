import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship, image } from "@keystone-6/core/fields";

/**
 * 相册
 */
export const Album = list({
  access: allowAll,
  fields: {
    name: text(),
    desc: text(),
    cover: image({ storage: "my_local_images" }),
    images: relationship({ ref: "Image", many: true }),
  },
  ui: {
    label: "相册管理",
  },
});
