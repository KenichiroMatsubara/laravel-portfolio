import React, { useContext, useEffect, useState } from 'react'
import FESidebar from '../components/FESidebar'
import { Company } from '../types/company';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Conma from '../components/Conma';
import axios from 'axios';
import { BaseURLContext } from '../app';
import { useUserContext } from '../UserContext';
import Chat from '../components/Chat';

const FECompanyProfiles = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const baseURL:string = useContext(BaseURLContext);

    const [companies, setCompanies] = useState<Company[]>([]);
    const [onModal, setOnModal] = useState<boolean>(false);
    const [onFavorites, setOnFavorites] = useState<boolean[]>([]);
    const [stacksGroup,setStacksGroup] = useState<string[][]>([]);
    const [showFavoritedUser,setShowFavoritedUser] = useState<boolean>(true);
    const [companyId,setCompanyId] = useState<number>(0);

    useEffect(() => {
        // お気に入りに登録した会社を返す
        const getFavoritedCompany = async() => {
            const sendData = {
                "engineer_id": id,
            };
            try {
                const response = await axios.post(`${baseURL}/api/get_engineer_favorited_company_info`,sendData);
                console.log(response);
                const newCompanies: Company[] = [];
                const newOnFavorites: boolean[] = [];
                const newStacksGroup: string[][] = [];
                response.data.companies.forEach((company, index)=> {
                    const newStacks: string[] = [];
                    company.using_stacks.forEach((stack) => {
                        newStacks.push(stack.stack);
                    })
                    newStacksGroup.push(newStacks);
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
                        newOnFavorites.push(true);
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
                        newOnFavorites.push(true);
                    }
                });
                setCompanies(newCompanies);
                setOnFavorites(newOnFavorites);
                setStacksGroup(newStacksGroup);
            } catch (error) {
                console.log(error);
            }
        };
        // お気に入りに登録してくれた会社を返す
        const getFavoritedByCompany = async() => {
            const sendData = {
                "engineer_id": id,
            };
            try {
                const response = await axios.post(`${baseURL}/api/get_engineer_favorited_by_company_info`,sendData);
                console.log(response.data);
                const newCompanies: Company[] = [];
                const newOnFavorites: boolean[] = [];
                const newStacksGroup: string[][] = [];
                response.data.companies.forEach((company, index)=> {
                    const newStacks: string[] = [];
                    company.using_stacks.forEach((stack) => {
                        newStacks.push(stack.stack);
                    })
                    newStacksGroup.push(newStacks);
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
                        newOnFavorites.push(company.engineer_favorited);
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
                        newOnFavorites.push(company.engineer_favorited);
                    }
                });
                setCompanies(newCompanies);
                setOnFavorites(newOnFavorites);
                setStacksGroup(newStacksGroup);
                console.log(newStacksGroup);
            } catch (error) {
                console.log(error);
            }
        };
        if(showFavoritedUser===true){
            getFavoritedCompany();
        }
        else {
            getFavoritedByCompany();
        }
    },[showFavoritedUser]);

    const handleOnFavorite = async(company_id: number,index: number) => {
        if(onModal){
            return;
        }
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
        if(onModal){
            return;
        }
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

    const handleOnModal = (companyId:number) => {
        if(onModal) {
            return;
        }
        setCompanyId(companyId);
        setOnModal(true);
    };
    // 一つでもチャットがあったらほかのチャットを開かないようにする
    return (
        <div className='flex'>
            <FESidebar />
            <div className='w-9/12 mx-10'>
                <div className='flex gap-5 my-5'>
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
                {onModal && <Chat engineerId={id} companyId={companyId} setOnModal={setOnModal} />}
                {companies.length ? companies.map((company:Company,index:number) => (
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
                                <Conma Array={stacksGroup[index]} />
                                <a href={company.homepageURL}
                                    className='text-sm font-light text-blue-500 hover:text-blue-300 duration-300'
                                >
                                    ホームページを見る
                                </a>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
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
                            <button
                                className='text-white bg-orange-500 hover:bg-orange-300 duration-300 py-2 px-3 rounded'
                                onClick={() => handleOnModal(company.company_id)}
                            >
                                チャットを見る
                            </button>
                        </div>
                    </div>
                )):
                    <div>
                        該当する会社はありませんでした
                    </div>
                }
            </div>
        </div>
    )
}

export default FECompanyProfiles
