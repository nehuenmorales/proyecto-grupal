const { Games, Player } = require ("../../db.js")   

async function gamesByUser(req, res, next) {
    const { email } = req.body
    try {
        const gamesUser = await Player.findOne({
            where: {
                email: email
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