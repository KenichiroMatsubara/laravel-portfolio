import React, { FormEvent, FormEventHandler, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { companyProfile } from '../types/companyProfile'
import type { Stacks } from '../types/stacks';
import { BaseURLContext } from '../app';
import { useUserContext } from '../UserContext';
import MultiInputFiled from '../components/MultiInputFiled';
import { useNavigate } from 'react-router-dom';


const EditHome = () => {
    const baseURL:string = useContext(BaseURLContext);
    const { userContext: { userType,id,token,state } } = useUserContext();
    const navigate = useNavigate();

    const [stacks,setStacks] = useState<string[]>([]);
    const [name,setName] = useState<string>("");
    const [explain,setExplain] = useState<string>("");
    const [address,setAddress] = useState<string>("");
    const [homepageURL,setHomepageURL] = useState<string>("");
    const [image,setImage] = useState<any>();

    const handleSubmit = async() => {
        const file = new FormData();
        // file.append("image",image[0]);
        const sendData = {
            "id": id,
            "name": name,
            "address": address,
            "explain": explain,
            "homepageURL": homepageURL,
            "stacks": stacks,
        }
        console.log(sendData);
        try {
            const response = await axios.post(`${baseURL}/api/update_company_account`,sendData);
            console.log(response.data)
            navigate(``);
        } catch (error) {
            console.log(error);
        }
    }


    const handleChangeStacks = (key:string) => {
        const newStacks = {...stacks};
        newStacks[key] = !newStacks[key];
        setStacks(newStacks);
    }

    useEffect(() => {
        const getCompanyProfile = async() => {
            const sendData = {
                id: id
            };
            try {
                const response = await axios.post(`${baseURL}/api/get_company_info`,sendData);
                if(response.data.company_profile){
                    setName(response.data.company_profile.name ? response.data.company_profile.name : "");
                    setExplain(response.data.company_profile.explain ? response.data.company_profile.explain : "");
                    setAddress(response.data.company_profile.address ? response.data.company_profile.address : "");
                    setHomepageURL(response.data.company_profile.homepageURL ? response.data.company_profile.homepageURL : "");
                }
                const newStacks: string[] = [];
                response.data.company_using_stacks.forEach((stack) => {
                    newStacks.push(stack.stack);
                })
                setStacks(newStacks);
                console.log(response.data);
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }
        getCompanyProfile()
    },[]);

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex flex-col w-9/12 m-5'>
                <span className='mb-8 text-3xl text-orange-600 underline'>プロフィールを編集する</span>
                <div className='flex flex-col'>
                    <span className='text-2xl'>会社名</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>仕事内容</span>
                    <textarea
                        rows={10}
                        cols={60}
                        className="h-64 p-2 my-2 border border-gray-500 rounded"
                        value={explain}
                        onChange={(e) => setExplain(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>住所</span>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>会社のURL</span>
                    <input
                        type="text"
                        value={homepageURL}
                        onChange={(e) => setHomepageURL(e.target.value)}
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>使用技術一覧</span>
                    <span>例　Python,django,xserver,aws,react,nextjs,laravel,php等</span>
                    <MultiInputFiled array={stacks} setArray={setStacks} placeholder={"使用技術"} />
                </div>
                <div>
                    <input accept="image/*" multiple type="file" onChange={(e) => setImage(e.target.value)} />
                </div>
                <button
                    className='w-32 p-2 mt-5 text-white duration-300 bg-orange-600 rounded hover:bg-orange-400'
                    onClick={() => handleSubmit()}
                >
                    送信
                </button>
            </div>
        </div>
    )
}

export default EditHome
