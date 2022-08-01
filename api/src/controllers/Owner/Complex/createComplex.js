const { Complex, Field } = require("../../../db");

async function createComplex(req, res, next) {
  const {
    name,
    sports,
    description,
    adress,
    image, // aca configurar magui y lara
    ownerId,
    city,
  } = req.body;
  try {
    const newField = await Complex.create({
      name,
      sports,
      description,
      adress,
      image,
      ownerId,
      city
    });

    //FALTA LA RUTA DE CREACION DEL USUARIO/COMPLEJO para linkear a un complejo

    // busco el complejo que crea la cancha
    // const complexField = await Complex.findOne({
    //   where: { id: complexId },
    // });
    // newField.addField(complexField); // asocio la cancha con el complejo
    console.log('creado correctamente')
    res.status(200).json(newField);
  } catch (e) {
    console.log("fallo la creacion de la cancha", e);
    res.status(400).json({ msg: "fallo la creacion de la cancha" });
  }
}

module.exports = {
  createComplex,
};