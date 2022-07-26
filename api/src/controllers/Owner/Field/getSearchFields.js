const { Field } = require("../../db.js");


async function getSearchField(req, res, next) {
  let name = req.query.name
    try {
        let fields = await Field.findAll({
          where: {
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


module.exports = {
  getSearchField,
};