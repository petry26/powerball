const axios = require('axios');

const _getJsonFromAPI = async (url) => {

    const json = await axios.get(url)
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        throw Error(error)
      })

    return json
}

const _sanitizeResults = (loterryResults) => {
        
    loterryResults = loterryResults.map(result => {
        let luckyNumbers = result.winning_numbers.split(' ')

        let sanitizedData = {
            drawDate: result.draw_date,
            powerNumber: luckyNumbers.pop(),
            normalNumbers: luckyNumbers
        }
        return sanitizedData
    })

    return loterryResults
}

const getLoterryResults = async (url) =>  {

    //TODO: add cache
    let loterryResults = await _getJsonFromAPI(url)

    loterryResults = _sanitizeResults(loterryResults)

    return loterryResults
}

module.exports = { getLoterryResults }
