const { Owner } = require("../../../db");

async function getOwner(req, res, next) {
    const {id} = req.params
    console.log(id, 'soy id')
  try {
    console.log('entro al controller')
   const owner = await Owner.findOne(
    {
       where:{
           email: id
       }}
      )
    res.json({msg: owner }).status(200);
  } catch (err) {
    console.log(err, 'error')
    res.status(400).json({msg:'no se encontro nada'});
  }
}

module.exports = {
  getOwner,
};