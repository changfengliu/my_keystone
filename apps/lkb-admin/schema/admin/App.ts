import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, select } from '@keystone-6/core/fields'

export const App = list({
  access: allowAll,
  ui: {
    label: '应用管理',
    description: '使用当前数据源的 Apps 列表',
    listView: {
      listType: 'treegrid',
      initialColumns: ['name', 'description', 'type', 'domain', 'isEnabled'],
    },
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      ui: {
        label: '应用名称',
      },
    }),
    description: text({
      ui: {
        label: '功能描述',
      },
    }),
    logo: text({
      ui: {
        label: 'Logo',
      },
    }),
    type: select({
      type: 'string',
      options: [
        { label: 'Web', value: 'web' },
        { label: '小程序', value: 'miniprogram' },
        { label: 'App', value: 'app' },
      ],
      defaultValue: 'web',
      ui: {
        label: '应用类型',
        displayMode: 'segmented-control',
      },
    }),
    domain: text({
      ui: {
        label: '域名',
        description: '如: https://www.example.com',
      },
    }),
    isEnabled: select({
      type: 'integer',
      defaultValue: 1,
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      ui: {
        label: '状态',
        displayMode: 'segmented-control',
      },
    }),
  },
})
