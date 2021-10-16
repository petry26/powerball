const axios = require('axios')

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

        let sanitizedData = {
            drawDate: result.draw_date,
            powerNumber: luckyNumbers.pop(),
            normalNumbers: luckyNumbers
        }
        return sanitizedData
    })

    return lotteryResults
}

const getLotteryResults = async (url) =>  {

    //TODO: add cache
    let lotteryResults = await _getJsonFromAPI(url)

    lotteryResults = _sanitizeResults(lotteryResults)

    return lotteryResults
}

module.exports = { getLotteryResults }
