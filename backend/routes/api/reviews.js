//maybe incorportate this into place?

const express = require('express')
const asyncHandler = require('express-async-handler');

const { Review } = require('../../db/models');
const router = express.Router();

//GET reviews
router.get('/', asyncHandler(async (req, res) => {
    // let { placeId } = req.params;
    // console.log(req.params, "in GET reviews")
    const reviews = await Review.findAll(
        // {
        //     where: {
        //         placeId: placeId
        //     }
        // }
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
    let { userId, placeId, title, body, rating, imageURL } = req.body;

    // console.log('\n\n\n', 'in POST review route', '\n\n\n')

    const review = await Review.create({ userId, placeId, title, body, rating, imageURL });

    return res.json(review);
}));

//DELETE review
router.delete('/:reviewId', asyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const result = await Review.destroy({ where: { id: reviewId } });
    return res.json(reviewId);
}))

// /:reviewId(\\w+)
module.exports = router;
