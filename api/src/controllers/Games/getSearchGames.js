const { Games,Field,Complex } = require ("../../db.js")

const { Op } = require("sequelize");


async function getSearchGames(req, res, next) {
    let sport=req.params.sport
    let name = req.query.name
    console.log(sport,name)

    try {
        let fields = await Complex.findAll({
            where:{
              '$fields.sport$':{
                    [Op.eq]: sport,
                    },
                [Op.or]:[
                    {adress:{
                        [Op.iLike]: `%${name}%`,
                      }},
                    {'$fields.name$':{
                        [Op.iLike]: `%${name}%`,
                    }}
            ]},
            include: [ {
                model: Field,
                // where: {
                //   sport: {
                //    [Op.eq]: %${sport}%,
                //   },
                // },
                include: {
                  model: Games ,
                }
            } ]
        });
        res.send(fields);
      } catch (error) {
        res.status(400).send("la cancha no existe");
      }

    }

    module.exports = {
        getSearchGames,

      };