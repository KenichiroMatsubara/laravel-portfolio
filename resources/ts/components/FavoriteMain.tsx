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
    const [engineerInfos,setEngineerInfos] = useState<EngineerInfo[]>([
        {
            engineerName: name1,
            engineerId: 1,
            engieerExperience: 0,
            favoriteLangs: ["php","laravel","react","nodejs"],
            workAt: ["愛知県","東京都"],
            profileImg: "https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png"
        },
        {
            engineerName: name2,
            engineerId: 2,
            engieerExperience: 10,
            favoriteLangs: ["php","laravel","react","nodejs"],
            workAt: ["愛知県","東京都"],
            profileImg: "https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png"
        },
    ]);

    useEffect(() => {
        const getFavoritedEngineer = async () => {
            const sendData = {
                "company_id":id
            }
            console.log({sendData});
            try {
                const response = await axios.post(`${baseURL}/api/get_company_favorited_engineer_info`,sendData);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
    },[]);

    const handleOnFavorite = async(index) => {
        const newOnFavorite = [...onFavorite];
        newOnFavorite[index] = true;
        setOnFavorite(newOnFavorite);
        const sendData = {"company_id":id};
        try {
            const response = await axios.post(`${baseURL}/api/get_company_favorited_engineer_info`,sendData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col w-9/12'>
            <ul className='h-full'>
                {engineerInfos.map((engineerInfo: EngineerInfo,index) => (
                        <div className='flex items-center justify-between px-10 py-5 duration-300 border-b border-orange-300'>
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
                                <Link to={`/profile/${engineerInfo.engineerName}`}>
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
                ))}
            </ul>
        </div>
    )
}

export default FavoriteMain
