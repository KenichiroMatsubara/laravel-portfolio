import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const FESidebar = () => {
    return (
        <div className='sticky w-3/12 m-2'>
            <ul className='flex flex-col'>
                <Link to={"/engineer/"}>
                    <li className='flex items-center px-4 py-2 text-2xl text-orange-500 duration-300 border-b border-orange-300 hover:text-orange-300'>
                        <HomeIcon fontSize='large' />
                        <span className='ml-1'>Home</span>
                    </li>
                </Link>
                <Link to={"/engineer/companylist"}>
                    <li className='flex items-center px-4 py-2 text-2xl text-orange-500 duration-300 border-b border-orange-300 hover:text-orange-300'>
                        <NotificationsIcon fontSize='large' />
                        <span className='ml-1'>Contact</span>
                    </li>
                </Link>
                <Link to={"/engineer/make_new"}>
                    <li className='flex items-center px-4 py-2 text-2xl text-orange-500 duration-300 border-b border-orange-300 hover:text-orange-300'>
                        <FiberNewIcon fontSize='large' />
                        <span className='ml-1'>Make New</span>
                    </li>
                </Link>
                <Link to={"/engineer/search"}>
                    <li className='flex items-center px-4 py-2 text-2xl text-orange-500 duration-300 border-b border-orange-300 hover:text-orange-300'>
                        <SearchIcon fontSize='large' />
                        <span className='ml-1'>Search</span>
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default FESidebar
