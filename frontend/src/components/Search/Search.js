import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./search.css"

const Search = () => {
  // const dispatch = useDispatch()
  const [enhancedSearch, setEnhancedSearch] = useState([])
  // const [keystroke, setKeystroke] = useState('');
  const allLocations = useSelector(state => state.placesState)
  // console.log('boo', allLocations)
  const locations = Object.values(allLocations);
  let search = []


  const filteredLocation = (e) => {
    if (e.target.value) {
      search = locations.filter(location => {
        if (location.name.toLowerCase().includes(e.target.value.toLowerCase()) || location.type.toLowerCase().includes(e.target.value.toLowerCase())) {
          return true;
        }
      })
    }
    // console.log(search)
    setEnhancedSearch(search)
  }
  return (
    <>
      <input
        className='locationSearch'
        type='text'
        placeholder="Search your favorite places!"
        onChange={
          filteredLocation
        }
      />
      <div className='results-container-wrapper'>

        <div className='results-container'>
          {enhancedSearch.map(result => (
            <Link key={result.id} to={`/locations/${result.id}`}>
              <div className='individual-result'>
                <p className='search-name'>{result.name}, {result.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
};

export default Search;
