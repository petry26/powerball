const { notFound } = require('../../../app/controllers/notfound')

test('Not Found Route', () => {
  expect(notFound).toThrow('Route Not Found')
})
