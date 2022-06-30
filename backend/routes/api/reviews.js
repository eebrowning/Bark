//maybe incorportate this into place?

const express = require('express')
const asyncHandler = require('express-async-handler');

const { Review } = require('../../db/models');
const router = express.Router();

//GET reviews
router.get('/', asyncHandler(async (req, res) => {
    let { placeId } = req.params;
    console.log(placeId, "in GET reviews")
    const reviews = await Review.findAll(
        //     {
        //         where: {
        //             placdId: placeId
        //         }
        //     }
    );
    return res.json(reviews);
}));



//PUT review
router.put('/:reviewId', asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const reviewObj = await Review.findByPk(reviewId);
    const reviewOg = reviewObj.dataValues;
    // console.log('\n\n', 'neerrd', reviewObj, '\n\n')
    const { review } = req.body;

    // console.log('\n', "edit:", reviewOg, "\n with:", review, '\n\n')
    reviewOg.address = review.address;
    reviewOg.imageURL = review.imageURL;
    reviewOg.type = review.type;
    reviewOg.updatedAt = new Date();
    // await reviewOg.save();
    // console.log(reviewOg, "this is the modified object");
    return res.json({ message: 'Success!' });

}))



//POST reviews
router.post('/', asyncHandler(async (req, res) => {
    let { userId, name, address, type, imageURL } = req.body;
    // const { userId } = req.session.auth;
    console.log('\n\n\n', 'in POSTS route', '\n\n\n')
    if (imageURL === '') imageURL = "https://designlooter.com/images/paw-prints-svg-8.png";

    const review = await Review.create({ userId, placeId, title, body, rating, imageURL });


    return res.json(review);
}));

//DELETE review
router.delete('/:placeId/:reviewId', asyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const result = await Review.destroy({ where: { id: reviewId } });
    return res.json();
}))

// /:reviewId(\\w+)
module.exports = router;
