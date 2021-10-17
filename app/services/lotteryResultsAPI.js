const axios = require('axios')
const moment = require('moment')

const globalConst = require("../utils/globalConst")

const _getJsonFromAPI = async (url) => {

    const json = await axios.get(url)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        throw {status:500, error}
      })

    return json
}

const _sanitizeResults = (lotteryResults) => {
        
    //TODO add scheme validation
    lotteryResults = lotteryResults.map(result => {
        let luckyNumbers = result.winning_numbers.split(' ')
        
        luckyNumbers = luckyNumbers.map(numberTxt => parseInt(numberTxt))

        let sanitizedData = {
            drawDate: result.draw_date,
            powerNumber: luckyNumbers.pop(),
            normalNumbers: luckyNumbers
        }
        return sanitizedData
    })

    return lotteryResults
}

const _getLotteryResults = async (url) =>  {

    //TODO: add cache
    let lotteryResults = await _getJsonFromAPI(url)

    lotteryResults = _sanitizeResults(lotteryResults)

    return lotteryResults
}


const getDrawByDate = async (drawDate) => {

    const lotteryResults = await _getLotteryResults(globalConst.LOTTERY_API_URL)

    let luckyDraw = lotteryResults.filter(draw => moment(drawDate).isSame(draw.drawDate, 'day'))

    if(!luckyDraw[0])
        throw {status:200, message:'lottery results for the specified draw are not available'}

    return luckyDraw[0]
}


module.exports = { getDrawByDate }
