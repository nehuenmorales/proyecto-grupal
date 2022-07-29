const { Field, Complex } = require("../../../db.js");

async function getFieldByOwner (req, res){
    const {id} = req.params
      try {
        const getComplex = await Complex.findAll({
          where:{ownerId : id}
        });
        const getField = await Field.findAll({
            where: {complexId : getComplex.id}
        })
        res.status(200).json(getField);
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "no hay reservas" });
      }
}

module.exports = {
    getComplexByOwner,
  };