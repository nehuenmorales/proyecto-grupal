const { Player } = require("../../../db.js");

async function getUser (req, res){
    const {username} = req.params
      try {
        const getUser = await Games.findOne({
          where:{username : username}
        });
        res.status(200).json(getUser);
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "no se encontró el jugador" });
      }
}

module.exports = {
    getUser,
  };