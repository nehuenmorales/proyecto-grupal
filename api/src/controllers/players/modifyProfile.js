const { Player } = require("../../db");

async function modifyProfile(req, res, next) {
  const { email } = req.query;

  try {
    const playerToModify = await Player.findOne({ where: { email: email } });
    for (let prop in req.body) {
      // recorro el body con tal que me modifique las propiedades mandadas por body
      playerToModify[prop] = req.body[prop];
    }
    const put = await Player.update(
      {
        name: playerToModify.name,
        lastName : playerToModify.lastName,
        telephone: playerToModify.telephone,
        username: playerToModify.username,
        city:playerToModify.city,
      },
      {
        where: { email: email }
      }
    
    )
    res.status(200).send(playerToModify);
  } catch (error) {
    console.log("error en la moficacion del player");
    res.status(400).send({ msg: "Error while modifying the field" });
  }
}

module.exports = {
  modifyProfile,
};