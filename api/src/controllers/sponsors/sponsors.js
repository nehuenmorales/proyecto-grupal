const { Sponsors,Products} = require("../../db");


async function getAllSponsors(req, res, next) {
  try {
    const sponsors = await Sponsors.findAll()
    res.status(200).json(sponsors);
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: "Fallo la obtencion de los sponsors" ,e});
  }
}
async function getAllProducts(req, res, next) {
  try {
    const sport=req.params
    const products = await Products.findAll({
      where: {
          sport: sport
      }
  })
    res.status(200).json(products);
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: "Fallo la obtencion de los productos" ,e});
  }
}

async function createSponsor(req, res, next) {
  const {
    name,
    logo,
    link,
    cuit,
    address
  } = req.body;
  try {
    const newSponsor = await Sponsors.create({
        name,
        logo,
        link,
        cuit,
        address
    });
    console.log('creado correctamente')
    res.status(200).json(newSponsor);
  } catch (e) {
    console.log("fallo la creacion del sponsor", e);
    res.status(400).json({ msg: "fallo la creacion del sponsor" });
  }
}
async function createProduct(req, res, next) {
  const {
    name,
    link,
    image,
    description,
    sport,
    sponsorId,
  } = req.body;
  try {
    const newProduct = await Products.create({
      name,
      link,
      image,
      description,
      sport,
      sponsorId,
    });
    console.log('creado correctamente')
    res.status(200).json(newProduct);
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: "fallo la creacion del producto", e });
  }
}





module.exports = {
  createSponsor,
  getAllSponsors,
  createProduct,
  getAllProducts,
};