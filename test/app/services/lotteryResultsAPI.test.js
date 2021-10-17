const { getDrawByDate  } = require('../../../app/services/lotteryResultsAPI')


test('for ticket(s) date available', () => {
  expect(getDrawByDate('2021-01-01')).resolves.toEqual()
})
  

test('for ticket(s) date not being available', () => {
  const expectedError = {status:200, message: "lottery results for the specified draw are not available"}
  expect(getDrawByDate('1999-01-01')).rejects.toEqual(expectedError)
})
  