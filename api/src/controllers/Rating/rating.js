const { Complex } = require ("../../db.js")

async function RatingReviews(req, res, next) {
    const{id,rating}=req.params
    try {
        const complex= await Complex.findOne({where:{id:id}})
        const rev=complex.reviews + 1;
        const promedio=(complex.prom+parseInt(rating))
        const rat=promedio/rev
        await complex.update({
            rating:rat,
            reviews:rev,
            prom:promedio,
        })
        res.send(complex)
    }catch(e) {
        console.log(e)
    }
}

module.exports = {
    RatingReviews,
}
