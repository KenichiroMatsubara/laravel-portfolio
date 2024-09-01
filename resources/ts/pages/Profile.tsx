import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Searchbar';
import ProfileMain from '../components/ProfileMain';
import Chat from '../components/Chat';
import { useUserContext } from '../UserContext';

const Profile: FC = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const engineerId: number = Number(location.pathname.split("/")[location.pathname.split("/").length-2] || "0");
    const [onModal,setOnModal] = useState<boolean>(false);

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
            {onModal && <Chat engineerId={engineerId} companyId={id} setOnModal={setOnModal} />}
        </div>
    )
}

export default Profile
