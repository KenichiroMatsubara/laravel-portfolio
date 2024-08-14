import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useUserContext } from '../UserContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SignoutBar = () => {
    const [onSignoutButton,setOnSignoutButton] = useState<boolean>(false);
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();

    const handleSignout = () => {
        console.log("test");
        Cookies.remove("token");
        Cookies.remove("email");
        Cookies.remove("userType");
        setUserType("");
        setState("signout");
        setId(-1);
        setToken("");
    }
    return (
        <div className='ml-4'>
            {onSignoutButton ?
            <div className='flex items-center h-12'>
                <ArrowBackIosIcon
                    className='ml-1 mr-5 text-red-500 duration-300 hover:text-red-300'
                    onClick={() => setOnSignoutButton(false)}
                />
                <button
                    className='px-5 py-2 text-white duration-300 bg-red-500 rounded hover:bg-red-300'
                    onClick={() => handleSignout()}
                >
                    サインアウトする
                </button>
            </div>
            :
            <div className='flex items-center h-12'>
                <ArrowForwardIosIcon
                    className='text-red-500 duration-300 hover:text-red-300'
                    onClick={() => setOnSignoutButton(true)}
                />
            </div>}
        </div>
    )
}

export default SignoutBar
