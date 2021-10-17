const { getScoreData  } = require('../../../../app/controllers/ticket/ticket')

test('for a power number match and at least 1 normal number match', () => {

    const drawDate = '2021-10-13'
    const tickets = [{
        powerNumber: 15,
        normalNumbers: [23,30,48,55,56]
      }]

    return getScoreData(drawDate, tickets).then(data => {
      expect(data.tickets[0].prizeData.normalNumbersMatch && data.tickets[0].prizeData.powerNumberMatch).toBe(true)
    })
})

test('for no power number match and 0 normal number matches', () => {

  const drawDate = '2021-10-13'
  const tickets = [{
      powerNumber: 16,
      normalNumbers: [23,30,48,55,56]
    }]

  return getScoreData(drawDate, tickets).then(data => {
    expect(data.tickets[0].prizeData.normalNumbersMatch && data.tickets[0].prizeData.powerNumberMatch).toBe(false)
  })
})
  
test('for a power number match and 0 normal number matches', () => {

  const drawDate = '2021-10-13'
  const tickets = [{
      powerNumber: 15,
      normalNumbers: [25,30,48,55,56]
    }]

  return getScoreData(drawDate, tickets).then(data => {
    expect(!data.tickets[0].prizeData.normalNumbersMatch && data.tickets[0].prizeData.powerNumberMatch).toBe(true)
  })
})
  

test('for no power number match and at least 1 normal number match', () => {

  const drawDate = '2021-10-13'
  const tickets = [{
      powerNumber: 11,
      normalNumbers: [23,30,48,55,56]
    }]

  return getScoreData(drawDate, tickets).then(data => {
    expect(data.tickets[0].prizeData.normalNumbersMatch && !data.tickets[0].prizeData.powerNumberMatch).toBe(true)
  })
})