const { QueryTypes } = require('sequelize');
const { conn } = require('../../../db.js');

async function detailFields (req, res, next){
    const {id} = req.params
    try{
    const detail= await conn.query(`(SELECT g.*, f.name, f."pricePerTurn", f."durationPerTurn", f.capacity, f.start AS open, f.end AS close
        FROM "games" g
        JOIN fields f ON g."fieldId" = f.id
        WHERE g.status = 'free' 
        AND f.id = :id)`,
                {
                    replacements: { id: id},
                    type: QueryTypes.SELECT
                }
                )
                res.send(detail)
    }catch(e){
        console.log(e)
    }
}

async function getFields (req, res, next){
    const {id} = req.params
    const {sport} = req.params
    try{
    const allGames= await conn.query(`(SELECT f.*
        FROM "fields" f
        WHERE f.sport = :sport)`,
                {
                    replacements: { sport: sport},
                    type: QueryTypes.SELECT
                }
                )
                res.send(allGames)
    }catch(e){
        console.log(e)
    }
}

module.exports = {getFields,detailFields}

