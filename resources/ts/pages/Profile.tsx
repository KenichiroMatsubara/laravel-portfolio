import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ProfileMain from '../components/ProfileMain';

const Profile = () => {
    return (
        <div className='h-full flex-1'>
            <Topbar />
            <div className='flex flex-1 h-full w-full -z-10'>
                <Sidebar />
                <ProfileMain />
            </div>
        </div>
    )
}

export default Profile
