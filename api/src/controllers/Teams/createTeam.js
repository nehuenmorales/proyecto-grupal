// const { Teams, Player, conn } = require("../../db.js");
// const { Op } = require("sequelize");
// const { QueryTypes } = require("sequelize");


// async function createTeam(req, res, next) {
//   const { name, image, sport, playerEmail, amountPlayers } = req.body;
//   try {
//     // const newTeam = await conn.query(
//     //   `(INSERT INTO teams(name,  image, sport, "amountPlayers")
//     //    VALUES (:name,:image, :sport, :amountplayers))`,
//     //   {
//     //     replacements: { name:name,
//     //      image:image,
//     //     sport:sport,
//     //   amountplayers:amountPlayers},
//     //     type: QueryTypes.SELECT,
//     //   }
//     // );
//     const player = await Player.findOne({
//       where: {
//         email: {
//           [Op.eq]: playerEmail,
//         },
//       },
//     });
//     // await newTeam.addPlayer(player);

//     //FALTA LA RUTA DE CREACION DEL USUARIO/COMPLEJO para linkear a un complejo

//     // busco el complejo que crea la cancha
//     // const complexField = await Complex.findOne({
//     //   where: { id: complexId },
//     // });
//     // newField.addField(complexField); // asocio la cancha con el complejo
//     res.status(200).json(newTeam);
//   } catch (e) {
//     console.log("fallo la creacion de la cancha", e);
//     res.status(400).json(e);
//   }
// }

// module.exports = {
//   createTeam,
// };



const { Teams, Player } = require("../../db.js");
const { Op } = require("sequelize");

async function createTeam(req, res, next) {
  const { name, image, sport, playerEmail, amountPlayers } = req.body;
  try {
    const newTeam = await Teams.create({
      name,
      image,
      sport,
      amountPlayers,
    });
    const player = await Player.findOne({
      where: {
        email: {
          [Op.eq]: playerEmail,
        },
      },
    });
    await newTeam.addPlayer(player);

    //FALTA LA RUTA DE CREACION DEL USUARIO/COMPLEJO para linkear a un complejo

    // busco el complejo que crea la cancha
    // const complexField = await Complex.findOne({
    //   where: { id: complexId },
    // });
    // newField.addField(complexField); // asocio la cancha con el complejo
    res.status(200).json(newTeam);
  } catch (e) {
    console.log("fallo la creacion de la cancha", e);
    res.status(400).json(e);
  }
}

module.exports = {
  createTeam,
};
