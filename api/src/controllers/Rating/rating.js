const { Complex } = require ("../../db.js")

async function RatingReviews(req, res, next) {
    const{id,rating}=req.params
    console.log(rating,"SOY EL RATING")
    try {
        const complex= await Complex.findOne({where:{id:id}})
        const rev=complex.reviews + 1;
        const rat=(complex.rating+rating)/rev
            await complex.update({
            rating:rat,
            reviews:rev
         })
        console.log(complex,"complex")
        console.log(complex.rating,"rating")
        console.log(complex.reviews)
        res.send(complex)
    }catch(e) {
        console.log(e)
    }
}

module.exports = {
    RatingReviews,
}
