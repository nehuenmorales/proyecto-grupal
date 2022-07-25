const{Complex}=require("../../db.js")
const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');

async function getComplex(req,res,next){
    try{
        const allComplex = await Complex.findAll()
        res.status(200).send(allComplex)
    }catch(e){
        res.status(400).json({ msg: "Error" });
    }
}

async function getComplexByOwner(req,res,next){
    const { email } = req.body
    try{
        const complex = await conn.query(`(SELECT x.*
            FROM "complexes" x
            JOIN owners o ON x."ownerUsername" = o.username
            WHERE o.email = :email)`,
            {
                replacements: { email: email},
                type: QueryTypes.SELECT
            })
        res.status(200).send(complex)
    }catch(e){
        res.status(400).json({ msg: "Error" });
    }  
}


module.exports = {
    getComplex,
  };
  