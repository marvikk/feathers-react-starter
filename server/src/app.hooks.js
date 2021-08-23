// Application hooks that run for every service

module.exports = {
  before: {
    all: [
      async (context) => {
        console.log('here to emmit some shit');
        await context
          .app
          .service('station')
          .emit('custom event', {
            hello: 'hello',
            world: 'world'
          })
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
