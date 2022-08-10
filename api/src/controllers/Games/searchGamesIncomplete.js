const { QueryTypes } = require("sequelize");
const { conn } = require("../../db");

async function searchGamesIncomplete(req,res,next){
    const sport=req.params.sport
    const name = req.query.name

    try{
        const player= await conn.query(`(SELECT count_player_by_game.*, f.capacity - enrolled_amount AS freePlace, f.*,x.city,x.name AS complexname
            FROM (
                SELECT g.id as gameid,g.sport,g.start AS startHour,g.end AS endHour,g."fieldId" ,count(*) AS enrolled_amount
                FROM games g
                JOIN player_games pbg ON pbg."gameId" = g.id
                GROUP BY g.id
            ) count_player_by_game
            JOIN fields f ON count_player_by_game."fieldId" = f.id
            JOIN complexes x ON f."complexId"=x.id
            WHERE enrolled_amount < f.capacity AND count_player_by_game.sport = :sport AND (x.city LIKE :name OR f.name LIKE :name OR x.state LIKE :name OR x.address LIKE :name))`,{
                replacements: { sport: sport,
                  name:`%${name}%`,
                  city:`%${name}%`,
                  state:`%${name}%`,
                  address:`%${name}%`,
                  },
                type: QueryTypes.SELECT
            })

        res.status(200).send(player)
    }catch(e){
        res.status(400).json({ msg: "Error" });
    }  
}

  module.exports = {
        searchGamesIncomplete,
      };