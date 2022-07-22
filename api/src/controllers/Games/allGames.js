const { Games, Field } = require ("../../db.js")

async function getGames(req, res, next) {
    const {sport} = req.params
    try {
        const allGames = await Games.findAll({
            where: {
                status:"free",
                sport: sport 
            },
            
        })
        res.send(allGames)
    }catch(e) {
        console.log(e)
    }
}

module.exports = {
    getGames
}