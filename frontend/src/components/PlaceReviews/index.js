import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkGetPlace } from "../../store/place"
import { thunkDeleteReview, thunkGetAllReviews } from '../../store/review'

import './reviews.css'

const PlaceReviews = () => {
    const { placeId } = useParams();
    // console.log(placeId, 'placeId in PlaceReviews')
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionState = useSelector((state) => state.session);


    const user = useSelector(state => state.session);
    // console.log(user, 'this is the user from useSeletor')
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

    const [usersArr, setUsersArr] = useState([]);
    // console.log('>>>>>>>>>>>>>> usersArr', usersArr)
    const matchUser = (userArr, id) => {//swap user_id for username
        // console.log('>>>>>>>>>>>>>> passed id: ', id)
        // console.log('>>>>>>>>>>>>>> usersArr', usersArr)

        // console.log('>>>>>>>>>>>>>> userName: ', userArr?.find(user => user.id === id)?.username)
        return userArr?.find(user => user.id === id)?.username
    }
    let userReview;
    reviewsArray.forEach(review => {
        if (user && review.user_id == user.id) {
            userReview = review
        }
    })

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsersArr([...Object.values(responseData)]);
        }
        fetchData();
        // console.log(usersArr, 'usersArr')
        dispatch(thunkGetAllReviews())
    }, [dispatch])


    return (

        <span id="reviews-span">
            {sessionState.user && (
                <button id='add-a-review' onClick={handleClick}>Add a Review!</button>
            )}
            <div id={'reviews-header-box'}>
                <h1 id={'reviews-header'}>Reviews</h1>
            </div>
            {reviewsArray?.map((review) => {
                if (sessionState.user && review.placeId == placeId) {
                    return (
                        <span id='review-card' key={review.id}>
                            <span id={`place-box-${review.id}`} >
                                <img className="user-img" src='https://www.nicepng.com/png/full/128-1280406_user-icon-png.png' />
                                <h2 className='user-name'>{matchUser(usersArr, review.userId)}</h2>

                                <h3 id={`place-${review.id}`} >{review.title}</h3>
                                <div id='double-star-box'>
                                    <div className="blank-star-box" id={`rating-${review.id}`}>  {[...Array(5)].map(star => (<div className="blank-star">☆</div>))}</div>
                                    <div className="review-star-box" id={`rating-${review.id}`}>  {[...Array(+review.rating)].map(star => (<div className="review-star">☆</div>))}</div>

                                </div>
                                <p>{review.body}</p>

                            </span>
                            {sessionState.user.id === review.userId && (
                                <>
                                    {/* <button id='edit-place' onClick={handleEdit}>Edit</button> */}
                                    <button id={`delete-${review.id}`} onClick={handleDelete}>Delete</button>
                                </>
                            )}

                        </span>

                    )
                } else if (review.placeId == placeId) {
                    return (
                        <span id='review-card' key={review.id}>
                            <span id={`place-box-${review.id}`} >
                                <img className="user-img" src='https://www.nicepng.com/png/full/128-1280406_user-icon-png.png' />
                                <h2 className='user-name'>{matchUser(usersArr, review.userId)}</h2>

                                <h3 id={`place-${review.id}`} >{review.title}</h3>
                                <div id='double-star-box'>
                                    <div className="blank-star-box" id={`rating-${review.id}`}>  {[...Array(5)].map(star => (<div className="blank-star">☆</div>))}</div>
                                    <div className="review-star-box" id={`rating-${review.id}`}>  {[...Array(+review.rating)].map(star => (<div className="review-star">☆</div>))}</div>

                                </div>
                                <p>{review.body}</p>

                            </span>

                        </span>

                    )
                }
            })}

        </span>
    )
}

export default PlaceReviews;
