import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='w-3/12 h-full sticky'>
            <div className='flex flex-col'>
                <Link to={"/"}>
                    <span className='flex items-center pl-5 pt-3 mx-5 text-orange-600 text-3xl border-b border-orange-600 hover:text-orange-400 duration-300'>
                        <HomeIcon fontSize='large' />
                        <span className='text-3xl'>Home</span>
                    </span>
                </Link>
                <Link to={`/favorite/`}>
                    <span className='flex items-center pl-5 pt-3 mx-5 text-orange-600 text-3xl border-b border-orange-600 hover:text-orange-400 duration-300'>
                        <FavoriteIcon fontSize='large' />
                        <span className='text-3xl'>Favorite</span>
                    </span>
                </Link>
                <span className='flex items-center pl-5 pt-3 mx-5 text-orange-600 text-3xl border-b border-orange-600 hover:text-orange-400 duration-300'>
                    <SearchIcon fontSize='large' />
                    <span className='text-3xl'>Seach</span>
                </span>
            </div>
        </div>
    )
}

export default Sidebar
