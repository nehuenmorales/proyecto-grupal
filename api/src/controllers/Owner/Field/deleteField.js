const { Field } = require("../../../db.js");

async function deleteField (req, res){
    const {id} = req.params;
    try {
        const destroy = await Field.destroy({
            where: {
                id: id
            }
        }) 
        res.json({msg: 'Cancha eliminada'})
    } catch (error) {
        res.json({msg: 'no se pudo eliminar', error}) 
    }
}

module.exports = {
   deleteField,
  };