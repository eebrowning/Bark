import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { thunkGetAllPlaces } from "../../store/place";
import { thunkGetAllReviews } from "../../store/review";
import Search from "../Search/Search";
import "./index.css"



const Places = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(thunkGetAllPlaces());
        dispatch(thunkGetAllReviews());
        console.log("sent dispatch to thunkGetAllPlaces")
    }, [dispatch])


    const placesArr = useSelector((state) => Object.values(state.placesState));
    console.log(placesArr, 'places array????')
    const reviewsArr = useSelector((state) => Object.values(state.reviewsState));
    //iterate through placesArr and PUT the average rating for each.

    const getAvgRating = (placeId) => {

        let placeReviews = reviewsArr.filter(review => review.placeId === placeId);

        let placeTotalRating = 0;
        placeReviews.forEach((review) => placeTotalRating += review.rating)
        let placeAvgRating = placeTotalRating / placeReviews.length;
        return placeAvgRating;
    }

    const handleClick = ((e) => {
        e.preventDefault();
        const placeId = e.target.id.split('-')[2]

        history.push(`/places/${placeId}`)
    })
    let avgRating;
    return (
        <div id={'places-view'}>
            <span id='banner-box'>
                <img id='banner-image' src='http://www.newsilike.in/wp-content/uploads/2016/10/Dog-Parks-India.jpg' />
                <div id='over-banner-image'>
                    <h2>Bark has all the fun places for you and your pup!</h2>
                    <div id='home-search'>
                        <h3>Scroll down to explore</h3>
                        <div style={{ paddingBottom: '20px', color: '#48C2F9' }}>
                            or
                        </div>
                        <Search />
                    </div>

                </div>
            </span>
            {/* <div id='sub-banner-text'><h2>Places for your Pup</h2></div> */}
            {!placesArr.length && <span>No places available right now.</span>}
            <div id='next-review'>Your Next Review Awaits</div>
            <ul className="place-list" >
                {placesArr?.map((place) => (
                    <span key={place.id} id={`place-box-${place.id}`} className={'place-card'} onClick={handleClick}>
                        <div style={{ display: 'none' }}>
                            {avgRating = Math.floor(getAvgRating(place.id))}
                            {avgRating >= 0 ? null : avgRating = 0}
                        </div>


                        <img src={place.imageURL} alt="alt" id={`place-img-${place.id}`}></img>
                        <div className='place-card-content' id={`place-div-${place.id}`}>
                            <h2 id={`place-h2-${place.id}`} onClick={handleClick}>{place.name}</h2>
                            <p id={`place-p-${place.id}`}>Do you recommend this business?</p>
                            <div id='avg-rating-pair'>

                                <p id={`place-avg-${place.id}`}>Average Review:</p>
                                <div id='double-star-box'>
                                    <>
                                        <div className="blank-star-box" id={`avg-rating-${place.id}`}>  {[...Array(5)].map(star => (<div className="blank-star">☆</div>))}</div>
                                        <div className="review-star-box" id={`avg-rating-${place.id}`}>  {avgRating ? [...Array(avgRating)].map(star => (<div className="review-star">☆</div>)) : null}</div>
                                    </>

                                </div>
                            </div>
                        </div>
                    </span>
                ))}
            </ul>
        </div>
    )
}

export default Places;
