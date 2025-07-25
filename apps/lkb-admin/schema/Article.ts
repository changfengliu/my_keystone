import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { document } from '@keystone-6/fields-document'
import { text, relationship, select, timestamp } from '@keystone-6/core/fields'
// import { componentBlocks } from '../extend/fields/document/component-blocks/index'
// @ts-ignore
import { toolbarOptions_Full } from '../extend/fields/document/toolbar-options'

/**
 * 文章
 */
export default list({
  access: allowAll,
  fields: {
    title: text({ validation: { isRequired: true } }),
    content: document({
      ...toolbarOptions_Full,
      ui: {
        // 这儿的路径是相对于根目录的。
        // views: "./extend/fields/document/component-blocks/index",
      },
      // componentBlocks,
    }),
    publishedAt: timestamp(),
    status: select({
      defaultValue: 'draft',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      ui: { displayMode: 'segmented-control' },
    }),
    author: relationship({ ref: 'User', many: false }),
    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: 'Tag.posts',
      // a Post can have many Tags, not just one
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
    }),
  },
  ui: {
    label: '文章管理',
  },
})
