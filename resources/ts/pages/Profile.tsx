import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ProfileMain from '../components/ProfileMain';

const Profile = () => {
    const engineerId: number = Number(useParams().engineerId || "0");

    return (
        <div className='flex-1 h-full'>
            <Topbar />
            <div className='flex flex-1 w-full h-full -z-10'>
                <Sidebar />
                <ProfileMain engineerId={engineerId} />
            </div>
        </div>
    )
}

export default Profile
