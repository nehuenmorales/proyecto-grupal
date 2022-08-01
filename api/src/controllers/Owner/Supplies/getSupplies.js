const { QueryTypes } = require('sequelize');
const { conn } = require('../../../db.js');

async function getSupplies (req, res, next){
    const {id,sport}=req.params
    console.log(req.body,"back")
    console.log(req.params,"back")
    try{
    const detail= await conn.query(`SELECT s.*
    FROM supplies s
    JOIN complexes x ON x.id = s."complexId"
    JOIN fields f ON x.id=f."complexId"
    JOIN games g ON f.id=g."fieldId"
    WHERE g.id=:id AND s."sport"=:sport`,
        {
            replacements: { id:id , sport:sport},
            type: QueryTypes.SELECT
        }, {
            ignoreDuplicates: true,
        }
    )
    res.send(detail)
    }catch(e){
        console.log(e)
    }
}


module.exports = {getSupplies}