const { Field } = require("../../../db.js");

async function modifyField(req, res, next) {
  const { id } = req.params;

  try {
    const fieldToModify = await Field.findOne({ where: { id: id } });
    for (let prop in req.body) {
      // recorro el body con tal que me modifique las propiedades mandadas por body
      fieldToModify[prop] = req.body[prop];
    }
    res.status(200).send(fieldToModify);
  } catch (error) {
    console.log("error en la moficacion del field");
    res.status(400).send({ msg: "Error while modifying the field" });
  }
}

module.exports = {
  modifyField,
};
