import { useEffect, useState } from "react"
import { thunkCreatePlace } from "../../store/place";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { thunkCreateReview, thunkDeleteReview } from "../../store/review";
import { thunkGetPlace } from "../../store/place";

const CreateReviewForm = () => {
    let { placeId } = useParams();
    // console.log(parseInt(placeId), placeId, 'placeId in PlaceReviews')
    placeId = parseInt(placeId);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    // const [imageURL, setImageURL] = useState('')
    const [rating, setRating] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(thunkGetPlace(placeId));
        // console.log('dispatched to thunkGetPlace')
    }, [dispatch]);





    const user = useSelector(state => {
        return state.session.user;
    })
    const userId = user?.id;
    // const place = useSelector(state => state.placesState[placeId]);
    let reviews = useSelector(state => Object.values(state.reviewsState));
    // const thisPlaceReviews = reviews.find(review => review.placeId === placeId);

    // console.log(reviews, "this Place's reviews");

    let formErrors;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 'Rating') {
            const review = { title, body, placeId: placeId, userId: userId, rating }; //imageURL removed, maybe adding to reviews later
            dispatch(thunkCreateReview(review))
            history.push(`/places/${placeId}`)
        } else {
            formErrors = (
                <>
                    <div>Rating required!</div>
                </>
            )
        }
    }
    return (
        <span id="reviews-span">
            <h1>How'd it go with the doggo?</h1>
            {formErrors && (formErrors)}
            <form id="review-form" onSubmit={handleSubmit}>
                <input
                    required
                    name="name"
                    placeholder="place name"
                    type="string"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                    required
                    name='review body'
                    placeholder="review here"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
                {/* <label>Optional Image</label>
                <input
                    name='Image'
                    placeholder="link .jpg/.jpeg/.png here"
                    value={imageURL}
                    onChange={e => setImageURL(e.target.value)}
                /> */}
                <label>Rating</label>
                <select
                    required
                    name='rating'
                    placeholder="Rating"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                >
                    <label>Rating</label>
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>

                </select>

                <button>Submit Review</button>
            </form>
        </span>
    )
}

export default CreateReviewForm;
