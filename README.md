# Bark: a yelp clone

Bark is a clone of Yelp, the eponymous business-review site, but geared towards places you can take your dog along.
The project is primarily built using the following: 

### Technologies Used 

- PostgreSQL(sequelize.js)
- Express.js
- React.js with Redux
- Node.js
- Heroku

Data is made available on every page through manipulating the state and data store with Redux: At no point is the page's context lost due to refreshes or reloads.

 ### Live demo app:

- Bark: https://bark-eeb828.herokuapp.com/
- Demo user available--feel free to sign up!


### Demo/Test locally:
- download or clone from repo: https://github.com/eebrowning/Bark
- After navigating to the Bark directory, open a split terminal to navigate to the backend and frontend directories, one in each. 
- run 'npm install' in each.
- run 'npm start' in each.
- localhost:3000 will open on your default browser, and the Bark app will be available for testing locally
- Demo user available



Screenshots
-

- splash
![](https://user-images.githubusercontent.com/51832487/177031135-ac30d5b8-4ea7-46ce-8cd0-baa8bb35c67f.png)


- Place view

![](https://user-images.githubusercontent.com/51832487/177031141-66e8456c-05ad-448b-b577-cbec524242f4.png)


- Form view

![](https://user-images.githubusercontent.com/51832487/177031145-ca4e9365-2052-4b20-bcc0-1b365617dd1e.png)



# Future Features
- Average Rating for Places, visible from their card
- Place details and extra photos
- Users ability to 'like' Places
- User Profile
- User Friends
- Search Feature

# Technical implementation details

I had to consider a scope in which to clone/copy yelp that would able to be accomplished as a single-developer in 5 days that also left room for growth:
- shaping my database and redux store in a way that will accept new fields and associations
- leaving room for components/elements while not having too much empty space
- how to shape state and use the redux store to make sure users never experience a loss of contextual information related to the action they are taking on the site(refreshing on an edit form and not losing the information related to the place being edited)

```
//Example reducer from the store directory
const iState = {};
const placesReducer = (state = iState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_PLACE:
            newState = { ...state, [action.place.id]: action.place };
            // console.log(action, "...CREATE_PLACE... in placesReducer")
            return newState;
        case GET_PLACES:
            newState = {};
            action.places.forEach(place => {
                newState[place.id] = place;
            })
            // console.log(action, "...GET_PLACES... in placesReducer")
            return newState;
        case GET_PLACE:
            newState = { ...state };
            // console.log(action, "action...GET_PLACE... in placesReducer")
            newState[action.place.id] = action.place;
            return newState;
        case UPDATE_PLACE:
            newState = { ...state }
            console.log(action.place, "action...UPDATE_PLACE... in placesReducer")
            newState[action.place.id] = action.place;
            return newState;
        case DELETE_PLACE:
            // console.log(action, 'action...DELETE_PLACE...')
            newState = { ...state }
            delete newState[action.placeId]
            return newState;
        default:
            return state;
    }
}

export default placesReducer;

```


Anything you had to stop and think about before building


# Challenges/hurdles:
This was my first project with Redux: manipulating state via a reducer was entirely new to me, and though it was a struggle figuruing out the flow of Redux with React, but now I have a solid understanding of state. (example reducer above).  The rest of the project wasn't necessarily easy, but that proved the largest obstacle.
