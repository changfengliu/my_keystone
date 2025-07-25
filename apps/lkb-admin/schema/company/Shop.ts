import { list } from '@keystone-6/core'
import { image, relationship, text } from '@keystone-6/core/fields'
// import { LngAndLatSelector } from '../../extend/fields/LngAndLatSelector'

/**
 * 店铺
 */
export default list({
  access: {
    operation: {
      query: ({ session }) => !!session,
      create: ({ session }) => !!session,
      update: ({ session }) => !!session,
      delete: ({ session }) => !!session,
    },
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    address: text({
      ui: { displayMode: 'textarea' },
      validation: { isRequired: true },
    }),
    phone: text({ validation: { isRequired: true } }),
    // location: LngAndLatSelector({}),
    location: text({}),
    locationLabel: text({}),
    // 父子店铺关系
    parentShop: relationship({
      ref: 'Shop.subShops',
      ui: {
        displayMode: 'select',
        hideCreate: true,
        labelField: 'name',
      },
      many: false,
    }),
    // 反向关联用于树形展示
    subShops: relationship({
      ref: 'Shop.parentShop',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
      },
      many: true,
    }),
    logo: image({ storage: 'my_local_images' }),
    banners: relationship({ ref: 'Image', many: true }),
    openingHours: text({ validation: { isRequired: true } }),
    remark: text({
      ui: { displayMode: 'textarea' },
    }),
  },
  // 自定义 Admin UI 配置
  ui: {
    label: '店铺管理',
    labelField: 'name',
    isHidden: false,
    listView: {
      initialColumns: ['name', 'address', 'phone', 'parentShop'],
      initialSort: { field: 'name', direction: 'ASC' },
    },
  },
})
