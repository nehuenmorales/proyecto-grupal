const { Op } = require("sequelize");
const { Player } = require("../../db.js");

async function getPlayers(req, res, next) {
  const name = req.query.name
  if(!name){
    try {
      const allPlayers = await Player.findAll()

      res.send(allPlayers)

    } catch (error) {
      res.status(400).json(error);
    }
  }else{
    try {
        let players = await Player.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          // order: [["nombre", "ASC"]],
        });
        res.send(players);
      } catch (error) {
        res.status(400).send("el jugador no existe");
      }
  }
}

module.exports = {
  getPlayers,
};
