import React from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import FavoriteMain from '../components/FavoriteMain'

const Favorite = () => {
    return (
    <div className='h-full flex-1'>
        <Topbar />
        <div className='flex flex-1 h-full w-full -z-10'>
            <Sidebar />
            <FavoriteMain />
        </div>
    </div>
    )
}

export default Favorite
