const { Games,Field,Complex } = require ("../../db.js")

const { Op } = require("sequelize");

async function getSearchGames(req, res, next) {
    let sport=req.params.sport
    let name = req.query.name
    console.log(sport,name)

    try {
        let fields = await Field.findAll({ // complex va primero
            include: Games,
            include:Complex,
          where: {
            sport: {
              [Op.eq]: sport,
            },
            name: {
              [Op.iLike]: `%${name}%`,
            },
            'Complex.city' :{

            }
          },
          attributes:["name","sport","available","pricePerTurn","start","end"]
        });
        res.send(fields);
      } catch (error) {
        res.status(400).send("la cancha no existe");
      }
  
    }

    module.exports = {
        getSearchGames,
        
      };
    