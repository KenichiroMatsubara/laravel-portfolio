import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Conma from './Conma';
import type { EngineerInfo } from '../types/engineerInfo';
import Searchbar from './Searchbar';
import { BaseURLContext } from '../app';
import axios from 'axios';
import { useUserContext } from '../UserContext';

const SearchMain = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const baseURL: string = useContext(BaseURLContext);
    const [onFavorite,setOnFavorite] = useState<boolean[]>([]);
    const [engineerInfos,setEngineerInfos] = useState<EngineerInfo[]>([]);
    const [searchKey,setSearchKey] = useState<string>("");
    const [searchInput,setSearchInput] = useState<string>("");

    // エンジニア検索機能
    useEffect(() => {
        const sendData = {
            "search_key": searchKey,
            "search_input": searchInput,
        };
        try {
            const response = axios.post(`${baseURL}/api/`);
        } catch (error) {
            console.log(error);
        }
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
            <ul className='h-full'>
                {engineerInfos.map((engineerInfo: EngineerInfo) => (
                    <Link to={`/profile/${engineerInfo.engineerId}`}>
                        <li className='flex items-center py-5 duration-300 border-b border-orange-300 hover:bg-orange-100'>
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
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default SearchMain
