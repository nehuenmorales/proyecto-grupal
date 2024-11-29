const { Field } = require("../../../db.js");

async function modifyField(req, res, next) {
  const { id } = req.params;

  try {
    const updateField = await Field.update(
      {
        description: req.body.description,
        pricePerTurn: req.body.pricePerTurn,
        durationPerTurn: req.body.durationPerTurn,
        start: req.body.start,
        end: req.body.end
      },
      {
        where: { id: id },
      }
    )
    res.status(200).send(updateField);
  } catch (error) {
    res.status(400).send({ msg: "Error while modifying the field" });
  }
}

module.exports = {
  modifyField,
};
