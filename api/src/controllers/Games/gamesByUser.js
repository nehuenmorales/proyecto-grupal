const { Games, Player } = require ("../../db.js")   

async function gamesByUser(req, res, next) {
    const { id } = req.params
    try {
        const gamesUser = await Player.findOne({
            where: {
                id: id
            },
            include: [{model: Games}]
        })
        res.send(gamesUser)
    }catch(e){
        res.send(e)
        console.log(e)
    }
}

module.exports = {
    gamesByUser
}