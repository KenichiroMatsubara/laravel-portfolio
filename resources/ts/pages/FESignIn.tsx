import React, { FormEventHandler, MutableRefObject, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import axios from "axios";
import { useUserContext } from '../UserContext';
import Cookies from 'js-cookie'

const FESignIn = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const navigate = useNavigate();

    const [autoSignin,setAutoSignin] = useState<boolean>(!(token==="none"));//tokenがからの時はautoSigninを実行しない
    const [authFailed, setAuthFailed] = useState<boolean>(false);

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const baseURL:string = "http://127.0.0.1:8000";

    useEffect(()=> {
        // token emailがクッキー上に保存していない場合処理を終了させる
        if(Cookies.get("token")===undefined && Cookies.get("email")===undefined){
            console.log({token: Cookies.get("token"), email: Cookies.get("email")})
            return;
        };
        const autoSigninFunc = async () => {
            const sendData = {
                token: Cookies.get("token"),
                email: Cookies.get("email"),
            }
            await axios.post(`${baseURL}/api/signin_engineer_account_by_token`,sendData)
                .then(response => {
                    Cookies.set("token",response.data.token);
                    Cookies.set("email",response.data.email);
                    setUserType("engineer");
                    setToken(response.data.token);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        autoSigninFunc();
    },[])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const sendData = {
            "email":email.current?.value||"",
            "password": sha256(password.current?.value).toString(),
            "autoSignin": autoSignin,
        }
        console.log(sendData);
        try {
            const response = await axios.post(`${baseURL}/api/signin_engineer_account_by_password`,sendData);
            if(response.data.result="password is wrong"){
                setAuthFailed(true);
                console.log(response.data);
            }
            else {
                if(autoSignin===true){
                    Cookies.set("token",response.data.token);
                    Cookies.set("email",response.data.email);
                }
                else{
                    Cookies.remove("email");
                    Cookies.remove("token");
                }
                Cookies.set("userType","engineer");
                setId(response.data.id);
                setState("signin");
                setToken(response.data.token);
                setUserType("engineer");
                console.log(response.data);
                console.log({userType,token,state,id});
            }
        } catch (error) {
            setAuthFailed(true);
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
                        ref={email}
                        placeholder='email'
                        className='px-2 py-1 mb-5 rounded'
                    />
                    <input
                        type="password"
                        ref={password}
                        placeholder='password'
                        className='px-2 py-1 mb-5 rounded'
                    />
                    <input
                        type="submit"
                        value={"ログイン"}
                        className='px-3 py-1 font-bold text-white duration-300 bg-orange-500 rounded hover:bg-orange-300'
                    />
                </form>
                <span className='mb-2 text-xs text-red-500'>{authFailed ? "ログインに失敗しました":"　"}</span>
                <div className='flex items-center mb-2'>
                    <span>次回から自動ログイン</span>
                    <input
                        type="checkbox"
                        checked={autoSignin}
                        onChange={() => setAutoSignin(!autoSignin)}
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
