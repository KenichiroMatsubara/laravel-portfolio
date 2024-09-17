import React, { useContext, useEffect, useState } from 'react'
import type { companyProfile } from '../types/companyProfile'
import Conma from './Conma'
import { Link } from 'react-router-dom'
import { Company } from '../types/company'
import { BaseURLContext } from '../app'
import { useUserContext } from '../UserContext'
import axios from 'axios'

const HomeMain = () => {
    const baseURL:string = useContext(BaseURLContext);
    const { userContext: { userType,id,token,state } } = useUserContext();
    const initCompany:Company = {
        company_id: id,
        name: "読込中",
        explain: "未設定",
        stacks: [],
        address: "未設定",
        homepageURL: "未設定",
        imgURL: "未設定"
    };
    const [company,setCompany] = useState<Company>(initCompany);

    useEffect(() => {
        const getCompany = async() => {
            const sendData = {
                id: id,
            }
            try {
                const response = await axios.post(`${baseURL}/api/get_company_info`,sendData);
                console.log(response);
                const newCompany:Company = {...initCompany};
                if(response.data.company_profile){
                    newCompany.name=response.data.company_profile.name || "未設定";
                    newCompany.explain=response.data.company_profile.explain || "未設定";
                    newCompany.address=response.data.company_profile.address || "未設定";
                    newCompany.homepageURL=response.data.company_profile.homepageURL || "未設定";
                    newCompany.imgURL=response.data.company_profile.imgURL || "未設定";
                    console.log(newCompany);
                }
                response.data.company_using_stacks.forEach((stack) => {
                    newCompany.stacks.push(stack.stack);
                });
                console.log("object");
                setCompany(newCompany);
                console.log(company);
            } catch (error) {
                console.log(error);
            }
        }
        getCompany();
    },[]);

    return (
        <div className='flex w-9/12 m-10'>
            <div className='flex flex-col w-1/2 mr-5'>
                <span className='text-3xl text-orange-500 underline'>{company.name}</span>
                <span className='mt-5'>{company.address}</span>
                <span className='mt-5'>仕事内容</span>
                <span className=''>{company.explain}</span>
                <span className='mt-5'>使用技術</span>
                <Conma Array={company.stacks} />
                <a
                    href={company.homepageURL}
                    className='mt-5 text-blue-500 duration-300 hover:text-blue-300'
                >
                    ホームページを見る
                </a>
                <Link to={`/edit_home/`}>
                    <button className='w-40 p-2 mt-2 text-white duration-300 bg-blue-500 rounded hover:bg-blue-300'>
                        プロフィールを編集する
                    </button>
                </Link>
            </div>
            <img src={company.imgURL} alt="" className='w-1/2' />

        </div>
    )
}

export default HomeMain
