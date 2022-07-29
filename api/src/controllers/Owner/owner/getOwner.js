const { Owner } = require("../../../db");

async function getOwner(req, res, next) {
    const {id} = req.params
    // console.log(email, 'soy id')
    try {
      const allPlayers = await Owner.findByPk(id)
  
      res.send(allPlayers)
  
    } catch (error) {
      res.status(400).json(error);
    }
}

module.exports = {
  getOwner,
};