const { Field, Complex } = require("../../../db.js");

async function getFieldByOwner (req, res){
    const {id} = req.params
      try {
        const getComplex = await Complex.findAll({
          where:{ownerId : id},
          include : [{model:Field}]
        });

        // let filtrados = [];
        // for (let i = 0; i < getComplex.length; i++) {
        //    filtrados.push(getComplex[i].id)
        // }
       
        // const getField = await Field.findAll({
        //     where: {complexId : filtrados}
        // })
        res.status(200).json(getComplex);
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "no hay reservas" });
      }
}

module.exports = {
    getFieldByOwner,
  };