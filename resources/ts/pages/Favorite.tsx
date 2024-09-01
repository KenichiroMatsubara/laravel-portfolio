import React from 'react'
import Topbar from '../components/Searchbar'
import Sidebar from '../components/Sidebar'
import FavoriteMain from '../components/FavoriteMain'

const Favorite = () => {
    return (
    <div className='flex-1 h-full'>
        <div className='flex flex-1 w-full h-full -z-10'>
            <Sidebar />
            <FavoriteMain />
        </div>
    </div>
    )
}

export default Favorite
