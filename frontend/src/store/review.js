
const { csrfFetch } = require('./csrf');
//TYPES
const CREATE_REVIEW = 'create/createReview'//create
const GET_REVIEWS = 'reviews/getReviews'//read
const UPDATE_REVIEW = 'reviews/updateReview'//update
const DELETE_REVIEW = 'reviews/deleteReview'//delete


//THUNK ACTION CREATOR
const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}
const actionGetReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}
const actionUpdateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}
const actionDeleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

//THUNKS one per route

export const thunkGetAllReviews = () => async dispatch => {
    //does this need to be passed palce id? prolly not, as it will be available on page
    const res = await csrfFetch('/api/reviews')

    console.log('THUNK, GET ALL REVIEWS: ')

    if (res.ok) {
        const reviews = await res.json();
        dispatch(actionGetReviews(reviews))
        return reviews;
    }
}

export const thunkCreateReview = (review) => async dispatch => {
    // console.log(review, 'in thunkCreateReview, step4?')
    const res = await csrfFetch('/api/reviews', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    if (res.ok) {
        const review = await res.json();
        // console.log('Thunk, create review: ', review)
        dispatch(actionCreateReview(review))
        return review;
    }
}

export const thunkUpdateReview = review => async dispatch => {
    console.log(review, '\n\n\n', 'in thunkUpdateReview');

    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review })//should this be in brackets?
    })
    if (res.ok) {
        dispatch(actionUpdateReview(review))
        return review;
    }
}


export const thunkDeleteReview = (reviewId) => async dispatch => {
    console.log(reviewId, 'in thunkDeleteReview')
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete',
    })
    if (res.ok) {
        // const review = await res.json();
        const review = await res;
        console.log('Thunk, delete review: ', review)
        dispatch(actionDeleteReview(reviewId)); //needs to be id, not review.id
        // return review;
    }
}

//REDUCER
const iState = {};
const reviewsReducer = (state = iState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_REVIEW:
            newState = { ...state, [action.review.id]: action.review };
            console.log(action, "...CREATE_review... in reviewsReducer")
            console.log(newState, "...CREATE_review... in reviewsReducer")
            return newState;
        case GET_REVIEWS:
            newState = {};
            action.reviews.forEach(review => {
                newState[review.id] = review;//flattemout
            })
            // console.log(action, "...GET_reviewS... in reviewsReducer")
            // console.log(newState, "...GET_reviewS... in reviewsReducer")
            return newState;
        case UPDATE_REVIEW:
            newState = { ...state }
            console.log(action.review, "action...UPDATE_review... in reviewsReducer")

            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            // console.log(action.reviewId, 'action.reviewId.body in...DELETE_review...')
            newState = { ...state }
            // console.log('...DELETE_review... how to refresh list?');
            delete newState[action.reviewId]//not actually deleting here, your action.reviewId is a response object
            return newState;
        default:
            return state;
    }
}
export default reviewsReducer;


// case DELETE_REVIEW:
//     return {
//       ...state,
//       [action.placeId]: {
//         ...state[action.placeId],
//         items: state[action.placeId].items.filter(
//           (reviewId) => reviewId !== action.reviewId
//         )
//       }
//     };
