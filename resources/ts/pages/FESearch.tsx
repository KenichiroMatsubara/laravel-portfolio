import React, { FC, useContext, useEffect, useState } from 'react'
import FESidebar from '../components/FESidebar'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Company } from '../types/company';
import Conma from '../components/Conma';
import axios from 'axios';
import { BaseURLContext } from '../app';
import { useUserContext } from '../UserContext';

const sampleCompanyData: Company = {
    company_id: 1,
    name: "松原inovative",
    explain: "バックエンドエンジニアを募集しています。Laravel,reactをできるプログラマーを募集しています。",
    stacks: ["laravel","react","symfony","php"],
    address: "愛知県岡崎市XX町",
    imgURL: "https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png",
    homepageURL: "https://www.nagoya-u.ac.jp/"
};

const FESearch: FC = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const baseURL:string = useContext(BaseURLContext);

    const [searchInput,setSearchInput] = useState<string>("");
    const [companies,setCompanies] = useState<Company[]>([sampleCompanyData,sampleCompanyData]);
    const [onFavorites,setOnFavorites] = useState<boolean[]>([false,false]);
    useEffect(() => {
        const searchCompany = async() => {
            try {
                const sendData = {
                    "engineer_id": id,
                    "search_input":searchInput
                };
                const response = await axios.post(`${baseURL}/search_companies`,sendData);
            } catch (error) {
                console.log(error);
            }
        };
    },[searchInput]);

    const handleOnFavorite = async(company_id: number,index: number) => {
        const newOnFavorites = [...onFavorites];
        console.log(newOnFavorites);
        newOnFavorites[index] = true;
        setOnFavorites(newOnFavorites);
    };
    const handleOffFavorite = async(company_id:number,index:number) => {
        const newOnFavorites = [...onFavorites];
        newOnFavorites[index] = false;
        setOnFavorites(newOnFavorites);
    };

    return (
        <div className='flex'>
            <FESidebar />
            <div className='flex flex-col w-full'>
                <div className='bg-orange-300 py-3 px-5 w-full'>
                    <div className='w-full bg-orange-50 py-2 rounded-full'>
                        <input type="text" className='ml-7 bg-transparent outline-none w-10/12'
                            value={searchInput}
                            placeholder='検索したいことを入力'
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <SearchIcon className='' />
                    </div>
                </div>
                <div>
                    {companies.map((company:Company,index:number) => (
                        <div className='border-b pl-4 pr-8 py-4 flex items-center justify-between' key={index}>
                            <div className='flex gap-5'>
                                <div className='flex flex-col gap-3 items-center'>
                                    <img src={company.imgURL} alt=""
                                        className='rounded-full w-20 h-20'
                                    />
                                    <span>{company.name}</span>
                                </div>
                                <div className='flex flex-col items-start break-words gap-1'>
                                    <span className=''>{company.explain}</span>
                                    <span className=''>使用技術</span>
                                    <Conma Array={company.stacks} />
                                    <a href={company.homepageURL}
                                        className='text-sm font-light text-blue-500 hover:text-blue-300 duration-300'
                                    >
                                        ホームページを見る
                                    </a>
                                </div>
                            </div>
                            {onFavorites[index]===true ?
                            <div className='p-3 rounded-full hover:bg-gray-200 duration-300'>
                                <FavoriteIcon
                                    className='text-red-300'
                                    fontSize='large'
                                    onClick={() => handleOffFavorite(company.company_id,index)}
                                />
                            </div>
                            :
                            <div className='p-3 rounded-full hover:bg-gray-200 duration-300'>
                                <FavoriteIcon
                                    className=' stroke-black stroke-1 text-white'
                                    fontSize='large'
                                    onClick={() => handleOnFavorite(company.company_id,index)}
                                />
                            </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FESearch
