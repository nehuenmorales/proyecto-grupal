const { Complex } = require("../../../db.js");

async function getComplexDetail (req, res){
    const {id} = req.params
      try {
        const getComplex = await Complex.findByPk(id);
        res.status(200).json(getComplex);
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "No se pudo obtener el detalle" });
      }
}

module.exports = {
    getComplexDetail,
  };