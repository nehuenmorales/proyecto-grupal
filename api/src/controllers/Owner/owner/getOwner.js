const { Owner } = require("../../../db");

async function getOwner(req, res, next) {
    const {id} = req.params
    // console.log(email, 'soy id')
    console.log('holaaaaaaaaaaaa', id)
    try {
      const allPlayers = await Owner.findByPk(id)
      console.log(allPlayers, 'playersssss')
  
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