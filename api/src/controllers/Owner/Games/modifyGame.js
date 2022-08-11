const { Games } = require("../../../db.js");

async function modifyGame (req, res){
    const {id} = req.params;
    try {
        var find = await Games.findByPk(id) 
        if(find.status === 'free'){
            await Games.update({status: 'booked'}, {where: {id: id}})
        } else {
            await Games.update({status: 'free'}, {where: {id: id}})
        }
        res.json({msg: 'actualizado correctamente'})
    } catch (error) {
        res.json({msg: 'no se pudo actualizar', error}) 
    }
}

module.exports = {
    modifyGame,
  };