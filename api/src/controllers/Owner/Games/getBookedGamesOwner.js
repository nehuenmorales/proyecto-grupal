const { Games, Complex, Field } = require("../../../db.js");

async function getBookedGamesByOwner (req, res){
    const {id} = req.params;
      try {
       const getComplex = await Complex.findAll({
          where:{ownerId : id},
          include : [{model:Field}]
        });
        console.log('soy getcomplex[0].fields[0].id', getComplex[0]?.fields[0].id)
        
        console.log('soy getcomplex[0].fields', getComplex[0]?.fields[0])
        let result = [];
        for (let i = 0; i < getComplex.length; i++) {
          for (let j = 0; j < getComplex[i].fields.length; j++) {
            result.push(getComplex[i].fields[j].id)
            console.log('result', result)
          }
        }

        const bookedGames = await Games.findAll({
          where:{fieldId : getComplex.fields.id}
        });

        res.status(200).json(bookedGames);
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "no hay reservas" });
      }
}

module.exports = {
    getBookedGamesByOwner,
};