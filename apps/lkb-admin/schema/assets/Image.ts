import { list } from '@keystone-6/core'
import { createLocalStorage } from '../utils'
import { allowAll } from '@keystone-6/core/access'
import { text, image } from '@keystone-6/core/fields'

/**
 * 图片
 */
export const Image = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true }, ui: { label: '标题' } }),
    altText: text({ ui: { label: '替代文本' } }),
    image: image({ storage: createLocalStorage('albums/images'), ui: { label: '图片' } }),
  },
  ui: {
    label: '图片管理',
    listView: {
      listType: 'waterfall',
    },
  },
})
