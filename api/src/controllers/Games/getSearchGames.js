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
                    {city:{
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
                //    [Op.eq]: `%${sport}%`,
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





//------------------------BUSCAR POR CIUDAD--------------------------

// async function getSearchGamesCity(req, res, next) {
//     let sport=req.params.sport
//     let city = req.query.city

//       try {
//         let fields = await Complex.findAll({ // complex va primero
//           where: {
//             city: {
//               [Op.iLike]: `%${city}%`,
//             },
//           },
//           required: false,
//             include: {
//             model: Field,
//             as: 'Instruments',
//             where: {
//               size: { [Op.ne]: 'small' }
//             },
//             required: false
//           }


//           include: {
//            model: Field,
//            where: {
//             sport: {
//               [Op.eq]: sport,
//             },
//           },
//           include: Games,
//         }
//         });
      
//         res.send(fields);
//       } catch (error) {
//         res.status(400).send("error en el controler de busqueda por ciudad", error);
//       }
  
//     }


//-------------------------------BUSCAR POR NOMBRE -------------------------------------------

// async function getSearchGamesName(req, res, next) {
//     let sport=req.params.sport
//     let name = req.query.name


//     try {
//         let fields = await Field.findAll({
//           where: {
//             sport: {
//               [Op.eq]: sport,
//             },
//             name: {
//               [Op.iLike]: `%${name}%`,
//             },
//           },
//           include: Games,
//         });
//         res.send(fields);
//       } catch (error) {
//         res.status(400).send("error en el controler de busqueda por nombre", error);
//       }
// }

    // module.exports = {
    //     getSearchGamesName,
    //     getSearchGamesCity
    //   };
    