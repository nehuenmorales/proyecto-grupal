const { Games,Field } = require("../../../db.js");

async function createGame (req, res){
    const {
        date, sport, type, status, result, link, start, end, fieldId
      } = req.body;
      try {
        const newGame = await Games.create({
            date, sport, type, status, result, link, start, end  
        });
        
      await newGame.update({
        fieldId:fieldId
      })
      // newGame.addField(fieldGame); 
        res.status(200).json(newGame);
      } catch (e) {
        console.log("fallo la creacion del partido", e);
        res.status(400).json({ msg: "fallo la creacion del partido" });
      }
}

module.exports = {
    createGame,
  };