const { Complex } = require("../../../db.js");

async function modifyComplex(req, res, next) {
  const { id } = req.params;

  try {
    // const complexToModify = await Complex.findOne({ where: { id: id } });
    // for (let prop in req.body) {
    //   // recorro el body con tal que me modifique las propiedades mandadas por body
    //   complexToModify[prop] = req.body[prop];
    // }
    const updateComplex = await Complex.update(
      {
        description: req.body.description,
        sports: req.body.sports
      },
      {
        where: { id: id },
      }
    )
    console.log(updateComplex, 'soy update ')
    res.status(200).send(updateComplex);
  } catch (error) {
    console.log("error en la moficacion del field");
    res.status(400).send({ msg: "Error while modifying the field" });
  }
}

module.exports = {
  modifyComplex,
};