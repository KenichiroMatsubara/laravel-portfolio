import React, { FormEvent, FormEventHandler, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { companyProfile } from '../types/companyProfile'
import type { Stacks } from '../types/stacks';

const initStacks = {
    php: false,
    laravel: false,
    javascript: false,
    typescript: false,
    nodejs: false,
    reactjs: false,
    vuejs: false,
    python: false,
    django: false,
    nextjs: false,
}

const EditHome = () => {
    const [stacks,setStacks] = useState<Stacks>(initStacks);
    const [imgTitle,setImgTitle] = useState<string>();
    const [img,setImg] = useState<any>();

    const sampleProfileData:companyProfile = {
        name: "matsubaraJapan",
        homepage: "https://www.triple-e.inc/",
        address: "愛知県岡崎市山綱町",
        phoneNumber: "123-4567-8901",
        usedStacks: ["php","laravel","aws","docker","github","react","vue"],
        jobDescription: "バックエンドエンジニアとフロントエンドエンジニアを募集しています。",
        imgURL: 'https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const title: FormDataEntryValue = form.get("title") || "";
        const explain: FormDataEntryValue = form.get("explain") || "";
        const githubURL: FormDataEntryValue = form.get("githubURL") || "";
        const deployURL: FormDataEntryValue = form.get("deployURL") || "";
        const file:FormData = new FormData();
        file.append("title",imgTitle || "");
        file.append("img",img[0]);
    }


    const handleChangeStacks = (key:string) => {
        const newStacks = {...stacks};
        newStacks[key] = !newStacks[key];
        setStacks(newStacks);
    }

    return (
        <div className='flex'>
            <Sidebar />
            <form className='flex flex-col w-9/12 m-5' onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                <span className='mb-8 text-3xl text-orange-600 underline'>プロフィールを編集する</span>
                <div className='flex flex-col'>
                    <span className='text-2xl'>会社名</span>
                    <input
                        type="text"
                        name='title'
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
                    <div className='grid grid-cols-2 my-2 sm:grid-cols-5 lg:grid-cols-8'>
                        {Object.keys(stacks).map((key) =>(
                                <div key={key} className='flex items-center px-2 text-center'>
                                    <span className='mr-2 font-bold'>{key}</span>
                                    <input
                                        type="checkbox"
                                        checked={stacks[key]}
                                        onChange={() => handleChangeStacks(key)}
                                        className='w-5 h-5 p-1 border rounded'
                                    />
                                </div>
                        ))}
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="写真のタイトル" onChange={(e) => setImgTitle(e.target.value)} />
                    <input accept="image/*" multiple type="file" onChange={(e) => setImg(e.target.value)} />
                </div>
                <input
                    type='submit'
                    value="送信"
                    className='w-32 p-2 mt-5 text-white duration-300 bg-orange-600 rounded hover:bg-orange-400'
                />
            </form>
        </div>
    )
}

export default EditHome
