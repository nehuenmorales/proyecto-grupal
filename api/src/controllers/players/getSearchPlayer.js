const { Op } = require("sequelize");
const { Player } = require("../../db");


async function getSearchPlayer(req, res, next) {
  let name = req.query.name
  let city=req.query.city

    try {
      let fields = await Player.findAll({
        where:{

                email:{
                    [Op.iLike]: `%${name}%`,
                  },

        },

        order:[["name","ASC"]]
    });
    res.send(fields);
      } catch (error) {
        res.status(400).send("la cancha no existe");
      }


}


module.exports = {
  getSearchPlayer,
};