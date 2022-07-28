const { Owner } = require("../../../db");

async function getOwner(req, res, next) {
    const {id} = req.params
  try {
   const owner = await Owner.findOne({
       where:{
           email: id
       }})
    return res.json(owner).status(200);
  } catch (err) {
    return res.status(400).json(new Error(err));
  }
}

module.exports = {
  getOwner,
};