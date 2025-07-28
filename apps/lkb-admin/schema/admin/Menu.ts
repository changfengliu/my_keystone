import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, relationship, select, integer } from '@keystone-6/core/fields'

export const Menu = list({
  access: allowAll,
  ui: {
    label: '菜单管理',
    description: '主要用于 Schema 菜单分组',
    listView: {
      listType: 'treegrid',
      initialColumns: ['name', 'parent', 'path', 'sort'],
      initialSort: {
        field: 'sort',
        direction: 'ASC', //TODO: not work, 可能是数值与字符串排序算法的问题。
      },
    },
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      ui: {
        label: '菜单名称',
      },
    }),
    icon: text({
      ui: {
        label: '图标',
        description: '可以使用 emoji 或 SVG path',
      },
    }),
    type: select({
      type: 'string',
      options: [
        { label: '分组', value: 'group' },
        { label: '菜单项', value: 'item' },
      ],
      defaultValue: 'item',
      ui: {
        label: '类型',
        displayMode: 'segmented-control',
      },
    }),
    path: text({
      ui: {
        label: '路由路径',
        description: '如: /page-designer',
      },
    }),
    parent: relationship({
      ref: 'Menu',
      many: false,
      ui: {
        label: '父级菜单',
        hideCreate: true,
      },
    }),
    sort: integer({
      defaultValue: 0,
      ui: {
        label: '排序',
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
