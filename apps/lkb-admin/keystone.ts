import { lists } from './schema'
import { config } from '@keystone-6/core'
import { withAuth, session } from './auth'
import extendExpressApp from './extend/express/Index'
import extendGraphqlSchema from './extend/graphql/Schema'

const baseImageUrl = ''

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
      extendExpressApp,
    },
    db: {
      provider: 'mysql',
      url: 'mysql://root:12345678@localhost:3306/my-dc',
      prismaClientPath: 'node_modules/.prisma/client',
    },
    lists,
    session,
    // storage: {
    //   my_local_images: {
    //     kind: 'local',
    //     type: 'image', // This store is used for the image field type
    //     generateUrl: path => `${baseImageUrl}/images${path}`, // The URL that is returned in the Keystone GraphQL API
    //     // The route that will be created in Keystone's backend to serve the images
    //     serverRoute: {
    //       path: '/images',
    //     },
    //     // Set serverRoute to null if you don't want a route to be created in Keystone
    //     // serverRoute: null
    //     storagePath: 'upload/images',
    //   },
    //   user_avatar: {
    //     kind: 'local',
    //     type: 'image',
    //     generateUrl: path => `${baseImageUrl}/avatars${path}`,
    //     serverRoute: { path: '/avatars' },
    //     storagePath: 'upload/avatars',
    //   },
    //   /** more storage */
    // },
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
