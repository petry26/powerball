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


const _validateLoterryNumbers = (lotteryNumbers) => {

    if(!Array.isArray(lotteryNumbers))
        throw {status:422, message:'loterry numbers should be informed as an array'}

    if(lotteryNumbers.length == 0)
        throw {status:422, message:'no loterry numbers were informed'}
    
    lotteryNumbers.forEach((loterryNumber)=>{

        _validatePowerNumber(loterryNumber.powerNumber)

        _validateNormalNumbers(loterryNumber.normalNumbers)

    })

}

const validateReqBody = (req) => {

    _validateDrawDate(req.body.drawDate)

    _validateLoterryNumbers(req.body.lotteryNumbers)
}


const _getDrawByDate = (drawDate, lotteryResults) => {
    let luckyDraw = lotteryResults.filter(draw => moment(drawDate).isSame(draw.drawDate, 'day'))

    if(!luckyDraw[0])
        throw {status:200, message:'results for the especified draw are not available'}

    return luckyDraw[0]
}


const _getAmountOfNormalNumberMatch = (normalNumbers, luckyDrawNumbers) => {

    const amount = normalNumbers.filter(function(obj) {
        return luckyDrawNumbers.indexOf(obj) !== -1
    })

    return amount.length
}

const _calculateReward = (powerNumberMatch, normalNumbersMatch) => {

    switch(normalNumbersMatch) {
        case 0:
            return powerNumberMatch ? 4 : 0  
        case 1:
            return powerNumberMatch ? 4 : 0  
        case 2:
            return powerNumberMatch ? 7 : 4  
        case 3:
            return powerNumberMatch ? 100 : 7  
        case 4:
            return powerNumberMatch ? 50000 : 100  
        case 5:
            return powerNumberMatch ? 'grand_prize' : 100000  
        default:
            return 0
     }

}

const _checkNumbersMatch = (lotteryNumbers, luckyDraw) => {

    lotteryNumbers.forEach((lotteryNumber, index) => {

        const powerNumberMatch = (lotteryNumber.powerNumber == luckyDraw.powerNumber)
            
        const normalNumbersMatch = _getAmountOfNormalNumberMatch(lotteryNumber.normalNumbers, luckyDraw.normalNumbers)

        lotteryNumbers[index].prizeData = {
            luckyDraw: luckyDraw,
            powerNumberMatch,
            normalNumbersMatch,
            reward: _calculateReward(powerNumberMatch, normalNumbersMatch)
        }
    })

    return lotteryNumbers
}

const getScoreData = (drawDate, lotteryNumbers, lotteryResults) => {

    const luckyDraw = _getDrawByDate(drawDate, lotteryResults) 

    lotteryNumbers = _checkNumbersMatch(lotteryNumbers, luckyDraw)

    return {drawDate, lotteryNumbers}

}

module.exports = { validateReqBody, getScoreData }