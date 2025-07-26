import fs from 'node:fs/promises'
import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { text, password, timestamp, image, select, integer } from '@keystone-6/core/fields'

/**
 * 用户信息主表
 */
export const User = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      ui: {
        label: '用户名',
      },
    }),
    nickname: text({
      ui: {
        label: '昵称',
      },
    }), // 用户名一般是真实姓名，昵称是用户自己设置的
    phone: text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { label: '手机号' } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique', ui: { label: '邮箱' } }),
    avatar: image({
      storage: {
        async put(key, stream) {
          await fs.writeFile(`public/upload/images/avatars/${key}`, stream)
        },
        async delete(key) {
          await fs.unlink(`public/upload/images/avatars/${key}`)
        },
        url(key) {
          return `/upload/images/avatars/${key}`
        },
      },
      ui: {
        label: '头像',
      },
    }),
    gender: select({
      type: 'integer',
      options: [
        { label: '女', value: 0 },
        { label: '男', value: 1 },
      ],
      defaultValue: 0,
      validation: { isRequired: true },
      ui: {
        label: '性别',
        displayMode: 'segmented-control',
      },
    }),
    birthday: timestamp({ ui: { label: '生日' } }),
    password: password({ validation: { isRequired: true }, ui: { label: '密码' } }),
    openid: text({
      ui: {
        label: '微信 OpenID',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        label: '创建时间',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    lastLoginAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        label: '最后登录时间',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    address: text({
      ui: {
        label: '通信地址',
      },
      validation: { length: { max: 2000 } }, // 设置最大长度限制
    }),
    remark: text({
      validation: { length: { max: 2000 } }, // 设置最大长度限制
      ui: {
        label: '备注',
        displayMode: 'textarea',
      },
    }),
    userType: select({
      type: 'string',
      options: [
        { label: '后台用户', value: 'admin' },
        { label: '微信小程序用户', value: 'wechat' },
        { label: '网页用户', value: 'web' },
      ],
      defaultValue: 'admin',
      validation: { isRequired: true },
      ui: {
        label: '用户类型',
        displayMode: 'segmented-control',
      },
    }),
    status: select({
      type: 'integer',
      options: [
        { label: '正常', value: 1 },
        { label: '禁用', value: 0 },
      ],
      defaultValue: 1,
      validation: { isRequired: true },
      ui: {
        label: '状态',
        displayMode: 'segmented-control',
      },
    }),
    lastLoginIP: text({
      ui: {
        label: '最后登录IP',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    loginCount: integer({
      defaultValue: 0,
      ui: {
        label: '登录次数',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
  },
  hooks: {
    beforeOperation: {
      delete: async ({ item, context }) => {
        // 删除 User 主表记录之前，先删除副表数据。
        const id = item?.id as string
        // 首先查找关联的 WechatUser
        const wechatUsers = await context.query.WechatUser.findMany({
          where: { user: { id: { equals: id } } },
        })
        // 然后删除找到的 WechatUser
        for (const wechatUser of wechatUsers) {
          const wechatUserId = wechatUser.id as string
          await context.query.WechatUser.deleteOne({ where: { id: wechatUserId } })
        }
      },
    },
  },
  ui: {
    label: '用户管理',
    path: 'system-users',
  },
})
