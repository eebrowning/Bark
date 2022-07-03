import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { thunkGetAllPlaces, thunkUpdatePlace } from "../../store/place";
import { thunkGetAllReviews } from "../../store/review";
import "./index.css"

const Places = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(thunkGetAllPlaces());
        dispatch(thunkGetAllReviews());
        console.log("sent dispatch to thunkGetAllPlaces")
    }, [dispatch])

    // useEffect(() => {
    //     console.log("sent dispatch to thunkGetAllPlaces")
    // }, [])
    const placesArr = useSelector((state) => Object.values(state.placesState));
    console.log(placesArr, 'places array????')
    const reviewsArr = useSelector((state) => Object.values(state.reviewsState));
    //iterate through placesArr and PUT the average rating for each.




    //query for reviews with placeId
    console.log(reviewsArr, 'reviews ARRAY')
    // reviewsArr.reduce((acc, sum)=>{}); /length
    //selector for reviews


    // for (let placeId in placesArr) {
    //     console.log(placesArr[placeId])
    //     placesArr[placeId].avgRating = 1;
    //     dispatch(thunkUpdatePlace(placesArr[placeId]));
    // }

    const handleClick = ((e) => {
        e.preventDefault();
        const placeId = e.target.id.split('-')[2]

        history.push(`/places/${placeId}`)
    })

    return (
        <div id={'places-view'}>
            <span id='banner-box'>
                <img id='banner-image' src='http://www.newsilike.in/wp-content/uploads/2016/10/Dog-Parks-India.jpg' />
                <div id='over-banner-image'>
                    <h2>Bark has all the fun places for you and your pup!</h2>
                    <h3>Scroll down to explore</h3>
                </div>
            </span>
            <div id='sub-banner-text'><h2>Places for your Pup</h2></div>
            {!placesArr.length && <span>No places available right now.</span>}
            <ul className="place-list" >
                {placesArr?.map((place) => (
                    <span key={place.id} id={`place-box-${place.id}`} className={'place-card'} onClick={handleClick}>
                        <img height={'100px'} width={'100px'} src={place.imageURL} alt="alt" id={`place-img-${place.id}`}></img>
                        <div id={`place-div-${place.id}`}>
                            <h2 id={`place-h2-${place.id}`} onClick={handleClick}>{place.name}</h2>
                            {/* <h6 id={`avgrating-${place.id}`}>{place.avgRating}</h6> */}
                            <p id={`place-p-${place.id}`}>{place.type}</p>
                        </div>
                    </span>
                ))}
            </ul>
        </div>
    )
}

export default Places;
