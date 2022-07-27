const { Op } = require("sequelize");
const { Field , Complex} = require("../../../db");


async function getSearchField(req, res, next) {
  let sport=req.params.sport
  let name = req.query.name
  let city=req.query.city
  if (!city && name){

    try {
        let fields = await Field.findAll({
          where: {
            sport: {
              [Op.eq]: sport,
            },
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          order: [["name", "ASC"]],
        });
        res.send(fields);
      } catch (error) {
        res.status(400).send("la cancha no existe");
      }
  }else{
    try {
      let fields = await Complex.findAll({
        where: {
          city: {
            [Op.iLike]: `%${city}%`,
          },

        },
        // order: [["name", "ASC"]],

      });
      res.send(fields);
    } catch (error) {
      res.status(400).send("la cancha no existe");
    }
  }
  
}


module.exports = {
  getSearchField,
};