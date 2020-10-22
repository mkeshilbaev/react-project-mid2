import React, { ReactElement, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:3030/'

interface Props {
    token?: string;
}
export default function Navbar(props: Props): ReactElement {
    const [profile, setProfilles] = useState({
        email: '',
        username: ''
    })

    if (!profile.email && localStorage.getItem('token'))
        axios.get(API_URL + `profile`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                setProfilles(res.data)
            })

    const signOut = () => {
        setProfilles({ email: '', username: '' })
        localStorage.setItem('token', '')
    }

    return (
        <nav className="navBar">
            <ul>
                <li><NavLink to="/"><img src='logotype.svg' alt='sr_logo' width='40' height='40' /></NavLink></li>
            </ul>
            <ul>
                <li><NavLink to="/anime">ANIME</NavLink></li>
                <li><NavLink to="/dorama">DORAMA</NavLink></li>
                <li><a href='#'>SOFTSUB</a></li>
                <li><a href='#'>TELEGRAM</a></li>
                <li><a href='#'>DISCORD</a></li>
                <li><a href='#'>PATREON</a></li>
            </ul>
            <ul>
                {profile.username ?
                    <>
                        <li>{profile.username}</li>
                        <li><NavLink onClick={signOut} to="/signup">SIGNOUT</NavLink></li>
                    </> :
                    <>
                        <li><NavLink to="/login">LOGIN</NavLink></li>
                        <li><NavLink to="/signup">SIGNUP</NavLink></li>
                    </>
                }

            </ul>
        </nav>
    );
}
