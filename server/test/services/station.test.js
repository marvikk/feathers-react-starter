const app = require('../../src/app');

describe('\'station\' service', () => {
  it('registered the service', () => {
    const service = app.service('station');
    expect(service).toBeTruthy();
  });
});
