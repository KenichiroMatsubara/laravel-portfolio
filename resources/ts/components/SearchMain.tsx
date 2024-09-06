import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Conma from './Conma';
import type { EngineerInfo } from '../types/engineerInfo';
import Searchbar from './Searchbar';
import { BaseURLContext } from '../app';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import FavoriteIcon from '@mui/icons-material/Favorite';


const SearchMain = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const baseURL: string = useContext(BaseURLContext);
    const [onFavorite,setOnFavorite] = useState<boolean[]>([]);
    const [engineerInfos,setEngineerInfos] = useState<EngineerInfo[]>([]);
    const [searchKey,setSearchKey] = useState<string>("");
    const [searchInput,setSearchInput] = useState<string>("");

    // エンジニア検索機能
    useEffect(() => {
        const searchEngineer = async() => {
            if(searchInput === "") {
                return;
            }
            const sendData = {
                "search_key": searchKey==="" ? "all" : searchKey,
                "search_input": searchInput,
                "company_id": id,
            };
            console.log(sendData);
            try {
                const response = await axios.post(`${baseURL}/api/search_engineers`,sendData);
                console.log(response);
                const newEngineerInfos:EngineerInfo[] = [];
                const newOnFaovirted:boolean[] = [];
                console.log(response.data.engineer_infos);
                response.data.engineer_infos.forEach((engineer_info)=>{
                    console.log(engineer_info)
                    const newEngineerInfo:EngineerInfo = {
                        engineerName: engineer_info.profile ? engineer_info.profile.name:"未設定",
                        engineerId: engineer_info.id,
                        engieerExperience: engineer_info.profile ? engineer_info.profile.work_experience:0,
                        favoriteLangs: [],
                        workAts :[],
                        profileImg: ""
                    };
                    engineer_info.using_stacks.forEach(using_stack => {
                        newEngineerInfo.favoriteLangs.push(using_stack.stack);
                    });
                    engineer_info.want_work_ats.forEach(want_work_at => {
                        newEngineerInfo.workAts.push(want_work_at.place);
                    });
                    if(newEngineerInfo.favoriteLangs.length===0){
                        newEngineerInfo.favoriteLangs=["未設定"]
                    }
                    if(newEngineerInfo.workAts.length===0){
                        newEngineerInfo.workAts=["未設定"]
                    }
                    newOnFaovirted.push(engineer_info.favorited);
                    newEngineerInfos.push(newEngineerInfo);
                });
                setOnFavorite(newOnFaovirted);
                setEngineerInfos(newEngineerInfos);
            } catch (error) {
                console.log(error);
            }
        };
        searchEngineer();
    },[searchKey,searchInput]);

    const handleOnFavorite = async(engineer_id: number,index:number) => {
        const sendData = {
            "company_id":id,
            "engineer_id":engineer_id,
            "type":"c_to_e",
        };
        try {
            const response = await axios.post(`${baseURL}/api/create_favorite`,sendData);
            const newOnFavorite = [...onFavorite];
            newOnFavorite[index] = true;
            setOnFavorite(newOnFavorite);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOffFavorite = async(engineer_id: number,index:number) => {
        const sendData = {
            "company_id":id,
            "engineer_id":engineer_id,
            "type":"c_to_e"
        };
        try {
            const response = await axios.post(`${baseURL}/api/create_favorite`,sendData);
            const newOnFavorite = [...onFavorite];
            newOnFavorite[index] = false;
            setOnFavorite(newOnFavorite);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col w-9/12 pt-5 pl-3'>
            <span className='mb-2 text-3xl font-bold'>エンジニアを探す</span>
            <Searchbar searchKey={searchKey} setSearchKey={setSearchKey} searchInput={searchInput} setSearchInput={setSearchInput} />
            {engineerInfos!==undefined && engineerInfos.length!==0 ? engineerInfos.map((engineerInfo: EngineerInfo,index) => (
                    <div className='flex items-center justify-between py-5 duration-300 border-b border-orange-300' key={index}>
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
                                <span>希望勤務地　<Conma Array={engineerInfo.workAts} /></span>
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
                                className='p-3 mt-3 text-white bg-red-400 rounded-full'
                                onClick={() => handleOffFavorite(engineerInfo.engineerId,index)}
                            >
                                <FavoriteIcon
                                    className=''
                                />
                            </div>
                            :
                            <div
                                className='p-3 mt-3 text-gray-800 duration-300 rounded-full hover:text-gray-400'
                                onClick={() => handleOnFavorite(engineerInfo.engineerId,index)}
                            >
                                <FavoriteIcon
                                    className=''
                                />
                            </div>}
                        </div>
                    </div>
                ))
                :
                <span className='py-3'>
                    該当者なし
                </span>
                }
        </div>
    )
}

export default SearchMain
