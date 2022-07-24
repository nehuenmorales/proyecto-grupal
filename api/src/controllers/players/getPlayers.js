const { Player } = require("../../db.js");

async function getPlayers(req, res, next) {
  try {
    const allPlayers = await Player.findAll()

    res.send(allPlayers)

  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  getPlayers,
};
