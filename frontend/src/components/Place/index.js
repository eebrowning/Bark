// import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { thunkDeletePlace, thunkGetAllPlaces } from "../../store/place";
import { thunkGetPlace } from "../../store/place";
import { thunkGetAllReviews } from "../../store/review";
import PlaceReviews from "../PlaceReviews";

const Place = () => {
    let history = useHistory();
    let { placeId } = useParams();
    const dispatch = useDispatch();

    const sessionState = useSelector((state) => state.session);
    const loggedInUserId = sessionState.user.id;

    const place = useSelector((state) => state.placesState[placeId]);

    useEffect(() => {
        dispatch(thunkGetPlace(placeId));
        dispatch(thunkGetAllReviews());
        // console.log('dispatched to thunkGetPlace')
    }, [dispatch]);

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(thunkDeletePlace(placeId));

        history.push('/places')
    }

    const handleEdit = (e) => {
        e.preventDefault();

        history.push(`/places/${placeId}/edit`);
        // dispatch(thunkUpdatePlace(place)); NO! dispatch will go on submit of edit form!
    }
    if (!place) return null;
    return (
        <div>
            <h2>This Place</h2>
            {place && (

                <span id={`place-box-${place.id}`}>
                    <img height={'100px'} width={'100px'} src={place.imageURL} alt="alt"></img>
                    <h2 id={`place-${place.id}`}>{place.name}</h2>
                    <h6>{place.avgRating}</h6>
                    <h3>{place.address}</h3>
                    <p>Do you recommend this place?</p>
                    <p>Something about this place</p>
                    {loggedInUserId === place.userId && (
                        <>
                            <button id='edit-place' onClick={handleEdit}>Edit</button>
                            <button id='delete-place' onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </span>
            )}
            {<PlaceReviews />}
        </div >
    )
}

export default Place;
