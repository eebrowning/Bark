const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Place, Review } = require('../../db/models');

//places will go api/places/:placeId or :placeId
const router = express.Router();


const validatePlace = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .isLength({ max: 30 })
        .withMessage('Please provide a Place Name between 3 and 30 characters.'),
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .isLength({ max: 250 })
        .withMessage('Please provide an Address between 5 and 250 characters.'),
    check('type')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a Place Type.'),
    // check('imageURL')
    //     .isURL()
    //     .withMessage('Please provide an image link (jpg/jpeg format only).'),
    handleValidationErrors
]


//GET places, main page
router.get('/', asyncHandler(async (req, res) => {//works
    const places = await Place.findAll();
    // console.log("\n\n", 'places', places, "\n\n done");
    return res.json(places);
}));
//GET place, place page.
router.get('/:placeId', asyncHandler(async (req, res) => {//works
    const { placeId } = req.params;

    // console.log(placeId, 'placeId trying to get single place');
    const place = await Place.findByPk(placeId);

    const reviews = await Review.findAll({
        where: { placeId: placeId }
    })//reviews always come with a single place, shouldn't need their own endpoint
    return res.json(place);
}));

//PUT place
router.put('/:placeId', validatePlace, asyncHandler(async (req, res) => {
    const { placeId } = req.params;
    const placeObj = await Place.findByPk(placeId);

    //  if (!req.body.imageURL.includes('jpg' || 'png')) req.body.imageURL = "https://designlooter.com/images/paw-prints-svg-8.png";

    console.log(req.body.imageURL, 'place obj in places PUT ROUTE')
    await placeObj.update(req.body);//sequelize!
    return res.json(placeObj);

}))

//POST places
router.post('/', validatePlace, asyncHandler(async (req, res) => {
    let { userId, name, address, type, imageURL } = req.body;
    if (!imageURL.includes('jpg' || 'png')) imageURL = "https://designlooter.com/images/paw-prints-svg-8.png";

    const place = await Place.create({ userId, name, address, type, imageURL });
    return res.json(place);
}));

//DELETE place
router.delete('/:placeId', asyncHandler(async (req, res) => {
    const { placeId } = req.params;

    const result = await Place.destroy({ where: { id: placeId } });
    return res.json(placeId);
}))

// /:placeId(\\w+)
module.exports = router;
