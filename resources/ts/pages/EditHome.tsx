import React, { FormEvent, FormEventHandler, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import { companyProfile } from '../types/companyProfile'
import type { Stacks } from '../types/stacks';
import { BaseURLContext } from '../app';
import { useUserContext } from '../UserContext';
import MultiInputFiled from '../components/MultiInputFiled';


const EditHome = () => {
    const baseURL:string = useContext(BaseURLContext);
    const { userContext: { userType,id,token,state } } = useUserContext();

    const [stacks,setStacks] = useState<string[]>([]);
    const [name,setName] = useState<string>("");
    const [explain,setExplain] = useState<string>("");
    const [address,setAddress] = useState<string>("");
    const [homepageURL,setHomepageURL] = useState<string>("");
    const [img,setImg] = useState<any>();

    const sampleProfileData:companyProfile = {
        name: "matsubaraJapan",
        homepageURL: "https://www.triple-e.inc/",
        address: "愛知県岡崎市山綱町",
        usedStacks: ["php","laravel","aws","docker","github","react","vue"],
        explain: "バックエンドエンジニアとフロントエンドエンジニアを募集しています。",
        imgURL: 'https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();
        const file:FormData = new FormData();
        file.append("img",img[0]);
        console.log({name,explain,address,homepageURL,file});
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
                console.log(response.data);
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
                        name='name'
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>仕事内容</span>
                    <textarea
                        rows={10}
                        cols={60}
                        className="h-64 p-2 my-2 border border-gray-500 rounded"
                        name='explain'
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>住所</span>
                    <input
                        type="text"
                        name='githubURL'
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>会社のURL</span>
                    <input
                        type="text"
                        name='deployURL'
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>使用技術一覧</span>
                    <span>例　Python,django,xserver,aws,react,nextjs,laravel,php等</span>
                    <MultiInputFiled array={stacks} setArray={setStacks} placeholder={"使用技術"} />
                </div>
                <div>
                    <input accept="image/*" multiple type="file" onChange={(e) => setImg(e.target.value)} />
                </div>
                <input
                    type='submit'
                    value="送信"
                    className='w-32 p-2 mt-5 text-white duration-300 bg-orange-600 rounded hover:bg-orange-400'
                />
            </div>
        </div>
    )
}

export default EditHome
