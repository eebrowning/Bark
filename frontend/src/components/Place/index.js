// import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { thunkDeletePlace, thunkGetAllPlaces } from "../../store/place";
import { thunkGetPlace } from "../../store/place";
import { thunkGetAllReviews } from "../../store/review";
import PlaceReviews from "../PlaceReviews";
import './place.css';

const Place = () => {
    let history = useHistory();
    let { placeId } = useParams();
    const dispatch = useDispatch();

    const sessionState = useSelector((state) => state.session);

    // console.log(sessionState, 'this is the state of the session, shoudl have user')

    const place = useSelector((state) => state.placesState[placeId]);

    useEffect(() => {
        dispatch(thunkGetPlace(placeId));// keeps place on refresh
        dispatch(thunkGetAllReviews());//gets reviews on place load
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
        <div id={'place-view'}>
            {place && (
                <div id={`place-box`}>
                    <span >
                        <img id={'place-image'} height={'100px'} width={'100px'} src={place.imageURL} alt="alt"></img>
                        <span id={'place-details'}>
                            <div idi={'place-name'} className={`name-${place.id}`}>
                                <h2 >{place.name}</h2>
                            </div>
                            <div id={`place-address`}>
                                <h2 >{place.address}</h2>
                            </div>
                            <div id={`place-type`}>
                                <h2 >{place.type}</h2>
                            </div>
                        </span>

                        {(sessionState.user && sessionState.user.id === place.userId) && (
                            <>
                                <button id='edit-place' onClick={handleEdit}>Edit</button>
                                <button id='delete-place' onClick={handleDelete}>Delete</button>
                            </>
                        )}
                        {/* <p>Something about this place</p> */}

                    </span>
                </div>
            )}

            {<PlaceReviews />}
        </div >
    )
}

export default Place;
