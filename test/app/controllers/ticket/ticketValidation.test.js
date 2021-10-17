const { validateReqBody  } = require('../../../../app/controllers/ticket/ticketValidation')


mockReqBody = () => {
    return {
        drawDate : '2021-10-13',
        tickets :[{
            powerNumber: 15,
            normalNumbers: [23,30,48,55,56]
        }]
    }
}


test('for invalid date', () => {

    let mockReq = mockReqBody()
    mockReq.drawDate='wow'

    const expectedError = {status:422, message: 'Invalid date'}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})


test('power number informed not informed', () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].powerNumber = null

    const expectedError = {status:422, message: "'powerNumber' not informed"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})


test('power number informed with wrong type', () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].powerNumber = 'a'

    const expectedError = {status:422, message: "'powerNumber should be an integer'"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test("for 'powerNumber' out of range", () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].powerNumber = 27

    const expectedError = {status:422, message: "'powerNumber'should range from 1 to 26'"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test("for repeated normal numbers", () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].normalNumbers = [23,23,48,55,56]

    const expectedError = {status:422, message: "'normalNumbers' should not have repeated numbers"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test("for 'normal numbers' informed with the wrong type", () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].normalNumbers = 'wow'

    const expectedError = {status:422, message: "'normalNumber' should be informed as an array"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})


test("for no 'normal numbers' informed", () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].normalNumbers = []

    const expectedError = {status:422, message: "no 'normalNumbers' numbers were informed"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test("for wrong amount of 'normal numbers'", () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].normalNumbers = [1,2,3,4]

    const expectedError = {status:422, message: "exactly 5 'normalNumbers' should be informed"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test("for wrong amount of 'normal numbers'", () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].normalNumbers = ['a',2,3,4,5]

    const expectedError = {status:422, message: "'normalNumber' should be an integer'"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test("for invalid range in normal numbers", () => {

    let mockReq = mockReqBody()
    mockReq.tickets[0].normalNumbers = [1,2,3,4,500]

    const expectedError = {status:422, message: "'normalNumber'should range from 1 to 69'"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test('for ticket informed with the wrong type', () => {

    let mockReq = mockReqBody()
    mockReq.tickets = 'a'

    const expectedError = {status:422, message: "tickets should be informed as an array"}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

test('for no tickets informed', () => {

    let mockReq = mockReqBody()
    mockReq.tickets = []

    const expectedError = {status:422, message: 'no tickets were informed'}

    expect(validateReqBody(mockReq)).rejects.toEqual(expectedError)
})

