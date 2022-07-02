import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { thunkCreateReview } from "../../store/review";
import { thunkGetPlace } from "../../store/place";

const CreateReviewForm = () => {
    let { placeId } = useParams();
    // console.log(parseInt(placeId), placeId, 'placeId in PlaceReviews')
    placeId = parseInt(placeId);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    // const [imageURL, setImageURL] = useState('')
    const [rating, setRating] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(thunkGetPlace(placeId));
        // console.log('dispatched to thunkGetPlace')
    }, [dispatch]);


    const allReviews = useSelector(state => Object.values(state.reviewsState))

    console.log(allReviews, ' in CreateReviewForm')


    const user = useSelector(state => {
        return state.session.user;
    })
    const userId = user?.id;
    // const place = useSelector(state => state.placesState[placeId]);
    let reviews = useSelector(state => Object.values(state.reviewsState));
    // const thisPlaceReviews = reviews.find(review => review.placeId === placeId);

    // console.log(reviews, "this Place's reviews");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const review = { title, body, placeId: placeId, userId: userId, rating }; //imageURL removed, maybe adding to reviews later
        const createdReview = await dispatch(thunkCreateReview(review)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            // console.log(errors, 'errors in createPlaceForm');
        });
        if (createdReview) history.push(`/places/${placeId}`)
        return createdReview;

    }
    return (
        <span id="reviews-span">
            <h1>How'd it go with the doggo?</h1>
            <form id="review-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Title</label>
                <input
                    required
                    name="name"
                    placeholder="review title"
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
                    defaultValue="1"
                    onChange={e => setRating(e.target.value)}
                >
                    <option hidden disabled='disabled'></option>
                    <option selected>1</option>
                    <option >2</option>
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
