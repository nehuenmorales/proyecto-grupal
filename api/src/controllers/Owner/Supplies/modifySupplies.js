const { Supplies } = require("../../../db.js");

async function modifySupplie(req, res, next) {
  const { id } = req.params;

  try {
    // const SupplieToModify = await Supplie.findOne({ where: { id: id } });
    // for (let prop in req.body) {
    //   // recorro el body con tal que me modifique las propiedades mandadas por body
    //   SupplieToModify[prop] = req.body[prop];
    // }
    const updateSupplie = await Supplies.update(
      {
        price: req.body.price,
        stock: req.body.stock
      },
      {
        where: { id: id },
      }
    )
    console.log(updateSupplie, 'soy update ')
    res.status(200).send(updateSupplie);
  } catch (error) {
    console.log("error en la moficacion del elemento");
    res.status(400).send({ msg: "Error while modifying the supplie" });
  }
}

module.exports = {
  modifySupplie,
};
