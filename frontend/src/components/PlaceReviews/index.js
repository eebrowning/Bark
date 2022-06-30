import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { thunkGetPlace } from "../../store/place"
import { thunkCreateReview, thunkGetAllReviews } from '../../store/review'


const PlaceReviews = () => {
    const { placeId } = useParams();
    console.log(placeId, 'placeId in PlaceReviews')
    const history = useHistory();
    const dispatch = useDispatch();

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
            <h1>put yon reviews here</h1>

            <button onClick={handleClick}>Add a Review!</button>
        </span>
    )
}

export default PlaceReviews;
