const { Teams, Player } = require("../../db.js");
const { QueryTypes } = require("sequelize");
const { conn } = require("../../db");
const { Op } = require("sequelize");

async function aceptInvitation(req, res, next) {
  const {id, email} = req.query;


  try {
    const player = await Player.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    const team = await Teams.findByPk(id);

    await team.addPlayer(player);    

    res.send(team);
  } catch (err) {
    res.status(400).send("error pai");
  }
}
module.exports = {
    aceptInvitation,
};