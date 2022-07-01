import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { thunkGetAllPlaces } from "../../store/place";

const Places = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllPlaces());
        console.log("sent dispatch to thunkGetAllPlaces")
    }, [dispatch])
    const placesArr = useSelector((state) => Object.values(state.placesState));
    // console.log(placesArr, 'places array????')

    const handleClick = ((e) => {
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
                        <p>Do you recommend this place?</p>
                    </span>
                ))}
            </ul>
        </div>
    )
}

export default Places;
