import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, integer, select, relationship } from '@keystone-6/core/fields'

/**
 * 文章分类
 */
export const ArticleCategory = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    status: select({
      defaultValue: 'draft',
      options: [
        { label: '启用', value: 'published' },
        { label: '禁用', value: 'draft' },
      ],
      ui: { displayMode: 'segmented-control' },
    }),
    parent: relationship({
      ref: 'ArticleCategory',
      many: false,
      ui: {
        label: '父级分类',
        hideCreate: true,
      },
    }),
    order: integer({
      defaultValue: 0,
      validation: { isRequired: true },
    }),
  },
  ui: {
    label: '文章分类管理',
    labelField: 'name',
    listView: {
      listType: 'treegrid',
      initialColumns: ['name', 'parent', 'status', 'order'],
      initialSort: { field: 'order', direction: 'ASC' },
    },
  },
})
