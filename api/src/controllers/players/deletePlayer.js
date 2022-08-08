const { Player } = require("../../db.js");

async function deletePlayer (req, res, next) {
    let delId = req.params.id;   
    try
    {   
        await Player.destroy( {
            where: {
                id: delId,
            }
        });

       res.status(200).send(delId);
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error deleting the alert"))
    }

};

module.exports = {
    deletePlayer
}