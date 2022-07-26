//const {Field} = require("../../../db")
//const {Op} = require('sequelize')
const { QueryTypes } = require('sequelize');
const { conn } = require('../../../db.js');

// async function getFieldById (id) {
//     let fields = await Field.findAll({
//         where: {
//                 id:{
//                     [Op.iLike]:`%${id}%`
//                 }
//         },
//     })
//     return fields
// }

// const getFields = async (req, res) =>{
//     const {id} = req.params
//     try {
//         if(id){
//         let field = await getFieldById(id)
//         if(field) return res.json(field)
//     }
//     let fields = await Field.findAll()
//     console.log(fields)
//     res.json(fields)        
//     } catch (error) {
//      res.status(404).send("No se pudieron obtener las canchas")    
//     }}

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

module.exports = {getFields}

