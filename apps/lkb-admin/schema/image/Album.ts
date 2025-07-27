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
    name: text(),
    desc: text(),
    cover: image({ storage: createLocalStorage('albums') }),
    images: relationship({ ref: 'Image', many: true }),
  },
  ui: {
    label: '相册管理',
    listView: {
      listType: 'waterfall',
    },
  },
})
