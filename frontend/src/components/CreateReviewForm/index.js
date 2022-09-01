import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { thunkCreateReview } from "../../store/review";
import { thunkGetPlace } from "../../store/place";
import "./createReview.css"

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
    const place = useSelector(state => state.placesState[placeId]);
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
    if (place) return (
        <span id="reviews-span">
            <form id="review-form" onSubmit={handleSubmit}>
                <h1>How'd it go with the doggo at {place.name}?</h1>
                <ul>
                    {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Rating</label>
                {/* <select
                    required
                    name='rating'
                    placeholder="Rating"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                >
                    <option hidden disabled='disabled'></option>
                    <option >1</option>
                    <option >2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>

                </select> */}

                <div id="review-rating">
                    <input type="radio" name="rating" value={5} id="5" onClick={e => setRating(e.target.value)} /><label for="5">☆</label>
                    <input type="radio" name="rating" value={4} id="4" onClick={e => setRating(e.target.value)} /><label for="4">☆</label>
                    <input type="radio" name="rating" value={3} id="3" onClick={e => setRating(e.target.value)} /><label for="3">☆</label>
                    <input type="radio" name="rating" value={2} id="2" onClick={e => setRating(e.target.value)} /><label for="2">☆</label>
                    <input type="radio" name="rating" value={1} id="1" onClick={e => setRating(e.target.value)} /><label for="1">☆</label>
                </div>
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

                <button id={'submit-review'}>Submit Review</button>
            </form>
        </span>
    )
}

export default CreateReviewForm;
