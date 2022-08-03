const { Field } = require("../../../db.js");

async function getFieldDetail (req, res){
    const {id} = req.params
      try {
        const getField = await Field.findByPk(id);
        res.status(200).json(getField);
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "No se pudo obtener el detalle" });
      }
}

module.exports = {
    getFieldDetail,
  };