const { Op } = require("sequelize");
const { Tournament} = require("../../db");


async function getTournament(req, res, next) {
  let sport=req.params.sport
  let name = req.query.name
//   let city=req.query.city
//   if (!city && name){
    if (!name){
        try {
            let fields = await Tournament.findAll({
              where: {
                sport: {
                  [Op.eq]: sport,
                },
                status:{
                    [Op.or]:["PLAYING","COMPLETE","INCOMPLETE"]
                }
                
                
              },
              order: [["name", "ASC"]],
            });
            res.send(fields);
          } catch (error) {
            res.status(400).send("la cancha no existe");
          }

    }else {

        try {
            let fields = await Tournament.findAll({
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
    }

//   }else{
//     try {
//       let fields = await Complex.findAll({
//         where: {
//           city: {
//             [Op.iLike]: `%${city}%`,
//           },

//         },
//         // order: [["name", "ASC"]],

//       });
//       res.send(fields);
//     } catch (error) {
//       res.status(400).send("la cancha no existe");
//     }
//   }
  
}


module.exports = {
  getTournament,
};