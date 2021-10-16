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

const getLoterryResults = async (url) =>  {

    const loterryResults = await _getJsonFromAPI(url)

    return loterryResults
}

module.exports = { getLoterryResults }
