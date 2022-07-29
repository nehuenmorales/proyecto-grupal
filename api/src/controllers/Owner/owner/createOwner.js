const { Owner } = require("../../../db");

async function createOwner(req, res, next) {
  let { name, lastName, email, telephone, username, id } = req.body;
  try {
    const player = await Owner.create({
      id: id,
      name: name,
      lastName: lastName,
      email: email,
      telephone: telephone,
      username: username,
    });

    return res.json(player).status(200);
  } catch (err) {
    console.log("el error en el controllerrrrr", err);
    return res.status(400).json(new Error(err));
  }
}

module.exports = {
  createOwner,
};
