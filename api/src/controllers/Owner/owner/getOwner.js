const { Owner } = require("../../../db");

async function getOwner(req, res, next) {
    // const {email} = req.params
    // console.log(email, 'soy id')
    try {
      const allPlayers = await Owner.findAll()
  
      res.send(allPlayers)
  
    } catch (error) {
      res.status(400).json(error);
    }
}

module.exports = {
  getOwner,
};