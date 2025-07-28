import { list } from '@keystone-6/core'
import { createLocalStorage } from '../utils'
import { allowAll } from '@keystone-6/core/access'
import { text, select, relationship, timestamp, image } from '@keystone-6/core/fields'

/**
 * 员工
 */
export const Employee = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      ui: { label: '员工姓名' },
    }),
    phone: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      ui: { label: '联系电话' },
    }),
    avatar: image({
      storage: createLocalStorage('company/employees'),
      ui: { label: '头像', description: '要求大2寸照片' },
    }),
    shop: relationship({
      ref: 'Shop',
      many: false,
      ui: { label: '所属店铺' },
    }),
    role: select({
      options: [
        { label: '店长', value: 'manager' },
        { label: '美容师', value: 'beautician' },
        { label: '前台', value: 'receptionist' },
        { label: '助理', value: 'assistant' },
      ],
      defaultValue: 'beautician',
      ui: { label: '职位', displayMode: 'segmented-control' },
    }),
    status: select({
      options: [
        { label: '在职', value: 'active' },
        { label: '离职', value: 'inactive' },
        { label: '休假', value: 'vacation' },
      ],
      defaultValue: 'active',
      ui: { label: '状态', displayMode: 'segmented-control' },
    }),
    skills: text({
      ui: { displayMode: 'textarea', label: '擅长项目' },
    }),
    joinDate: timestamp({
      defaultValue: { kind: 'now' },
      ui: { label: '入职日期' },
    }),
    leaveDate: timestamp(),
    remark: text({
      ui: { displayMode: 'textarea', label: '备注' },
    }),
  },
  ui: {
    label: '店铺员工',
    labelField: 'name',
    listView: {
      initialColumns: ['name', 'phone', 'shop', 'role', 'status', 'joinDate'],
    },
  },
})
