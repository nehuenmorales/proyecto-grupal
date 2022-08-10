const { Games, Field, Complex, conn } = require("../../db.js");

const { Op, QueryTypes } = require("sequelize");

async function getSearchGames(req, res, next) {
  const sport = req.params.sport;
  const name = req.query.name;
  console.log(sport, name);
  // const agarrarloqueneceistamos=(ele)=>{
  //   const infields=[]
  //   const infneed=[]

  //   for (let i = 0; i < ele.length; i++) {
  //     ele[i].fields.map((e)=>infields.push(e))

  //   }

  //   for (let i = 0; i < infields.length; i++) {
  //     let turnInf={capacity:infields[i].description,
  //       description:infields[i].description,
  //       name:infields[i].name,
  //       pricePerTurn:infields[i].pricePerTurn,
  //       }
  //       console.log(turnInf)
  //       infields[i].games.map((e)=>{infneed.push({...e,turnInf})})
  //   }

  //   return infneed
  // }

  try {
    let games = await conn.query(
      `(SELECT g.*, f.name, f.capacity, f."pricePerTurn", f.description,x.city,x.name AS complex_name,x.address,x.state
        FROM "games" g
        JOIN fields f ON g."fieldId" = f.id
        JOIN complexes x ON f."complexId"=x.id
        WHERE g.status = 'free' AND g.sport = :sport AND (x.city LIKE :name OR f.name LIKE :name OR x.state LIKE :name OR x.address LIKE :name) )`,
      {
        replacements: { 
          sport: sport,
          name: `%${name}%`,
          city: `%${name}%`, 
          state: `%${name}%`, 
          address: `%${name}%`, 
        },
        type: QueryTypes.SELECT,
      }
    );
    //OR f.name LIKE %:name%

    // await Complex.findAll({
    //     where:{
    //       '$fields.sport$':{
    //             [Op.eq]: sport,
    //             },
    //         [Op.or]:[
    //             {adress:{
    //                 [Op.iLike]: `%${name}%`,
    //               }},
    //             {'$fields.name$':{
    //                 [Op.iLike]: `%${name}%`,
    //             }}
    //     ]},
    //     include: [ {
    //         model: Field,
    //         // where: {
    //         //   sport: {
    //         //    [Op.eq]: `%${sport}%`,
    //         //   },
    //         // },
    //         include: {
    //           model: Games ,
    //         }
    //     } ]
    // });

    // // fields=agarrarloqueneceistamos(fields)
    console.log("soy games desde el controller", games);
    res.send(games);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
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
