const axios = require('axios')

async function getCities(req,res,next){
    try{
        const allCities = await axios.get('https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.5/download/localidades.json')
        const data = allCities.data.localidades
        let filtrado = []
        for(let i = 0; i < data.length; i++){
            filtrado.push(data[i].nombre)
        }
        res.status(200).send(filtrado)
    }catch(e){
        res.status(400).json({ msg: "Error" });
    }
}




module.exports = {
    getCities,
  };
  
