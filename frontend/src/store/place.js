const { csrfFetch } = require('./csrf');
//TYPES
const CREATE_PLACE = 'create/createPlace'//create
const GET_PLACES = 'places/getPlaces'//read
const GET_PLACE = 'places/getPlace'//read

const UPDATE_PLACE = 'places/updatePlace'//update
const DELETE_PLACE = 'places/deletePlace'//delete


//THUNK ACTION CREATOR
const actionCreatePlace = (place) => {
    return {
        type: CREATE_PLACE,
        place
    }
}
const actionGetPlaces = (places) => {
    return {
        type: GET_PLACES,
        places
    }
}
const actionGetPlace = (place) => {
    return {
        type: GET_PLACE,
        place
    }
}
const actionUpdatePlace = (place) => {
    return {
        type: UPDATE_PLACE,
        place
    }
}
const actionDeletePlace = (placeId) => {
    return {
        type: DELETE_PLACE,
        placeId
    }
}

//THUNKS one per route

export const thunkGetAllPlaces = () => async dispatch => {
    const res = await csrfFetch('/api/places')

    console.log('THUNK, GET ALL PLACES: ')

    if (res.ok) {
        const places = await res.json();
        dispatch(actionGetPlaces(places))
        return places;
    }
}
export const thunkGetPlace = (placeId) => async dispatch => {
    // console.log('place in thunkGetPlace')

    const res = await csrfFetch(`/api/places/${placeId}`)
    // console.log(placeId, `THUNK, GET PLACE(): `)
    if (res.ok) {
        const place = await res.json();
        dispatch(actionGetPlace(place))
        return place;
    }
}

export const thunkCreatePlace = (place) => async dispatch => {
    // console.log(place, 'in thunkCreatePlace, step4?')
    const res = await csrfFetch('/api/places', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(place)
    })
    if (res.ok) {
        const place = await res.json();
        // console.log('Thunk, create Place: ', place)
        dispatch(actionCreatePlace(place))
        return place;
    }
}

export const thunkUpdatePlace = place => async dispatch => {
    console.log(place, '\n\n\n', 'in thunkUpdatePlace');

    const res = await csrfFetch(`/api/places/${place.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(place)
    })
    if (res.ok) {
        const updatedPlace = await res.json();
        dispatch(actionUpdatePlace(updatedPlace))
        return updatedPlace;
    }
}


export const thunkDeletePlace = (placeId) => async dispatch => {
    console.log(placeId, 'in thunkDeletePlace')
    const res = await csrfFetch(`/api/places/${placeId}`, {
        method: 'delete',
    })
    if (res.ok) {
        const newId = await res.json();
        console.log('Thunk, delete Place: ',)
        dispatch(actionDeletePlace(newId))
        // return place;
    }
}

//REDUCER
const iState = {};
const placesReducer = (state = iState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_PLACE:
            newState = { ...state, [action.place.id]: action.place };
            // console.log(action, "...CREATE_PLACE... in placesReducer")

            // console.log(newState, "...CREATE_PLACE... in placesReducer")
            return newState;
        case GET_PLACES:
            newState = { ...state };
            action.places?.forEach(place => {
                newState[place.id] = place;//flattemout
            })
            // console.log(action, "...GET_PLACES... in placesReducer")
            // console.log(newState, "...GET_PLACES... in placesReducer")
            return newState;
        case GET_PLACE:
            newState = { ...state };

            // console.log(action, "action...GET_PLACE... in placesReducer")
            // console.log(newState, "State...GET_PLACE... in placesReducer")
            newState[action.place.id] = action.place;// ???? wtf happened here?
            return newState;
        case UPDATE_PLACE:
            newState = { ...state }
            // console.log(action.place, "action...UPDATE_PLACE... in placesReducer")

            //state seems right: holds changes
            //changes don't show on database

            newState[action.place.id] = action.place;
            return newState;
        case DELETE_PLACE:
            // console.log(action, 'action...DELETE_PLACE...')
            newState = { ...state }
            // console.log('...DELETE_PLACE... how to refresh list?'); //don't see this.
            delete newState[action.placeId]
            return newState;
        default:
            return state;
    }
}

export default placesReducer;


// case UPDATE_ITEM:
// return {
//     ...state,
//     [action.item.id]: action.item
//   };




// history.push to main page
