const moment = require('moment')

const _validateDrawDate = (drawDate) => {
    if (moment(new Date(drawDate)).isValid() == false)
        throw {status:422, message: 'Invalid date'}
}

const _validatePowerNumber = (powerNumber) => {

    if(!powerNumber)
        throw {status:422, message:"'powerNumber' not informed"}

    if(!Number.isInteger(powerNumber))
        throw {status:422, message:"'powerNumber should be an integer'"}

    if(powerNumber < 1 || powerNumber > 26)
        throw {status:422, message:"'powerNumber'should range from 1 to 26'"}
}

const _checkRepeatedNumbers = (normalNumbers) =>{

    const sanitizedNumbers = new Set(normalNumbers)

    if(sanitizedNumbers.size != normalNumbers.length)
        throw {status:422, message:"'normalNumbers' should not have repeated numbers"}

}

const _validateNormalNumbers = (normalNumbers) => {

    if(!Array.isArray(normalNumbers))
        throw {status:422, message:"'normalNumber' should be informed as an array"}

    if(normalNumbers.length == 0)
        throw {status:422, message:"no 'normalNumbers' numbers were informed"}

    if(normalNumbers.length != 5)
        throw {status:422, message:"exactly 5 'normalNumbers' should be informed"}

    normalNumbers.forEach((normalNumber)=>{

        if(!Number.isInteger(normalNumber))
            throw {status:422, message:"'normalNumber' should be an integer'"}

        if(normalNumber < 1 || normalNumber > 69)
            throw {status:422, message:"'normalNumber'should range from 1 to 69'"}

    })

    _checkRepeatedNumbers(normalNumbers)
    
}


const _validateTickets = (tickets) => {

    if(!Array.isArray(tickets))
        throw {status:422, message:'tickets should be informed as an array'}

    if(tickets.length == 0)
        throw {status:422, message:'no tickets were informed'}
    
        tickets.forEach((ticket)=>{

        _validatePowerNumber(ticket.powerNumber)

        _validateNormalNumbers(ticket.normalNumbers)

    })

}

const validateReqBody = async(reqBody) => {

    _validateDrawDate(reqBody.drawDate)

    _validateTickets(reqBody.tickets)

}

module.exports = { validateReqBody }