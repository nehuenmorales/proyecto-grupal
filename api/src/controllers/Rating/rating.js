const { Complex } = require ("../../db.js")

async function RatingReviews(req, res, next) {
    const{id,rating}=req.params
    console.log(rating,"SOY EL RATING")
    try {
        const complex= await Complex.findOne({where:{id:id}})
            const rat=complex.rating;
            const rev=complex.reviews + 1;
            await complex.update({
            rating:((rat+rating)/rev),
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
