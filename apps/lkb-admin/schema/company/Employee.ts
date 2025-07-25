import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, select, relationship, timestamp, image } from "@keystone-6/core/fields";

/**
 * 员工
 */
export const Employee = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
    }),
    phone: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    avatar: image({ storage: "my_local_images" }),
    shop: relationship({
      ref: "Shop",
      many: false,
    }),
    role: select({
      options: [
        { label: "店长", value: "manager" },
        { label: "美容师", value: "beautician" },
        { label: "前台", value: "receptionist" },
        { label: "助理", value: "assistant" },
      ],
      defaultValue: "beautician",
    }),
    status: select({
      options: [
        { label: "在职", value: "active" },
        { label: "离职", value: "inactive" },
        { label: "休假", value: "vacation" },
      ],
      defaultValue: "active",
    }),
    skills: text({
      ui: { displayMode: "textarea" },
    }),
    joinDate: timestamp({
      defaultValue: { kind: "now" },
    }),
    leaveDate: timestamp(),
    remark: text({
      ui: { displayMode: "textarea" },
    }),
  },
  ui: {
    label: "店铺员工",
    labelField: "name",
    isHidden: false,
    listView: {
      initialColumns: ["name", "phone", "shop", "role", "status", "joinDate"],
    },
  },
});
