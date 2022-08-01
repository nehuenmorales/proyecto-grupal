const { Op } = require("sequelize");
const { Complex} = require("../../db");

async function getSearchComplex(req, res, next) {
    let sport=req.params.sport
    let name = req.query.name
    console.log(sport,name)

    try {
        let fields = await Complex.findAll({
            where:{
                sports: { [Op.contains]: [sport] },
                [Op.or]:[
                    {city:{
                        [Op.iLike]: `%${name}%`,
                      }},
                    {name:{
                        [Op.iLike]: `%${name}%`,
                    }}
            ]},
        });
        res.send(fields);
      } catch (error) {
        res.status(400).send("la cancha no existe");
      }

    }

    module.exports = {
        getSearchComplex,

      };