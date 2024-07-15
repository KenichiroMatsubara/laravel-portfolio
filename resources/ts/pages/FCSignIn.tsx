import React, { FormEventHandler, useState } from 'react'
import { Link } from 'react-router-dom';

const FCSignIn = () => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
    }

    const [autoLogin,setAutoLogin] = useState<boolean>(false);

    return (
        <div className='flex'>
            <div className='w-1/2 flex flex-col items-center justify-center'>
                <Link to={"/account/"}>
                    <span className='text-3xl font-bold text-amber-700'>DUCTION</span>
                </Link>
                <span className='text-xl font-bold mt-10'>市場価値を楽に伝える</span>
            </div>
            <div className='flex flex-col w-1/2 items-center justify-center px-10 py-16 border m-16 rounded-3xl bg-orange-100'>
                <span className='text-xl font-bold mb-5'>採用担当者</span>
                <form onSubmit={handleSubmit} className='flex flex-col mb-5'>
                    <input
                        type="text"
                        name='email'
                        placeholder='email'
                        className='py-1 px-2 rounded mb-5'
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='password'
                        className='py-1 px-2 rounded mb-5'
                    />
                    <input
                        type="submit"
                        value={"ログイン"}
                        className='font-bold bg-orange-500 hover:bg-orange-300 duration-300 text-white py-1 px-3 rounded'
                    />
                </form>
                <div className='flex items-center mb-2'>
                    <span>次回から自動ログイン</span>
                    <input
                        type="checkbox"
                        checked={autoLogin}
                        onChange={() => setAutoLogin(!autoLogin)}
                        className='h-4 w-4 ml-2'
                    />
                </div>
                <Link to={"/account/register_for_company/"}>
                    <span className='font-bold text-gray-900 cursor-pointer hover:text-gray-500 duration-300'>
                        新規登録はこちらから
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default FCSignIn
