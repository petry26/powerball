const moment = require('moment')

const validateReqBody = (req) => {

    _validateDrawDate(req.body.drawDate)

    _validateLoterryNumbers(req.body.lotteryNumbers)
}

const _validateDrawDate = (drawDate) => {
    if (moment(new Date(drawDate)).isValid() == false)
        throw new Error(400, 'Invalid date')
}

const _validatePowerNumber = (powerNumber) => {

    if(!powerNumber)
        throw Error(400, "'powerNumber' not informed")

    if(!Number.isInteger(powerNumber))
        throw Error(400, "'powerNumber should be an integer'")

    if(powerNumber < 1 || powerNumber > 26)
        throw Error(400, "'powerNumber'should range from 1 to 26'")
}

const _checkRepeatedNumbers = (normalNumbers) =>{

    const sanitizedNumbers = new Set(normalNumbers)

    if(sanitizedNumbers.size != normalNumbers.length)
        throw Error(400, "'normalNumbers' should not have repeated numbers")

}

const _validateNormalNumbers = (normalNumbers) => {

    if(!Array.isArray(normalNumbers))
        throw Error(400, "'normalNumber' should be informed as an array")

    if(normalNumbers.length == 0)
        throw Error(400, "no 'normalNumbers' numbers were informed")

    if(normalNumbers.length != 5)
        throw new Error(400, "exactly 5 'normalNumbers' should be informed")

    normalNumbers.forEach((normalNumber)=>{

        if(!Number.isInteger(normalNumber))
            throw Error(400, "'normalNumber' should be an integer'")

        if(normalNumber < 1 || normalNumber > 69)
            throw Error(400, "'normalNumber'should range from 1 to 69'")

    })

    _checkRepeatedNumbers(normalNumbers)
    
}


const _validateLoterryNumbers = (lotteryNumbers) => {

    if(!Array.isArray(lotteryNumbers))
        throw Error(400, 'loterry numbers should be informed as an array')

    if(lotteryNumbers.length == 0)
        throw Error(400, 'no loterry numbers were informed')
    
    lotteryNumbers.forEach((loterryNumber)=>{

        _validatePowerNumber(loterryNumber.powerNumber)

        _validateNormalNumbers(loterryNumber.normalNumbers)

    })

}


module.exports = { validateReqBody }