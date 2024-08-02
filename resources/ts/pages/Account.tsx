import React, { FormEventHandler, MutableRefObject, useEffect } from 'react'
import { Link } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import axios from "axios";
import { useUserContext } from '../UserContext';
import Cookies from 'js-cookie'

const Account = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();

    const baseURL:string = "http://127.0.0.1:8000";

    // 自動クッキーログイン機能
    useEffect(()=> {
        // token emailがクッキー上に保存していない場合処理を終了させる
        if(Cookies.get("token")===undefined || Cookies.get("email")===undefined){
            console.log({
                data:"this data is cookie",
                token: Cookies.get("token"),
                email: Cookies.get("email"),
                userType: Cookies.get("userType")
            })
            return;
        };
        const autoSigninFuncCompany = async () => {
            const sendData = {
                token: Cookies.get("token"),
                email: Cookies.get("email"),
            }
            console.log(Cookies.get("token")===undefined);
            await axios.post(`${baseURL}/api/signin_company_account_by_token`,sendData)
                .then(response => {
                    Cookies.set("token",response.data.token);
                    setUserType("company");
                    setToken(response.data.token);
                    setState("signin")
                    console.log({this_is_senddata: sendData});
                    console.log(response);
                    console.log("auto login successed!!!");
                })
                .catch(error => {
                    console.log({this_is_senddata: sendData});
                    console.log(error);
                });
        }

        const autoSigninFuncEngineer = async () => {
            const sendData = {
                token: Cookies.get("token"),
                email: Cookies.get("email"),
            }
            await axios.post(`${baseURL}/api/signin_engineer_account_by_token`,sendData)
                .then(response => {
                    Cookies.set("token",response.data.token);
                    setUserType("engineer");
                    setToken(response.data.token);
                    setState("signin")
                    console.log({this_is_senddata: sendData});
                    console.log(response.data);
                    console.log("auto login successed!!!");
                })
                .catch(error => {
                    console.log({this_is_senddata: sendData});
                    console.log(error);
                });
        }
        userType==="company" && autoSigninFuncCompany();
        if(userType==="company"){
            autoSigninFuncCompany();
        }
        else if(userType==="engineer"){
            autoSigninFuncEngineer();
        }
    },[])


    return (
        <div className='flex'>
            <div className='flex flex-col items-center justify-center w-1/2'>
                <Link to={"/account/"}>
                    <span className='text-3xl font-bold text-amber-700'>DUCTION</span>
                </Link>
                <span className='mt-10 text-xl font-bold'>市場価値を楽に伝える</span>
            </div>
            <div className='flex flex-col items-center justify-center w-1/2 px-10 m-16 bg-orange-200 border py-28 rounded-3xl'>
                <span className='text-xl font-bold '>あなたは</span>
                <Link to={"/account/signin_for_company/"}>
                    <span className='mt-5 text-xl font-bold text-orange-500 duration-300 cursor-pointer hover:text-orange-300'>
                        採用担当者ですか？
                    </span>
                </Link>
                <span className='mt-2 text-xl font-bold'>or</span>
                <Link to={"/account/signin_for_engineer/"}>
                    <span className='mt-2 text-xl font-bold text-red-500 duration-300 cursor-pointer hover:text-red-300'>
                        エンジニアですか？
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Account
