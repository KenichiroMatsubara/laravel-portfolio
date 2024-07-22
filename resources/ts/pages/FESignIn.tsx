import React, { FormEventHandler, MutableRefObject, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useUserContext } from '../UserContext';

const FESignIn = () => {
    const [cookies,setCookies,removeCookies] = useCookies();
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();

    const [autoLogin,setAutoLogin] = useState<boolean>(!(token===""));//tokenがからの時はautoLoginを実行しない
    const [alreadyUsed,setAlreadyUsed] = useState<boolean>(false);

    const email:MutableRefObject<string> = useRef("email");
    const password:MutableRefObject<string> = useRef("password");
    const baseURL:string = "http://127.0.0.1:8000/api";

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const sendData = {
            "email":email,
            "password": sha256(password).toString(),
        }
        try {
            const data = await axios.post(`${baseURL}/signin_engineer_account_by_password`,sendData);


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex'>
            <div className='flex flex-col items-center justify-center w-1/2'>
                <Link to={"/account/"}>
                    <span className='text-3xl font-bold text-amber-700'>DUCTION</span>
                </Link>
                <span className='mt-10 text-xl font-bold'>市場価値を楽に伝える</span>
            </div>
            <div className='flex flex-col items-center justify-center w-1/2 px-10 py-16 m-16 bg-orange-100 border rounded-3xl'>
                <span className='mb-5 text-xl font-bold'>エンジニア</span>
                <form onSubmit={handleSubmit} className='flex flex-col mb-5'>
                    <input
                        type="text"
                        name='email'
                        placeholder='email'
                        className='px-2 py-1 mb-5 rounded'
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='password'
                        className='px-2 py-1 mb-5 rounded'
                    />
                    <input
                        type="submit"
                        value={"ログイン"}
                        className='px-3 py-1 font-bold text-white duration-300 bg-orange-500 rounded hover:bg-orange-300'
                    />
                </form>
                <div className='flex items-center mb-2'>
                    <span>次回から自動ログイン</span>
                    <input
                        type="checkbox"
                        checked={autoLogin}
                        onChange={() => setAutoLogin(!autoLogin)}
                        className='w-4 h-4 ml-2'
                    />
                </div>
                <Link to={"/account/register_for_engineer/"}>
                    <span className='font-bold text-gray-900 duration-300 cursor-pointer hover:text-gray-500'>
                        新規登録はこちらから
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default FESignIn
