const { Complex, Field } = require("../../../db");

async function createComplex(req, res, next) {
  const {
    name,
    sports,
    description,
    address,
    country,
    state,
    city,
    lat,
    lng,
    image, 
    ownerId,
  } = req.body;
  try {
    const newComplex = await Complex.create({
      name,
      sports,
      description,
      adress: address,
      country,
      state,
      city,
      lat,
      lng,
      image
    });
     
        await newComplex.update(
          {
              ownerId: ownerId,
          }
      )

    
    
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
