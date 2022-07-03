import { useEffect, useState } from "react"
import { thunkCreatePlace } from "../../store/place";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./createPlace.css"

const CreatePlaceForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const [type, setType] = useState('')
    const [imageURL, setImageURL] = useState("");
    const [errors, setErrors] = useState([])

    const user = useSelector(state => {
        return state.session.user;
    })



    const userId = user?.id;
    // console.log(userId, 'USER ID for newPlace')
    const handleSubmit = async (e) => {
        e.preventDefault();

        let trimName = name.replace(/\s+$/, '');//regex to kill leading and trailing spaces

        const newPlace = { userId, name: trimName, address, type, imageURL, };
        // console.log(newPlace, 'newPlace, step1?')


        // if (createdPlace && user) {
        setErrors([]);
        let createdPlace = await dispatch(thunkCreatePlace(newPlace)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            // console.log(errors, 'errors in createPlaceForm')
        });
        if (createdPlace) history.push(`/places/${createdPlace.id}`);//need placeId somehow
        return createdPlace;

        // }
    }


    return (
        <section id="place-form-section">
            <form id="place-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.length > 0 && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <input
                    required
                    name="name"
                    placeholder="place name"
                    type="string"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    required
                    name='address'
                    placeholder="place address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <input
                    name='Image'
                    placeholder='jpg / jpeg format'
                    value={imageURL}
                    onChange={e => setImageURL(e.target.value)}
                />
                <label>Venue type</label>
                <select
                    required
                    name='type'
                    placeholder={type}
                    value={type}
                    onChange={e => setType(e.target.value)}

                >
                    <option></option>
                    <option>Dog Park</option>
                    <option>Bar/Restaurant</option>
                    <option>Park</option>

                </select>

                <button>Submit Place</button>
            </form>

        </section>
    )

}

export default CreatePlaceForm;
