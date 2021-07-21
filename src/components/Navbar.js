import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="container-nav">
            <nav>
                <Link to="/">
                    HOME
                </Link>
                <Link to="/voice">
                    VOICE
                </Link>
                <Link to="/sms">
                    SMS
                </Link>
                <Link to="/data">
                    DATA
                </Link>
                <Link to="/outages">
                    OUTAGE
                </Link>
            </nav>
        </div>
    )
}

export default Navbar
