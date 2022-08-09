const { Complex } = require ("../../db.js")

async function RatingReviews(req, res, next) {
    const{id,rating}=req.params
    console.log(rating)
    try {
        const complex= await Complex.findOne({where:{id:id}})
            const rat=complex.rating;
            const rev=complex.reviews + 1;
            await complex.update({
            rating:(rat+rating)%rev<1?1:(rat+rating)%rev>5?5:(rat+rating)%rev,
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
