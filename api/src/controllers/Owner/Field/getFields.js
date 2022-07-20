const {Field} = require("../../../db")
const {Op} = require('sequelize')

async function getFieldByName (name) {
    let fields = await Field.findAll({
        where: {
                name:{
                    [Op.iLike]:`%${name}%`
                }
        },
    })
    return fields
}

const getFields = async (req, res) =>{
    const {name} = req.query
    try {
        if(name){
        let field = await getFieldByName(name)
        if(field) return res.json(field)
    }
    let fields = await Field.findAll()
    res.json(fields)        
    } catch (error) {
     res.status(404).send("No se pudieron obtener las canchas")    
    }}

module.exports = {getFields}