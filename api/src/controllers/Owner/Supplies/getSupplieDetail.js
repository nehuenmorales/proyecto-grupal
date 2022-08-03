const { Supplies } = require("../../../db.js");

async function getSupplieDetail (req, res){
    const {id} = req.params
      try {
        const getSupplie = await Supplies.findByPk(id);
        res.status(200).json(getSupplie);
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "No se pudo obtener el detalle" });
      }
}

module.exports = {
    getSupplieDetail,
  };