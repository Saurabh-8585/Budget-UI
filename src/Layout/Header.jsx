import React from 'react'
import { UserButton } from '@clerk/clerk-react';
import { AppImages } from '../Assets';

const Header = () => {

    return (
        <div className='flex justify-between mx-2 py-5'>
            <img src={AppImages.Logo} alt='logo' />
            <UserButton />
        </div>
    )
}

export default Header