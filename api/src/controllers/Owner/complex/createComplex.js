const { Complex, Field } = require("../../../db");

async function createComplex(req, res, next) {
  const {
    name,
    sports,
    description,
    address,
    image, 
    ownerId,
    city,
    state,
    lat,
    lng,
    country,
    id
  } = req.body;
  try {
    const newField = await Complex.create({
      name,
      sports,
      description,
      address,
      image, // aca configurar magui y lara
      ownerId,
      city,
      state,
      lat,
      lng,
      country,
      id
    });
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