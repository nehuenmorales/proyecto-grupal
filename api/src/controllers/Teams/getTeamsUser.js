const { Player,Teams } = require("../../db.js");
const { QueryTypes } = require("sequelize");
const { conn } = require("../../db");
const { Op } = require("sequelize");

async function getTeamsUser(req, res, next) {
  const playerEmail = req.params.email;
  try {
    console.log(playerEmail);
    const player = await Player.findOne({
      where: {
        email: {
          [Op.eq]: playerEmail,
        },
      },
    });

    console.log("soy el player en el contrller",player.id)

    const allTeams = await conn.query(
      `(SELECT t.*
        FROM teams t
        JOIN player_teams pt ON pt."teamId" = t.id
        WHERE pt."playerId"=:id
        GROUP BY t.id )`,
      {
        replacements: { id: player.id },
        type: QueryTypes.SELECT,
      }
    );
   
    

    res.send(allTeams);
  } catch (err) {
    res.status(400).send("error pai");
  }
}
module.exports = {
  getTeamsUser,
};
