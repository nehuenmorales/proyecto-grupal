const { Teams } = require("../../db.js");
const { QueryTypes } = require("sequelize");
const { conn } = require("../../db");
const { Op } = require("sequelize");

async function getTeam(req, res, next) {
  const id = req.params.id;
  try {
    const team = await Teams.findOne({
      where: {
        id:{
            [Op.eq]: id
        }
      },
    });    
    res.send(team);
  } catch (err) {
    res.status(400).send("error pai");
  }
}
module.exports = {
    getTeam,
};
