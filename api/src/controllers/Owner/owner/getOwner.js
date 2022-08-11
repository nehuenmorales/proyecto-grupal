const { Owner } = require("../../../db");

async function getOwner(req, res, next) {
    const {id} = req.params
    try {
      const allPlayers = await Owner.findByPk(id)
      res.send(allPlayers)
  
    } catch (error) {
      res.status(400).json(error);
    }
}
async function getAllOwners(req, res, next) {
    try {
      const allOwners= await Owner.findAll()
      res.send(allOwners)
    } catch (error) {
      res.status(400).json(error);
    }
}



module.exports = {
  getOwner,
  getAllOwners
};