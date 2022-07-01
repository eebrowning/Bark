import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkGetPlace } from "../../store/place"
import { thunkCreateReview, thunkDeleteReview, thunkGetAllReviews } from '../../store/review'


const PlaceReviews = () => {
    const { placeId } = useParams();
    // console.log(placeId, 'placeId in PlaceReviews')
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionState = useSelector((state) => state.session);
    // const loggedInUserId = sessionState.user.id;


    const reviewsArray = useSelector(state => Object.values(state.reviewsState))
    // console.log(reviewsArray, "reviews state array, PlaceReviews");

    useEffect(() => {
        dispatch(thunkGetPlace(placeId));

        console.log('dispatched to thunkGetPlace')

    }, [dispatch]);


    const handleClick = (e) => {
        e.preventDefault();

        history.push(`/places/${placeId}/review`);
        // dispatch(thunkUpdatePlace(place)); NO! dispatch will go on submit of edit form!
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        let reviewId = e.target.id.split('-')[1]
        reviewId = parseInt(reviewId)
        console.log(reviewId, 'should be review Id')
        await dispatch(thunkDeleteReview(reviewId));///need to get reviewId
        // dispatch(thunkGetAllReviews());//is this dynamically adding? NO.

        history.push(`/places/${placeId}`)
        return;
    }

    return (
        <span id="reviews-span">
            <h1>Reviews:</h1>
            {reviewsArray?.map((review) => {
                if (sessionState.user && review.placeId == placeId) {
                    return (
                        <span key={review.id}>
                            <span id={`place-box-${review.id}`} >
                                <h2 id={`place-${review.id}`} >{review.title}</h2>
                                <div id={`rating-${review.id}`}>{review.rating} Star</div>
                            </span>
                            {sessionState.user.id === review.userId && (
                                <>
                                    {/* <button id='edit-place' onClick={handleEdit}>Edit</button> */}
                                    <button id={`delete-${review.id}`} onClick={handleDelete}>Delete</button>
                                </>
                            )}

                        </span>

                    )
                } else {
                    return (
                        <span key={review.id}>
                            <span id={`place-box-${review.id}`} >
                                <h2 id={`place-${review.id}`} >{review.title}</h2>
                                <div id={`rating-${review.id}`}>Rating: {review.rating}</div>
                                <p> {review.body}</p>
                            </span>

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
