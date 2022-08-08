const { Complex } = require ("../../db.js")

async function RatingReviews(req, res, next) {
    const{id,rating}=req.params
    console.log(rating)
    try {
        const complex= await Complex.findOne({where:{id:id}})
            const rat=complex.rating;
            const rev=complex.reviews + 1;
            await complex.update({
            rating:(rat+rating)/rev,
            reviews:rev
         })
        res.send(complex)
    }catch(e) {
        console.log(e)
    }
}

module.exports = {
    RatingReviews,
}
