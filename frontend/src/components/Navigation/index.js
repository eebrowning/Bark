import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { demoLogin } from '../../store/session';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()
    let sessionLinks;

    useEffect(() => {


    }, [dispatch])
    const handleClick = (e) => {
        e.preventDefault();

        const user = { credential: 'DemoDog', password: 'password' };

        return dispatch(demoLogin())
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
    }


    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <NavLink to='/create'>New Place</NavLink>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <button onClick={handleClick}>Demo User</button>

            </>
        );
    }

    return (
        <ul id={'nav-bar-ul'}>
            <li>
                <img onClick={() => history.push('/')} id='nav-logo' src='https://fontmeme.com/permalink/220702/01a4e3f2e2dfca0efb0d85c9a5590637.png' />
            </li>

            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>

            <li>
                {isLoaded && sessionLinks}
            </li>


        </ul>
    );
}

export default Navigation;
