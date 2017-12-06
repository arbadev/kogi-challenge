export default {

  stores: {
    mongo: {
      connection: {
        uri: process.env.MONGODB_URI || 'localhost:27017/kogi',
      },
      adapter: 'mongoose',
    },
  },

  store: 'mongo',

}
