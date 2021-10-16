const { getDrawByDate } = require("../../services/lotteryResultsAPI")

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

const _checkNumbersMatch = (tickets, luckyDraw) => {

    tickets.forEach((lotteryNumber, index) => {

        const powerNumberMatch = (lotteryNumber.powerNumber == luckyDraw.powerNumber)
            
        const normalNumbersMatch = _getAmountOfNormalNumberMatch(lotteryNumber.normalNumbers, luckyDraw.normalNumbers)

        tickets[index].prizeData = {
            luckyDraw: luckyDraw,
            powerNumberMatch,
            normalNumbersMatch,
            reward: _calculateReward(powerNumberMatch, normalNumbersMatch)
        }
    })

    return tickets
}

const getScoreData = async (drawDate, tickets) => {

    const luckyDraw = await getDrawByDate(drawDate) 

    tickets = _checkNumbersMatch(tickets, luckyDraw)

    return {drawDate, tickets}

}

module.exports = { getScoreData }