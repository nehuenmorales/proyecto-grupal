const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');
const{Player}=require("../../db.js")

async function gamesIncomplete(req,res,next){
    try{
        const player= await conn.query(`(SELECT count_player_by_game.*, f.capacity - enrolled_amount AS freePlace, f.*
            FROM (
                SELECT g.id as gameid,g.start AS startHour,g.end AS endHour,g."fieldId" ,count(*) AS enrolled_amount
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
        const detail= await conn.query(`(SELECT p.username, g.*, x.name,x.adress, f.name, f.capacity, f."pricePerTurn"
            FROM players p
            JOIN player_games pg ON pg."playerId" = p.id
            JOIN games g ON pg."gameId" = g.id
            JOIN fields f ON g."fieldId" = f.id
            JOIN complexes x ON f."complexId" = x.id
            WHERE pg."gameId" = :id)`,
            {
                replacements: { id: id},
                type: QueryTypes.SELECT
            })
        detail.players=detail?.map(g=>g.username).join(",")
        return res.send(detail)
        
    } catch (error) {
      res.send(error)
    }
}

// async function updateGame(req,res){
//     try{
//        const {id}= req.params
//         const{email}=req.body
//         const player= Player.findOne({ where: { email: email } })
//         const update= await conn.query(`(INSERT INTO player_games ("playerId","gameId")
//             VALUES (:pId,:gId))`,{
//             replacements: { pId:player.id, gId:id},
//             type: QueryTypes.SELECT
//         })
//         res.send(update) 
//     }catch(e){
//         console.log(e)
//     }
   
// }

module.exports = {
    gamesIncomplete,
    detailGameIncomplete
  };

