const { Games } = require("../../../db.js");

async function getBookedGames (req, res){
      try {
        const bookedGames = await Games.findAll({
          where:{status : 'booked'}
        });
        res.status(200).json(bookedGames);
      } catch (e) {
        res.status(400).json({ msg: "no hay reservas" });
      }
}

module.exports = {
    getBookedGames,
  };