import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { relationship, integer } from '@keystone-6/core/fields'

/**
 * 购物车条目
 */
export const CartItem = list({
  access: allowAll,
  fields: {
    cart: relationship({
      ref: 'Cart',
      many: false,
    }),
    product: relationship({
      ref: 'Product',
      many: false,
    }),
    quantity: integer({
      validation: { isRequired: true },
      defaultValue: 1,
    }),
    price: integer({
      validation: { isRequired: true },
    }),
    amount: integer({
      validation: { isRequired: true },
    }),
  },
  ui: {
    label: '购物车条目',
    labelField: 'id',
    listView: {
      initialColumns: ['cart', 'product', 'quantity', 'price', 'amount'],
    },
  },
})
