const { Supplies, Complex } = require("../../../db.js");

async function getSuppliesByOwner (req, res){
    const {id} = req.params
      try {
        const getComplex = await Complex.findAll({
          where:{ownerId : id},
          include : [{model:Supplies}]
        });
        res.status(200).json(getComplex);
      } catch (e) {
        res.status(400).json({ msg: "no hay elementos" });
      }
}

module.exports = {
    getSuppliesByOwner,
  };