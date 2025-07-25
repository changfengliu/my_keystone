import bytes from 'bytes'
import { lists } from './schema'
import { config } from '@keystone-6/core'
import { withAuth, session } from './auth'
import extendExpressApp from './extend/express/Index'
import extendGraphqlSchema from './extend/graphql/Schema'

export default withAuth(
  config({
    server: {
      port: 3001,
      cors: {
        // https://www.npmjs.com/package/cors#configuration-options
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Authorization', 'Content-Type', 'Cookie'],
      },
      maxFileSize: bytes('40Mb')!,
      extendExpressApp,
    },
    db: {
      provider: 'mysql',
      url: 'mysql://root:12345678@localhost:3306/my-dc',
      prismaClientPath: 'node_modules/.prisma/client',
    },
    lists,
    session,
    ui: {
      // isAccessAllowed: context => !!context.session?.data,
      isAccessAllowed: ({ session }) => {
        return session?.data ?? false
      },
    },
    graphql: {
      debug: true,
      path: '/api/graphql',
      extendGraphqlSchema,
    },
  })
)
