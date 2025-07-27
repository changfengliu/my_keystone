import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, integer, select, relationship, image } from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { createLocalStorage } from '../utils'

/**
 * 商品
 */
export const Product = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    sku: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    price: integer({
      validation: { isRequired: true },
    }),
    stock: integer({
      validation: { isRequired: true },
      defaultValue: 0,
    }),
    category: relationship({
      ref: 'ProductCategory',
      many: false,
    }),
    status: select({
      options: [
        { label: '上架', value: 'active' },
        { label: '下架', value: 'inactive' },
        { label: '售罄', value: 'soldout' },
      ],
      defaultValue: 'active',
    }),
    cover: image({ storage: createLocalStorage('company/products') }),
    images: relationship({
      ref: 'Image',
      many: true,
    }),
    description: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
      ],
      links: true,
      dividers: true,
    }),
    order: integer({
      defaultValue: 0,
    }),
  },
  ui: {
    label: '商品管理',
    labelField: 'name',
    listView: {
      initialColumns: ['name', 'sku', 'price', 'stock', 'status', 'category'],
    },
  },
})
