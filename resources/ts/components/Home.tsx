import React from 'react'
import Topbar from './Search'
import Sidebar from './Sidebar'
import HomeMain from './HomeMain'

const Home = () => {
    return (
        <div className='h-full'>
            <Topbar />
            <div className='flex h-full'>
                <Sidebar />
                <HomeMain />
            </div>
        </div>
    )
}

export default Home
