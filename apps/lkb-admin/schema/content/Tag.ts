import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, relationship } from '@keystone-6/core/fields'

/**
 * 通用标签
 */
export default list({
  access: allowAll,
  ui: {
    label: '标签管理',
  },
  fields: {
    name: text(),
    // this can be helpful to find out all the Posts associated with a Tag
    posts: relationship({ ref: 'Article.tags', many: true }),
  },
})
