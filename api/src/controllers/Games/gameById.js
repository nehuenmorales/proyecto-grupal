const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');


async function detailGame (req, res, next){
    const {id} = req.params
    try{
    const detail= await conn.query(`(SELECT g.*, f.name,f.image, f."pricePerTurn", x.adress, x.name AS complexName, x.city, f.capacity, f.start AS open, f.end AS close
        FROM "games" g
        JOIN fields f ON g."fieldId" = f.id
        JOIN complexes x ON x.id=f."complexId"
        WHERE g.id = :id)`,
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


module.exports = {detailGame}