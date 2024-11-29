const { Games, Complex, Field } = require("../../../db.js");

async function getBookedGamesByOwner (req, res){
    const {id} = req.params;
      try {
       const getComplex = await Complex.findAll({
          where:{ownerId : id},
          include : [{model:Field}]
        });
        
        let result = [];
        for (let i = 0; i < getComplex.length; i++) {
          for (let j = 0; j < getComplex[i].fields.length; j++) {
            result.push(getComplex[i].fields[j]?.id)
          }
        }
        let resultGames = [];
        let bookedGames

        for (let i = 0; i < result.length; i++) {
          bookedGames = await Games.findAll({
            where:{
              fieldId : result[i]
            }, 
            include : [{model:Field}]
          });
          resultGames.push(bookedGames)
        }
        

        res.status(200).json(resultGames);
      } catch (e) {
        res.status(400).json({ msg: "no hay reservas" });
      }
}

module.exports = {
    getBookedGamesByOwner,
};