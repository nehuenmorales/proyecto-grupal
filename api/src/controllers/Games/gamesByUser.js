const { Games, Player } = require ("../../db.js")
const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');

async function gamesByUser(req, res, next) {
    const { email } = req.params
    console.log(req.params, "es el body") 
    try {
        // const gamesUser = await Player.findOne({
        //     where: {
        //         email: email
        //     },
        //     include: [{model: Games}]
        // })
        const gamesUser= await conn.query(`(SELECT p.name,p.email,p.id,f.id, g.*, f.name, x.id
            FROM "players" p 
            JOIN player_games pg ON p.id= pg."playerId"
            JOIN games g ON pg."gameId" = g.id 
            JOIN fields f ON g."fieldId"= f.id
            JOIN complexes x ON f."complexId" = x.id
            WHERE p.email = :email)`,
                        {
                            replacements: { email: email},
                            type: QueryTypes.SELECT
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