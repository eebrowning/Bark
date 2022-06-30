const express = require('express')
const asyncHandler = require('express-async-handler');

const { Place } = require('../../db/models');

//places will go api/places/:placeId or :placeId
const router = express.Router();

//GET places, main page
router.get('/', asyncHandler(async (req, res) => {//works
    const places = await Place.findAll();
    // console.log("\n\n", 'places', places, "\n\n done");
    return res.json(places);
}));
//GET place, place page.
router.get('/:placeId', asyncHandler(async (req, res) => {//works
    const { placeId } = req.params;

    console.log(placeId, 'placeId trying to get single place');
    const place = await Place.findByPk(placeId);

    return res.json(place);
}));

//PUT place
router.put('/:placeId', asyncHandler(async (req, res) => {
    const { placeId } = req.params;
    const placeObj = await Place.findByPk(placeId);

    await placeObj.update(req.body);//sequelize!

    return res.json(placeObj);

}))



//POST places
router.post('/', asyncHandler(async (req, res) => {
    let { userId, name, address, type, imageURL } = req.body;
    // const { userId } = req.session.auth;
    console.log('\n\n\n', 'in POSTS route', '\n\n\n')
    if (imageURL === '') imageURL = "https://designlooter.com/images/paw-prints-svg-8.png";

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
