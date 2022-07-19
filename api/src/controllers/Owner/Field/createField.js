const { Complex, Field } = require("../../../db");

async function createField(req, res, next) {
  const {
    name,
    sport,
    available,
    pricePerTurn,
    durationPerTurn,
    description,
    capacity,
    start,
    end, // aca configurar magui y lara
    complexId,
  } = req.body;
  try {
    const newField = await Field.create({
      name,
      sport,
      available,
      pricePerTurn,
      durationPerTurn,
      description,
      capacity,
      start,
      end, // aca configurar magui y lara
    
    });

    //FALTA LA RUTA DE CREACION DEL USUARIO/COMPLEJO para linkear a un complejo

    // busco el complejo que crea la cancha
    // const complexField = await Complex.findOne({
    //   where: { id: complexId },
    // });
    // newField.addField(complexField); // asocio la cancha con el complejo
    res.status(200).json(newField);
  } catch (e) {
    console.log("fallo la creacion de la cancha", e);
    res.status(400).json({ msg: "fallo la creacion de la receta" });
  }
}

module.exports = {
  createField,
};
