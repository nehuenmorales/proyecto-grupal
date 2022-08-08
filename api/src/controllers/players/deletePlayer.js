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

        return res.json({succes: `Player deleted successfully`}).status(200);
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error deleting the alert"))
    }

};

module.exports = {
    deletePlayer
}