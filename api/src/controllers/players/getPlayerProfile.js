const { Op } = require("sequelize");
const { Player } = require("../../db");

async function getPlayerProfile(req, res, next) {
  let email = req.query.email

    try {
      let player = await Player.findAll({
        where:{
           email:{
             [Op.eq]: email,
         },
        },
    });

    res.send(player);
      } catch (error) {
        res.status(400).send("no se encontro el email", error);
      }

}
module.exports = {
  getPlayerProfile,
};