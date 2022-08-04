const { Games } = require("../../../db.js");

async function deleteGames (req, res){
    const {id} = req.params;
    console.log(id, "entro a la ruta delete")
    try {
        const destroy = await Games.destroy({
            where: {
                fieldId: id
            }
        }) 
        res.json({msg: 'Turnos eliminados'})
    } catch (error) {
        console.log(error)
        res.json({msg: 'no se pudo eliminar', error}) 
    }
}

module.exports = {
    deleteGames,
  };