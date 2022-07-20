const { conn } = require('../../db.js');
const { Games,Player } = require("../../db.js");

async function gamesIncomplete(req,res,next){
    try{
        const player= await conn.query(`(SELECT count_player_by_game.*, f.capacity - enrolled_amount AS freePlace, f.*
            FROM (
                SELECT g.id as gameid,g.start,g.end,g."fieldId" ,count(*) AS enrolled_amount
                FROM games g
                JOIN player_games pbg ON pbg."gameId" = g.id
                GROUP BY g.id
            ) count_player_by_game
            JOIN fields f ON count_player_by_game."fieldId" = f.id
            WHERE enrolled_amount < f.capacity)`)

        res.status(200).send(player[0])
    }catch(e){
        res.status(400).json({ msg: "Error" });
    }  
}

async function detailGameIncomplete(req, res){
    const { id } = req.params;
  
    try {
      let game = await Games.findByPk(id, {
        include:Player
      });
      game=JSON.stringify(game)
      game=JSON.parse(game)
      game.players=game.players.map(g=>g.name)
      
      return res.send(game);
    } catch (error) {
      res.send(error)
    }
  }

module.exports = {
    gamesIncomplete,
    detailGameIncomplete
  };