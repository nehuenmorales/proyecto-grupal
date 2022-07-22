const { Owner } = require("../../../db");

async function createOwner(req, res, next) {
  let { name, lastName, email, telephone, username } = req.body;
  try {
    player = await Owner.create({
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
