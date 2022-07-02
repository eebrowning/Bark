import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { thunkGetAllPlaces, thunkUpdatePlace } from "../../store/place";
import { thunkGetAllReviews } from "../../store/review";


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
        const placeId = e.target.id.split('-')[1]

        history.push(`/places/${placeId}`)
    })

    return (
        <div id={'places-view'}>
            <h2>Places for your Pup</h2>
            {!placesArr.length && <span>No places available right now.</span>}
            <ul className="place-list" >
                {placesArr?.map((place) => (
                    <span key={place.id} id={`place-box-${place.id}`} className={'place-card'} >
                        <img height={'100px'} width={'100px'} src={place.imageURL} alt="alt"></img>
                        <h2 id={`place-${place.id}`} onClick={handleClick}>{place.name}</h2>
                        {/* <h6 id={`avgrating-${place.id}`}>{place.avgRating}</h6> */}
                        <p>Do you recommend this place?</p>
                    </span>
                ))}
            </ul>
        </div>
    )
}

export default Places;
