const { Op } = require("sequelize");
const { Field , Complex} = require("../../../db");


async function getSearchField(req, res, next) {
  let sport=req.params.sport
  let name = req.query.name
  let city=req.query.city

    try {
      let fields = await Complex.findAll({
        where:{
          '$fields.sport$':{
                [Op.eq]: sport,
                },
            [Op.or]:[
                {adress:{
                    [Op.iLike]: `%${name}%`,
                  }},
                {'$fields.name$':{
                    [Op.iLike]: `%${name}%`,
                }}
        ]},
        include: [ {
            model: Field,   
        } ],
        order:[["rating","ASC"]]
    });
    res.send(fields);
      } catch (error) {
        res.status(400).send("la cancha no existe");
      }
  
  
}


module.exports = {
  getSearchField,
};