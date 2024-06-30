import React, { FormEventHandler, useState } from 'react'
import FESidebar from '../components/FESidebar';
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


const FEMakeNew = () => {
    const [stacks,setStacks] = useState<Stacks>(initStacks);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const title: FormDataEntryValue = form.get("title") || "";
        const explain: FormDataEntryValue = form.get("explain") || "";
        const githubURL: FormDataEntryValue = form.get("githubURL") || "";
        const deployURL: FormDataEntryValue = form.get("deployURL") || "";

    }

    return (
        <div className='flex'>
            <FESidebar />
            <form className='flex flex-col w-9/12 m-5'>
                <span className='mb-8 text-3xl text-orange-600 underline'>新しく制作物を追加する</span>
                <div className='flex flex-col'>
                    <span className='text-2xl'>タイトル</span>
                    <input
                        type="text"
                        name='title'
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
                                        onChange={() => {
                                            const newStacks = {...stacks};
                                            newStacks[key] = !newStacks[key];
                                            setStacks(newStacks);
                                        }}
                                        className='w-5 h-5 p-1 border rounded'
                                    />
                                </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>機能の説明</span>
                    <textarea
                        rows={10}
                        cols={60}
                        className="h-64 p-2 my-2 border border-gray-500 rounded"
                        name='explain'
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>githubのURL</span>
                    <input
                        type="text"
                        name='githubURL'
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>デプロイ先のURL</span>
                    <input
                        type="text"
                        name='deployURL'
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <button
                    className='w-32 p-2 mt-5 text-white duration-300 bg-orange-600 rounded hover:bg-orange-400'
                >
                    送信
                </button>
            </form>
        </div>
    )
}

export default FEMakeNew
