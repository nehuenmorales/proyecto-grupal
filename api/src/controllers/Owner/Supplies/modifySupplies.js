const { Supplies } = require("../../../db");

async function modifySupplies(req, res, next) {
  const { id } = req.params;

  try {
    const supplieToModify = await Supplies.findOne({ where: { id: id } });
    for (let prop in req.body) {
      // recorro el body con tal que me modifique las propiedades mandadas por body
      supplieToModify[prop] = req.body[prop];
    }
    res.status(200).send(supplieToModify);
  } catch (error) {
    console.log("error en la moficacion del field");
    res.status(400).send({ msg: "Error while modifying the field" });
  }
}

module.exports = {
  modifySupplies,
};
