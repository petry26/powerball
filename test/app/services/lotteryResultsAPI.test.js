const { getDrawByDate  } = require('../../../app/services/lotteryResultsAPI')

test('for ticket(s) date available', () => {
  const expectedObj = {
    drawDate: '2021-10-13T00:00:00.000',
    powerNumber: 15,
    normalNumbers: [23,29,47,59,61]
  }

  //TODO requires change in order to do a deep comparision toStrictEqual checks just types and structure, not values
  expect(getDrawByDate('2021-10-13')).resolves.toStrictEqual(expectedObj)
})
  

test('for ticket(s) date not being available', () => {
  const expectedError = {status:200, message: "lottery results for the specified draw are not available"}
  expect(getDrawByDate('1999-01-01')).rejects.toEqual(expectedError)
})
  