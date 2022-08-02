const { Field } = require("../../../db.js");

async function deleteField (req, res){
    const {id} = req.params;
    console.log(id, "entro a la ruta")
    try {
        const destroy = await Field.destroy({
            where: {
                id: id
            }
        }) 
        res.json({msg: 'Cancha eliminada'})
    } catch (error) {
        console.log(error)
        res.json({msg: 'no se pudo eliminar', error}) 
    }
}

module.exports = {
   deleteField,
  };