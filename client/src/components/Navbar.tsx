import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar: React.FC = () => {
    const [user, setUser] = useState(null);

    return (
        <div>
            <Link to='/'>
                <img src={assets.logo} alt='' className='w-28 sm:w-32 lg:w-40' />
            </Link>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Navbar;
