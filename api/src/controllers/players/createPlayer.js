const { Player } = require("../../db.js");

async function createPlayer(req, res, next) {
  let { name, lastName, email, telephone, username, city, elo, status } =
    req.body;
  try { 

    let player = await Player.create({
      name,
      lastName,
      email,
      telephone,
      username,
      city,
      elo,
      status,
    });

    return res.json(player).status(200);
    
  } catch (err) {
    return res.status(400).json(new Error(err));
  }
}

module.exports = {
  createPlayer,
};
