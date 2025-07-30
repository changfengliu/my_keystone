import { list } from '@keystone-6/core'
import { createLocalStorage } from '../utils'
import { allowAll } from '@keystone-6/core/access'
import { text, relationship, image } from '@keystone-6/core/fields'

/**
 * 相册列表
 */
export const Album = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true }, ui: { label: '相册名称' } }),
    desc: text({ ui: { label: '描述' } }),
    cover: image({ storage: createLocalStorage('albums'), ui: { label: '封面' } }),
    images: relationship({
      ref: 'Image',
      many: true,
      ui: { label: '图片列表' },
    }),
  },
  ui: {
    label: '相册管理',
    listView: {
      listType: 'waterfall',
    },
  },
})
