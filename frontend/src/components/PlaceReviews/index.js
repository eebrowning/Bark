import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkGetPlace } from "../../store/place"
import { thunkCreateReview, thunkGetAllReviews } from '../../store/review'


const PlaceReviews = () => {
    const { placeId } = useParams();
    // console.log(placeId, 'placeId in PlaceReviews')
    const history = useHistory();
    const dispatch = useDispatch();

    const reviewsArray = useSelector(state => Object.values(state.reviewsState))
    // console.log(reviewsArray, "reviews state array, PlaceReviews");

    useEffect(() => {
        dispatch(thunkGetPlace(placeId));
        dispatch(thunkGetAllReviews());
        // console.log('dispatched to thunkGetPlace')
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();

        history.push(`/places/${placeId}/review`);
        // dispatch(thunkUpdatePlace(place)); NO! dispatch will go on submit of edit form!
    }

    return (
        <span id="reviews-span">
            <h1>Reviews:</h1>
            {reviewsArray?.map((review) => {
                if (review.placeId == placeId) {
                    return (
                        <span key={review.id} id={`place-box-${review.id}`} >
                            <img height={'100px'} width={'100px'} src={review.imageURL} alt="alt"></img>
                            <h2 id={`place-${review.id}`} onClick={handleClick}>{review.title}</h2>
                        </span>
                    )
                }
            })}
            <p>Do you recommend this place?</p>
            <button onClick={handleClick}>Add a Review!</button>
        </span>
    )
}

export default PlaceReviews;
