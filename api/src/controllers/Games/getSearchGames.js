const { Games,Field,Complex } = require ("../../db.js")

const { Op } = require("sequelize");


//------------------------BUSCAR POR CIUDAD--------------------------

async function getSearchGamesCity(req, res, next) {
    let sport=req.params.sport
    let city = req.query.city

    // try {
    //     let fields = await Field.findAll({ // complex va primero
    //         include: Games,
    //         include:Complex,
    //       where: {
    //         sport: {
    //           [Op.eq]: sport,
    //         },
    //         name: {
    //           [Op.iLike]: `%${name}%`,
    //         },
    //         'Complex.city' :{

    //         }
    //       },
    //       attributes:["name","sport","available","pricePerTurn","start","end"]
    //     });
    //     res.send(fields);
    //   } catch (error) {
    //     res.status(400).send("la cancha no existe");
    //   }

      try {
        let fields = await Complex.findAll({ // complex va primero
          where: {
            city: {
              [Op.iLike]: `%${city}%`,
            },
          },
          include: {
           model: Field,
           where: {
            sport: {
              [Op.eq]: sport,
            },
          },
          include: Games,
        }
        });
      
        res.send(fields);
      } catch (error) {
        res.status(400).send("error en el controler de busqueda por ciudad", error);
      }
  
    }


//-------------------------------BUSCAR POR NOMBRE -------------------------------------------

async function getSearchGamesName(req, res, next) {
    let sport=req.params.sport
    let name = req.query.name


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
          include: Games,
        });
        res.send(fields);
      } catch (error) {
        res.status(400).send("error en el controler de busqueda por nombre", error);
      }
}

    module.exports = {
        getSearchGamesName,
        getSearchGamesCity
      };
    