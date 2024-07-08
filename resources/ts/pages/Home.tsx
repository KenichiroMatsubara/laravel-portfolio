import React from 'react'
import Sidebar from '../components/Sidebar'
import HomeMain from '../components/HomeMain'

const Home = () => {
    return (
        <div className='flex-1 h-full'>
            <div className='flex w-full h-full -z-10'>
                <Sidebar />
                <HomeMain />
            </div>
        </div>
    )
}

export default Home
