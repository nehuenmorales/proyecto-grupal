const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');
const { mercadopago } = require('../../utils/mercadoPago')


async function detailGame (req, res, next){
    const {id} = req.params
    try{
    const detail= await conn.query(`(SELECT g.*, f.name,f.image, f."pricePerTurn", x.adress, x.name AS complexName, x.city, f.capacity, f.start AS open, f.end AS close
        FROM "games" g
        JOIN fields f ON g."fieldId" = f.id
        JOIN complexes x ON x.id=f."complexId"
        WHERE g.id = :id)`,
                {
                    replacements: { id: id},
                    type: QueryTypes.SELECT
                }
                )
                res.send(detail)
    }catch(e){
        console.log(e)
    }
}

const pagarProducto = async (req, res, next) => {
    const gameId = req.params.id
    const datos  = req.body.items
    const booking = await conn.query(`SELECT * 
    FROM games g 
    JOIN fields f ON g."fieldId" = f.id
    WHERE g.id = :id`,
    {
        replacements: { id: gameId},
        type: QueryTypes.SELECT
    })

    let preference = {
        transaction_amount: parseInt(booking.pricePerTurn*1.15),
        payer: {
            name: datos.nombre,
            surname: datos.apellido,
            email: datos.email,
            phone:{
                number: parseInt(datos.telefono),
                area_code:"549",
            },
            address: {
                zip_code:datos.postal,
                street_name: datos.barrio,
                street_number: parseInt(datos.street_number)
            },
            identification: {
                type: datos.tipo,
                number: datos.dni
            }
        },
        items: [
            {
                id: booking.id,
                name: booking.name,
                date: booking.date,
                sport: booking.sport
            }
        ],
        back_urls: {
            "success": 'http://localhost:3000/feedback/${}',
            "failure": 'http://localhost:3000/feedback/${}',
            "pending": 'http://localhost:3000/feedback/${}',
        },
        auto_return: "approved",
    };

    mercadopago.preferences.create(preference)
    .then(function (response) {
        console.log(response) 
        res.json({
            global: response.body.id,
        })
    })
    .catch(function (err) {
        console.log(err)
    })
}


module.exports = {detailGame, pagarProducto}