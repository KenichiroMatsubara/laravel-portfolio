import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import ProfileMain from '../components/ProfileMain';
import Chat from '../components/Chat';

const Profile: FC = () => {
    const engineerId: number = Number(useParams().engineerId || "0");
    const [onModal,setOnModal] = useState<boolean>(false);
    const userType: string = "company";

    useEffect(() => {
        console.log(onModal);
    },[])

    return (
        <div className='flex-1 h-full'>
            <Topbar />
            <div className='flex flex-1 w-full h-full -z-10'>
                <Sidebar />
                <ProfileMain engineerId={engineerId} setOnModal={setOnModal} />
            </div>
            {onModal && <Chat engineerId={engineerId} companyId={1} setOnModal={setOnModal} />}
        </div>
    )
}

export default Profile
