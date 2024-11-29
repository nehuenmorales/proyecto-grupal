const { Complex } = require("../../../db.js");

async function getComplexByOwner (req, res){
    const {id} = req.params
      try {
        const getComplex = await Complex.findAll({
          where:{ownerId : id}
        });
        res.status(200).json(getComplex);
      } catch (e) {
        res.status(400).json({ msg: "no hay reservas" });
      }
}

module.exports = {
    getComplexByOwner,
  };