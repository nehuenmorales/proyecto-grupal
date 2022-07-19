const { Supplies } = require("../../../db.js");

async function deleteSupplies (req, res){
    const {id} = req.params;
    try {
        await Supplies.destroy({where: {id : id}})
        res.json({msg: 'elemento eliminado correctamente'})
    } catch (error) {
        console.log(error)
        res.json({msg: 'no se pudo eliminar'}) 
    }
}

module.exports = {
    deleteSupplies,
  };