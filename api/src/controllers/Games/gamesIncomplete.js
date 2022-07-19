
const { Games, Field, Player } = require("../../db.js");

async function gamesIncomplete(req,res,next){
    try{
        const gamesInc= await Games.findAll({
            where: {
                status:"booked"
            },
            include: [Player],
        })

        const fields= await Field.findOne({
            where:{
                id:gamesInc.fieldId //map gamesInc
            }
        })

        // const player= await Sequelize.query(SELECT count_player_by_game.*, enrolled_amount - f.capacity, f.*
        //     FROM (
        //         SELECT g.id, g.field_id, count(*) AS enrolled_amount
        //         FROM games g
        //         JOIN player_by_game pbg ON pbg.games_id = g.id
        //         GROUP BY g.id
        //     ) count_player_by_game
        //     JOIN field f ON count_player_by_game.field_id = f.id
        //     WHERE enrolled_amount < f.capacity)


        // let playersGame=0
        // for(let i=0; i<gamesInc.players.length;i++){
        //     playersGame++
        // }
        // gamesInc.filter(g => fields.capacity!==playersGame)
        res.status(200).send(gamesInc)
    }catch(e){
        res.status(400).json({ msg: "Error" });
    }
    
}



module.exports = {
    gamesIncomplete,
  };