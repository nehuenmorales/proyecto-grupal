const { Complex, Supplies } = require("../../../db");

async function createSupplies(req, res, next) {
  const { name, sport, stock, price, complexId } = req.body; // se le pasa por body el id del complejo
  try {
    const newSupplies = await Supplies.create({ name, sport, stock, price });

    //FALTA LA RUTA DE CREACION DEL USUARIO/COMPLEJO para linkear a un complejo

    // busco el complejo que crea la cancha
    // const complexSupplies = await Complex.findOne({
    //   where: { id: complexId },
    // });
    // newSupplies.addField(complexField); // asocio la cancha con el complejo
    res.status(200).json(newSupplies);
  } catch (e) {
    console.log("fallo la creacion de la cancha", e);
    res.status(400).json({ msg: "fallo la creacion de la receta" });
  }
}

module.exports = {
  createSupplies,
};
