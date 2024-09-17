import React, { FormEventHandler, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import axios from "axios";
import { useUserContext } from '../UserContext';
import Cookies from 'js-cookie'
import { BaseURLContext } from '../app';

const FESignIn = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const baseURL:string = useContext(BaseURLContext);
    const [autoSignin,setAutoSignin] = useState<boolean>(!(token==="none"));//tokenがからの時はautoSigninを実行しない
    const [authFailed, setAuthFailed] = useState<boolean>(false);

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);


    // 自動クッキーログイン機能
    useEffect(()=> {
        const autoSigninFunc = async () => {
            // token emailがクッキー上に保存していない場合処理を終了させる
            if(Cookies.get("token")==="undefined" || Cookies.get("email")===undefined || Cookies.get("userType")!=="engineer"){
                console.log({
                    data:"cookie data",
                    token: Cookies.get("token"),
                    email: Cookies.get("email"),
                    userType: Cookies.get("userType")
                })
                return;
            };
            const sendData = {
                token: Cookies.get("token"),
                email: Cookies.get("email"),
            }
            try {
                const response = await axios.post(`${baseURL}/api/signin_engineer_account_by_token`,sendData);
                Cookies.set("token",response.data.token);
                setId(response.data.id);
                setUserType("engineer");
                setToken(response.data.token);
                setState("signin");
                console.log({this_is_senddata: sendData});
                console.log(response.data);
                console.log({userType,token,state});
                console.log("auto login successed!!!");
            } catch (error) {
                console.log(error);
                console.log({this_is_senddata: sendData});
                console.log("token signin is failed")
                setUserType("");
                setState("signout");
                setId(-1);
                setToken("undefined");
                Cookies.remove("token");
                Cookies.remove("email");
                Cookies.remove("userType");
                console.log({userType,state,id,token});
            }
        }
        autoSigninFunc();
    },[])

    // ログイン機能
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
            if(response.data.result==="password is wrong"){
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
                setId(response.data.data.id);
                setState("signin");
                setToken(response.data.token);
                setUserType("engineer");
                console.log(response.data);
                console.log({Cookie_data: {
                    email: Cookies.get("email"),
                    token: Cookies.get("token"),
                    userType: Cookies.get("userType")
                }})
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
                        type="email"
                        ref={email}
                        placeholder='email'
                        className='px-2 py-1 mb-5 rounded'
                        defaultValue={""}
                    />
                    <input
                        type="password"
                        ref={password}
                        placeholder='password'
                        className='px-2 py-1 mb-5 rounded'
                        defaultValue={""}
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
