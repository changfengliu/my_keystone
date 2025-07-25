import multer from 'multer'
import express from 'express'
import { Readable } from 'node:stream'
import type { KeystoneContext } from '@keystone-6/core/types'
// @ts-expect-error
import Upload from 'graphql-upload/Upload.js'
// @ts-expect-error
import ServerController from './routers/server.js'

// 使用内存存储上传的文件
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//---------------------------------------------------------------------------------------------------

export default function extendExpressApp(
  app: express.Express,
  commonContext: KeystoneContext<any>
) {
  app.use(express.json()) // 解析 JSON 请求体

  // 获取服务器参数信息
  app.get('/api/monitor/server/info', async (req: express.Request, res: express.Response) => {
    const serverInfo = await ServerController()
    res.json({ success: true, data: serverInfo })
  })

  app.use(
    '/upload/images',
    express.static('public/upload/images', { index: false, redirect: false, lastModified: false })
  )

  app.use(
    '/upload/files',
    express.static('public/upload/files', {
      setHeaders(res) {
        res.setHeader('Content-Type', 'application/octet-stream')
      },
      index: false,
      redirect: false,
      lastModified: false,
    })
  )

  /**
   * 上传微信小程序用户头像
   */
  app.post(
    '/api/user/avatar/upload',
    upload.single('file'),
    async (req: express.Request, res: express.Response) => {
      try {
        const context = await commonContext.withRequest(req, res)
        // console.log("Session:", context.session);
        const openId = context.session?.openid
        const userId = context.session?.itemId

        if (!req.file) return res.status(400).json({ error: '未指定头像文件' })
        if (!userId) return res.status(401).json({ error: '未登录' })

        // 文件信息
        const file = req.file
        const extension = file.originalname.split('.').pop()
        // console.log(Object.keys(file));

        const upload = new Upload()
        upload.resolve({
          createReadStream: () => Readable.from(file.buffer),
          filename: openId + '.' + extension,
          mimetype: file.mimetype,
          encoding: 'utf-8',
        })

        // 使用 Keystone 的文件上传功能更新用户头像
        const updatedUser = await context.query.User.updateOne({
          where: { id: userId },
          data: { avatar: { upload } },
          query: 'id name phone avatar {id url width height}',
        })

        res.json({ success: true, user: updatedUser })
      } catch (error) {
        console.error('头像上传错误:', error)
        res.status(500).json({ error: '头像上传失败' })
      }
    }
  )
}
