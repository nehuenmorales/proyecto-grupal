const { Games, Field } = require ("../../db.js")
const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');

async function getGames(req, res, next) {
    const {sport} = req.params
    try {
        // const allGames = await Games.findAll({
        //     where: {
        //         status:"free",
        //         sport: sport 
        //     },
            
        // })

        const allGames= await conn.query(`(SELECT g.*, x.adress, x.image, f.name, f.capacity, f."pricePerTurn", f.description, x.name AS complex_name
        FROM "games" g
        JOIN fields f ON g."fieldId" = f.id
        JOIN complexes x ON f."complexId" = x.id
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
    getGames
}

