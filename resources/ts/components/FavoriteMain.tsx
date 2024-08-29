import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Conma from './Conma';
import type { EngineerInfo } from '../types/engineerInfo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { BaseURLContext } from '../app';
import { useUserContext } from '../UserContext';

const FavoriteMain = () => {
    const year: number = 0;
    const name1: string = "名前1";
    const name2: string = "名前2";
    const langs: string[] = ["php","laravel","react","typescript","nodejs"]
    const places: string[] = ["愛知県"];
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const baseURL: string = useContext(BaseURLContext);
    const [onFavorite,setOnFavorite] = useState<boolean[]>([false,true]);
    const [showFavoritedUser,setShowFavoritedUser]=useState<boolean>(true);
    const [engineerInfos,setEngineerInfos] = useState<EngineerInfo[]>();

    useEffect(() => {
        const getFavoritedEngineer = async () => {
            const sendData = {
                "company_id":id
            }
            console.log({sendData});
            // お気に入りをCompanyが付けたEngineerを表示する場合
            if(showFavoritedUser===true){
                try {
                    const response = await axios.post(`${baseURL}/api/get_company_favorited_engineer_info`,sendData);
                    console.log(response.data);
                    const newEngineerInfos:EngineerInfo[] = [];
                    response.data.engineer_infos.forEach((engineer_info)=>{
                        console.log(engineer_info.profile ? engineer_info.profile.name:"未設定");
                        const newEngineerInfo:EngineerInfo = {
                            engineerName: engineer_info.profile ? engineer_info.profile.name:"未設定",
                            engineerId: engineer_info.id,
                            engieerExperience: engineer_info.profile ? engineer_info.profile.work_experience:0,
                            favoriteLangs: engineer_info.using_stacks || ["未設定"],
                            workAt :engineer_info.want_to_work_ats || ["未設定"],
                            profileImg: ""
                        };
                        newEngineerInfos.push(newEngineerInfo);
                    });
                    setEngineerInfos(newEngineerInfos);
                    console.log("お気に入りをCompanyが付けたEngineerを表示する場合");
                } catch (error) {
                    console.log(error);
                }
            }
            // お気に入りをEngineerが付けたCompanyを表示する場合
            else{
                try {
                    const response = await axios.post(`${baseURL}/api/get_company_favorited_by_engineer_info`,sendData);
                    console.log(response.data);
                    const newEngineerInfos:EngineerInfo[] = [];
                    response.data.engineer_infos.forEach((engineer_info)=>{
                        const newEngineerInfo:EngineerInfo = {
                            engineerName: engineer_info.profile ? engineer_info.profile.name:"未設定",
                            engineerId: engineer_info.id,
                            engieerExperience: engineer_info.profile ? engineer_info.profile.work_experience:0,
                            favoriteLangs: engineer_info.using_stacks || ["未設定"],
                            workAt :engineer_info.want_to_work_ats || ["未設定"],
                            profileImg: ""
                        };
                        console.log(newEngineerInfo);
                        newEngineerInfos.push(newEngineerInfo);
                    });
                    setEngineerInfos(newEngineerInfos);
                    console.log("お気に入りをEngineerが付けたCompanyを表示する場合");
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getFavoritedEngineer();
    },[showFavoritedUser]);

    // zTODOこのした二つの関数は全くの未完成
    const handleOnFavorite = async(index: number) => {
        const newOnFavorite = [...onFavorite];
        newOnFavorite[index] = true;
        setOnFavorite(newOnFavorite);
        const sendData = {"company_id":id};
        try {
            const response = await axios.post(`${baseURL}/api/create_favorite`,sendData);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOffFavorite = async(index: number) => {
        const newOnFavorite = [...onFavorite];
        newOnFavorite[index] = false;
        setOnFavorite(newOnFavorite);
        const sendData = {"company_id":id};
        try {
            const response = await axios.post(`${baseURL}/api/destroy_favorite`,sendData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col w-9/12 mx-10'>
            <ul className='h-full'>
                <div className='flex gap-5 my-5 '>
                    <button className={showFavoritedUser ?
                        "w-60 h-12 text-white bg-orange-500 rounded-full hover:bg-orange-300 duration-300 text-xl"
                        :
                        "w-60 h-12 text-sm rounded-full text-white bg-gray-400 px-4 py-1 hover:bg-gray-300 duration-300 hover:text-xl"}
                        onClick={()=>setShowFavoritedUser(true)}
                    >
                        LIKED
                    </button>
                    <button className={showFavoritedUser ?
                        "w-60 h-12 text-sm rounded-full text-white bg-gray-400 px-4 py-1 hover:bg-gray-300 duration-300 hover:text-xl"
                        :
                        "w-60 h-12 text-white bg-orange-500 rounded-full hover:bg-orange-300 duration-300 text-xl"}
                        onClick={()=>setShowFavoritedUser(false)}
                    >
                        LIKED BY
                    </button>
                </div>
                {engineerInfos!==undefined ? engineerInfos.map((engineerInfo: EngineerInfo,index) => (
                        <div className='flex items-center justify-between py-5 duration-300 border-b border-orange-300'>
                            <div className='flex items-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <img src={engineerInfo.profileImg}
                                        className='object-cover w-16 h-16 rounded-full'
                                    />
                                    <span className=''>{engineerInfo.engineerName}</span>
                                </div>
                                <div className='flex flex-col ml-5'>
                                    <span>実務経験{engineerInfo.engieerExperience}年</span>
                                    <span>得意言語・フレームワーク</span>
                                    <Conma Array={engineerInfo.favoriteLangs} />
                                    <span>希望勤務地　<Conma Array={engineerInfo.workAt} /></span>
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Link to={`/profile/${engineerInfo.engineerId}/`}>
                                    <button
                                        className='px-5 py-1 text-white duration-300 bg-orange-500 rounded hover:bg-orange-300'
                                    >
                                        詳細
                                    </button>
                                </Link>
                                {onFavorite[index] ?
                                <div
                                    className='p-3 mt-3 border-2 rounded-full'
                                    onClick={() => console.log("test")}
                                >
                                    <FavoriteIcon
                                        className=''
                                    />
                                </div>
                                :
                                <div
                                    className='p-3 mt-3 text-white duration-300 bg-gray-800 rounded-full hover:bg-gray-600'
                                    onClick={() => console.log("test")}
                                >
                                    <FavoriteIcon
                                        className=''
                                    />
                                </div>}
                            </div>
                        </div>
                ))
                :
                <>
                    {showFavoritedUser ?<span className='py-5 mt-32'>あなたのお気に入りのエンジニアを見つけられませんでした</span> :<span className='py-5 mt-32'>あなたにお気に入りをつけたエンジニアを見つけられませんでした</span>}
                </>}
            </ul>
        </div>
    )
}

export default FavoriteMain
