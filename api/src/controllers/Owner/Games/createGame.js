const { Games,Field } = require("../../../db.js");

async function createGame (req, res){
    const {
        date, sport, type, status, result, link, start, end, fieldId, privacy, requirements
      } = req.body;
      try {
        const newGame = await Games.create({
            date, sport, type, status, result, link, start, end, fieldId, privacy, requirements
        });
        
      //   await newGame.update(
      //     {
      //         fieldId: fieldId,
      //     }
      // )
        res.status(200).json(newGame);
      } catch (e) {
        res.status(400).json({ msg: "fallo la creacion del partido" });
      }
}

module.exports = {
    createGame,
  };