const { Games, Field } = require ("../../db.js")
const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');

async function getGames(req, res, next) {
    const {sport} = req.params
    try {
        const allGames= await conn.query(`(SELECT g.*, f.name, f.capacity,x.name,x.adress,x.city,f."pricePerTurn", f.description
        FROM "games" g
        JOIN fields f ON g."fieldId" = f.id
        JOIN complexes x ON x.id= f."complexId"
        WHERE g.status = 'free' AND g.sport = :sport)`,
            {
                replacements: { sport: sport},
                type: QueryTypes.SELECT
            })
        res.send(allGames)
    }catch(e) {
        console.log(e)
    }
}

async function prebooked(req, res, next) {
    const{id,privacy,requirements,link,type,status}=req.body
    try {
        const game= await Games.findOne({where:{id:id}})
         await game.update({
            privacy:privacy,
            requirements:requirements,
            link:link,
            type:type,
            status:status,
         })
        res.send(allGames)
    }catch(e) {
        console.log(e)
    }
}
// async function getFields(req, res, next){
//     const {id} = req.params
//     const {sport} = req.params
//     try{
//     const allGames= await conn.query(`(SELECT f.*, x.adress, x.image
//         FROM "fields" f
//         JOIN complexes x ON f."complexId" = x.id
//         WHERE f.id = :id AND f.sport = :sport)`,
//                 {
//                     replacements: { sport: sport, id: id},
//                     type: QueryTypes.SELECT
//                 })
//      res.send(allGames)
//     }catch(e){
//         console.log(e)
//     }
// }

module.exports = {
    getGames,
    prebooked,
}

