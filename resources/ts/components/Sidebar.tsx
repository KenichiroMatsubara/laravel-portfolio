import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sticky w-3/12 h-full'>
            <div className='flex flex-col'>
                <Link to={"/"}>
                    <span className='flex items-center pt-3 pl-5 mx-5 text-3xl text-orange-600 duration-300 border-b border-orange-600 hover:text-orange-400'>
                        <HomeIcon fontSize='large' />
                        <span className='text-3xl'>Home</span>
                    </span>
                </Link>
                <Link to={`/favorite/`}>
                    <span className='flex items-center pt-3 pl-5 mx-5 text-3xl text-orange-600 duration-300 border-b border-orange-600 hover:text-orange-400'>
                        <FavoriteIcon fontSize='large' />
                        <span className='text-3xl'>Favorite</span>
                    </span>
                </Link>
                <Link to={`/search/`}>
                    <span className='flex items-center pt-3 pl-5 mx-5 text-3xl text-orange-600 duration-300 border-b border-orange-600 hover:text-orange-400'>
                        <SearchIcon fontSize='large' />
                        <span className='text-3xl'>Seach</span>
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
