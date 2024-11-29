
const { Player } = require("../../db");

async function bannearPlayer(req, res, next) {
    const {id} = req.params
    const {status} = req.body
    try {
      let player = await Player.update({
            status: status
          },
          { 
        where:{ id: id },
         }
    );

    res.send(player);
      } catch (error) {
        res.status(400).send("no se encontro el email", error);
      }

}
module.exports = {
  bannearPlayer,
};