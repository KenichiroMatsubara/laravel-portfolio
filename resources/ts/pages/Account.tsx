import React from 'react'
import { Link } from 'react-router-dom'

const Account = () => {
    return (
        <div className='flex'>
            <div className='w-1/2 flex flex-col items-center justify-center'>
                <Link to={"/account/"}>
                    <span className='text-3xl font-bold text-amber-700'>DUCTION</span>
                </Link>
                <span className='text-xl font-bold mt-10'>市場価値を楽に伝える</span>
            </div>
            <div className='flex flex-col w-1/2 items-center justify-center px-10 py-28 border m-16 rounded-3xl bg-orange-200'>
                <span className=' text-xl font-bold'>あなたは</span>
                <Link to={"/account/signin_for_company/"}>
                    <span className='mt-5 text-xl font-bold text-orange-500 cursor-pointer hover:text-orange-300 duration-300'>
                        採用担当者ですか？
                    </span>
                </Link>
                <span className='mt-2 text-xl font-bold'>or</span>
                <Link to={"/account/signin_for_engineer/"}>
                    <span className='mt-2 text-xl font-bold text-red-500 cursor-pointer hover:text-red-300 duration-300'>
                        エンジニアですか？
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Account
