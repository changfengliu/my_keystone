import { list } from '@keystone-6/core'
import { createLocalStorage } from '../utils'
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
      ui: {
        label: '店铺名称',
      },
    }),
    address: text({
      ui: { displayMode: 'textarea', label: '店铺地址' },
      validation: { isRequired: true },
    }),
    phone: text({ validation: { isRequired: true }, ui: { label: '联系电话' } }),
    // location: LngAndLatSelector({}),
    location: text({
      ui: {
        label: '经纬度坐标',
        description: '格式为经度,纬度, 通过地图坐标选取工具获取，用于客户导航',
      },
    }),
    locationLabel: text({ ui: { label: '导航位置说明, 客户导航时显示的名称' } }),
    // 父子店铺关系
    parent: relationship({
      ref: 'Shop.subShops',
      ui: {
        displayMode: 'select',
        hideCreate: true,
        labelField: 'name',
        description: '主店铺',
      },
      many: false,
    }),
    // 反向关联用于树形展示
    subShops: relationship({
      ref: 'Shop.parent',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
      },
      many: true,
    }),
    logo: image({
      storage: createLocalStorage('shops/logos'),
      ui: { label: '店铺Logo', description: '要求正方形，尺寸为512x512' },
    }),
    banners: relationship({
      ref: 'Image',
      many: true,
      ui: { label: '首页轮播图', description: '要求9：16，尺寸为1920x1080' },
    }),
    openingHours: text({ validation: { isRequired: true }, ui: { label: '营业时间' } }),
    remark: text({
      ui: { displayMode: 'textarea', label: '备注' },
    }),
  },
  // 自定义 Admin UI 配置
  ui: {
    label: '店铺管理',
    labelField: 'name',
    listView: {
      listType: 'treegrid',
      initialColumns: ['name', 'address', 'phone', 'parent'],
      initialSort: { field: 'name', direction: 'ASC' },
    },
  },
})
