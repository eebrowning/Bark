import { useEffect, useState } from "react"
import { thunkGetAllPlaces, thunkGetPlace, thunkUpdatePlace } from "../../store/place";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';


const EditPlaceForm = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [type, setType] = useState('')
    const [imageURL, setImageURL] = useState("");
    const [errors, setErrors] = useState('')
    const { placeId } = useParams();


    const place = useSelector((state) => state.placesState[placeId]);
    const user = useSelector(state => {
        return state.session.user;
    })
    const userId = user?.id;


    useEffect(() => {
        dispatch(thunkGetPlace(placeId));

        // console.log('dispatched to thunkGetPlace')
    }, [dispatch]);

    // console.log(user, 'user in createplaceform')
    // console.log(userId, 'USER ID for newPlace')
    const handleSubmit = async (e) => {
        e.preventDefault();


        // console.log(place, '\n\n\n', 'PRE EDIT PLACE FORM', '\n\n')
        place.address = address;
        place.imageURL = imageURL;
        place.type = type;
        console.log(place, '\n\n\n', 'EDIT PLACE FORM', '\n\n')
        let updatedPlace = await dispatch(thunkUpdatePlace(place));
        console.log(updatedPlace.id, 'updatedPlace id')
        if (updatedPlace && user) {
            history.push(`/places/${updatedPlace.id}`);
            return updatedPlace;
            // .catch(async (res) => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // });
        }
    }


    return (
        <section id="place-form-section">
            <form id="place-form" onSubmit={handleSubmit}>

                <input
                    required
                    name='address'
                    placeholder="place address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <input
                    name='Image'
                    placeholder="link .jpg/.jpeg/.png here"
                    value={imageURL}
                    onChange={e => setImageURL(e.target.value)}
                />
                <select
                    required
                    name='type'
                    placeholder={type}
                    value={type}
                    onChange={e => setType(e.target.value)}

                >
                    <option>Choose a venue type</option>
                    <option>Dog Park</option>
                    <option>Bar/Restaurant</option>
                    <option>Park</option>

                </select>

                <button>Submit</button>
            </form>
            <div>
                { }
            </div>
        </section>
    )

}

export default EditPlaceForm;
