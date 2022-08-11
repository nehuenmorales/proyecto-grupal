const { Owner } = require("../../../db.js");

async function modifyOwner(req, res, next) {
  const { id } = req.params;

  try {
    const updateOwner = await Owner.update(
      {
        username: req.body.username,
        name: req.body.name, 
        lastName: req.body.lastName,
        telephone: req.body.telephone
      },
      {
        where: { id: id },
      }
    )
    res.status(200).send(updateOwner);
  } catch (error) {
    res.status(400).send({ msg: "Error while modifying the owner" });
  }
}

module.exports = {
    modifyOwner,
};