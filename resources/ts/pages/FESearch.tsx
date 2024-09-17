import React, { FC, useContext, useEffect, useState } from 'react'
import FESidebar from '../components/FESidebar'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Company } from '../types/company';
import Conma from '../components/Conma';
import axios from 'axios';
import { BaseURLContext } from '../app';
import { useUserContext } from '../UserContext';

export const sampleCompanyData: Company = {
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
    const [companies,setCompanies] = useState<Company[]>([]);
    const [onFavorites,setOnFavorites] = useState<boolean[]>([false,false]);
    useEffect(() => {
        const searchCompanies = async() => {
            if(searchInput.trim()===""){
                console.log("search_input is blank");
                setCompanies([]);
                setOnFavorites([]);
                return;
            }
            const sendData = {
                "engineer_id": id,
                "search_input":searchInput
            };
            try {
                const response = await axios.post(`${baseURL}/api/search_companies`,sendData);
                console.log(response.data.companies);
                const newCompanies: Company[] = [];
                const newOnFavorites: boolean[] = [];
                response.data.companies.forEach((company, index)=> {
                    const newStacks: string[] = [];
                    company.using_stacks.forEach((stack) => {
                        newStacks.push(stack.stack);
                    })
                    if(company.profile){
                        const newCompany: Company = {
                            company_id: company.id,
                            name: company.profile.name ? company.profile.name : "未設定",
                            explain: company.profile.explain ? company.profile.explain: "未設定",
                            stacks: newStacks,
                            homepageURL: company.profile.homepageURL ? company.profile.homepageURL : "",
                            address: company.profile.address ? company.profile.address : "未設定",
                            imgURL: company.profile.imgURL ? company.profile.imgURL : "未設定",
                        };
                        newCompanies.push(newCompany);
                        newOnFavorites.push(company.favorited);
                    }
                    else {
                        const newCompany: Company = {
                            company_id: company.id,
                            name: "未設定",
                            explain: "未設定",
                            stacks: newStacks,
                            homepageURL: "",
                            address: "未設定",
                            imgURL: "未設定",
                        };
                        newCompanies.push(newCompany);
                        newOnFavorites.push(company.favorited);
                    }
                });
                setCompanies(newCompanies);
                setOnFavorites(newOnFavorites);
            } catch (error) {
                console.log(error);
                setCompanies([]);
                setOnFavorites([]);
            }
        };
        searchCompanies();
    },[searchInput]);

    const handleOnFavorite = async(company_id: number,index: number) => {
        const sendData = {
            "company_id": company_id,
            "engineer_id": id,
            "type": "e_to_c"
        }
        try {
            const response = await axios.post(`${baseURL}/api/create_favorite`,sendData);
            const newOnFavorites = [...onFavorites];
            newOnFavorites[index] = true;
            setOnFavorites(newOnFavorites);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOffFavorite = async(company_id:number,index:number) => {
        const sendData = {
            "company_id": company_id,
            "engineer_id": id,
            "type": "e_to_c"
        }
        console.log(sendData);
        try {
            const response = await axios.post(`${baseURL}/api/destroy_favorite`,sendData);
            const newOnFavorites = [...onFavorites];
            newOnFavorites[index] = false;
            setOnFavorites(newOnFavorites);
            console.log(response.data)
        } catch (error) {
            console.log(error);
            console.log(error.response);
            if(error.response.data.result===true && error.response.data.message==="the favorite was not found!"){
                const newOnFavorites = [...onFavorites];
                newOnFavorites[index] = false;
                setOnFavorites(newOnFavorites);
            }
        }
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
                <div className='mx-10 mt-5'>
                    {companies.length>0 ? companies.map((company:Company,index:number) => (
                        <div className='border-b pl-4 pr-8 py-4 flex items-center justify-between' key={index}>
                            <div className='flex gap-5'>
                                <div className='flex flex-col gap-3 items-center w-36'>
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
                                    className='text-red-400'
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
                    )):
                        <div>
                            該当する会社はありませんでした
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FESearch
