const { QueryTypes } = require('sequelize');
const { conn } = require('../../db.js');
const { mercadopago } = require('../../utils/mercadoPago')
const { Games } = require ("../../db.js")   


async function detailGame (req, res, next){
    const {id} = req.params
    try{
    const detail= await conn.query(`(SELECT g.*, f.name,f.image, f."pricePerTurn", x.address, x.name AS complexName, x.city, f.capacity, f.start AS open, f.end AS close
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
    const datos  = req.body
    const booking = await conn.query(`SELECT g.*, f.*
    FROM games g 
    JOIN fields f ON g."fieldId" = f.id
    WHERE g.id = :id`,
    {
        replacements: { id: gameId},
        type: QueryTypes.SELECT
    })
    // let plata = booking.name

    const reservado = await Games.update({
        status: 'booked'
    },{
        where: {
            id: gameId
        }
    })

    

    let preference = {
        // transaction_amount: booking.pricePerTurn*1.15,
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
                // street_name: datos.barrio,
                // street_number: parseInt(datos.street_number)
            },
            identification: {
                type: datos.tipo,
                number: datos.dni
            }
        },
        items: [
            {
                id: booking[0].id,
                name: booking[0].name,
                date: booking[0].date,
                sport: booking[0].sport,
                quantity: 1,
                unit_price: datos.total,
            }

        ],
        back_urls: {
            "success": `https://falta-uno-henry.vercel.app/success/${gameId}`,
            "failure": `https://falta-uno-henry.vercel.app/success/${gameId}`,
            "pending": `https://falta-uno-henry.vercel.app/success/${gameId}`,
        },
        auto_return: "approved",
    };



    mercadopago.preferences.create(preference)
    .then(function (response) {
        res.json({
            global: response.body,
        })
    })
    .catch(function (err) {
        console.log(err)
    })
}


module.exports = {detailGame, pagarProducto}