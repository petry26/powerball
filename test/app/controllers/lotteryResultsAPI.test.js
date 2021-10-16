const { getLotteryResults  } = require('../../../app/controllers/lotteryResultsAPI')

//invalid url

test('Invalid URL', () => {
    expect(notFound).toThrow('Route Not Found')
  })
  