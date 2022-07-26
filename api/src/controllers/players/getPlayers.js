const { Player } = require("../../db.js");

async function getPlayers(req, res, next) {
  let name = req.query.name
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
          order: [["name", "ASC"]],
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
