const{Complex}=require("../../db.js")
const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');

async function getNameComplex(req,res,next){
    try{
        const allComplex = await Complex.findAll()
        let filtrado = []
        for(let i = 0; i < allComplex.length; i++){
            filtrado.push(allComplex[i].name)
        }
        res.status(200).send(filtrado)
    }catch(e){
        res.status(400).json({ msg: "Error" });
    }
}


module.exports = {
    getNameComplex,
  };