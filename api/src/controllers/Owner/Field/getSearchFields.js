const { Op, QueryTypes } = require("sequelize");
const { Field , Complex, conn} = require("../../../db");


async function getSearchField(req, res, next) {
  let sport=req.params.sport
  let name = req.query.name
  let city=req.query.city

    try {
      let fields =await conn.query(`(SELECT f.*,x.adress,x.name AS "complexName"
      FROM fields f
      JOIN complexes x ON f."complexId"=x.id
      WHERE f.sport= :sport AND( x.adress LIKE :name OR f.name LIKE :name) )`,{
        replacements: { sport: sport,
          name:`%${name}%`
          },
        type: QueryTypes.SELECT
    })
      
      
      
    //   await Complex.findAll({
    //     where:{
    //       '$fields.sport$':{
    //             [Op.eq]: sport,
    //             },
    //         [Op.or]:[
    //             {adress:{
    //                 [Op.iLike]: `%${name}%`,
    //               }},
    //             {'$fields.name$':{
    //                 [Op.iLike]: `%${name}%`,
    //             }}
    //     ]},
    //     include: [ {
    //         model: Field,   
    //     } ],
    //     order:[["rating","ASC"]]
    // });
    res.send(fields);
      } catch (error) {
        console.log(error)
        res.status(400).send("la cancha no existe");
      }
  
  
}


module.exports = {
  getSearchField,
};