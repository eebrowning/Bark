import { useEffect, useState } from "react"
import { thunkGetAllPlaces, thunkGetPlace, thunkUpdatePlace } from "../../store/place";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import './editPlace.css'

const EditPlaceForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [type, setType] = useState('')
    const [imageURL, setImageURL] = useState("");
    const [errors, setErrors] = useState('');
    const [state, setState] = useState()
    const { placeId } = useParams();


    const place = useSelector((state) => state.placesState[placeId]);
    console.log("=====>", place, 'place in edit place form')
    const places = useSelector(state => Object.values(state.placesState))
    console.log("===== >", places, 'places in edit place form')

    // const places =
    const user = useSelector(state => {
        return state.session.user;
    })
    const userId = user?.id;


    useEffect(() => {
        // dispatch(thunkGetPlace(placeId));
        dispatch(thunkGetAllPlaces())
        console.log('dispatched to thunkGetPlace')
    }, [dispatch]);

    // console.log(user, 'user in createplaceform')
    // console.log(userId, 'USER ID for newPlace')
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(place, '\n\n\n', 'PRE EDIT PLACE FORM', '\n\n')
        console.log('====>', imageURL.toString().includes('jpg' || 'jpeg'), 'heres if the place\'s imageURL includes jpg or jpeg')

        if (address !== place.address && address.length > 0) { place.address = address; }
        if (imageURL !== place.imageURL && imageURL.length > 0) {//sets fine
            place.imageURL = imageURL;
        } else if (!imageURL) {
            setImageURL(place.imageURL)
        };

        if (type) place.type = type;
        // console.log(place, '\n\n\n', 'EDIT PLACE FORM', '\n\n')
        setErrors([]);
        let updatedPlace = await dispatch(thunkUpdatePlace(place))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                console.log(errors, 'errors in editPlaceForm')

            });

        // console.log(updatedPlace.id, 'updatedPlace id')
        if (updatedPlace && user) {
            history.push(`/places/${updatedPlace.id}`);
        }
        return updatedPlace;
    }

    if (place) return (
        <section id="place-form-section">
            <form id="place-form" onSubmit={handleSubmit}>
                <h2>Edit {place.name}:</h2>
                <ul>
                    {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>Address</label>
                <input
                    required
                    name='address'
                    placeholder='enter an address'
                    defaultValue={place.address}
                    onChange={e => setAddress(e.target.value)}
                />
                <label>Image URL</label>
                <input
                    name='Image'
                    placeholder={'jpg / jpeg format'}
                    defaultValue={place.imageURL}
                    onChange={e => setImageURL(e.target.value)}
                />
                <label>Venue Type</label>
                <select
                    required
                    name='type'
                    onChange={e => setType(e.target.value)}
                >
                    <option>Choose a venue</option>
                    <option>Dog Park</option>
                    <option>Bar/Restaurant</option>
                    <option>Park</option>

                </select>

                <button>Submit</button>
            </form>
            {/* <div>
                { }
            </div> */}
        </section>
    )

}

export default EditPlaceForm;
