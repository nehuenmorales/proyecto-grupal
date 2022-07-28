const { Player } = require("../../db");

async function modifyProfile(req, res, next) {
  const { id } = req.params;

  try {
    const playerToModify = await Player.findOne({ where: { id: id } });
    for (let prop in req.body) {
      // recorro el body con tal que me modifique las propiedades mandadas por body
      playerToModify[prop] = req.body[prop];
    }
    res.status(200).send(playerToModify);
  } catch (error) {
    console.log("error en la moficacion del player");
    res.status(400).send({ msg: "Error while modifying the field" });
  }
}

module.exports = {
  modifyProfile,
};