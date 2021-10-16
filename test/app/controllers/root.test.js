const { root } = require('../../../app/controllers/root')

test('Server generic response', () => {
  const res = { json: jest.fn() }
  root({}, res)
  expect(res.json.mock.calls[0][0]).toEqual({ message: 'Up and running!' })
})


