import React from 'react'
import type { companyProfile } from '../types/companyProfile'
import Conma from './Conma'
import { Link } from 'react-router-dom'

const HomeMain = () => {
    const sampleProfileData:companyProfile = {
        name: "matsubaraJapan",
        homepage: "https://www.triple-e.inc/",
        address: "愛知県岡崎市山綱町",
        phoneNumber: "123-4567-8901",
        usedStacks: ["php","laravel","aws","docker","github","react","vue"],
        jobDescription: "バックエンドエンジニアとフロントエンドエンジニアを募集しています。",
        imgURL: 'https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
    }
    return (
        <div className='flex w-9/12 m-10'>
            <div className='flex flex-col w-1/2 mr-5'>
                <span className='text-3xl text-orange-500 underline'>{sampleProfileData.name}</span>
                <span className='mt-5'>{sampleProfileData.address}</span>
                <span className='mt-5'>仕事内容</span>
                <span className=''>{sampleProfileData.jobDescription}</span>
                <span className='mt-5'>使用技術</span>
                <Conma Array={sampleProfileData.usedStacks} />
                <a
                    href={sampleProfileData.homepage}
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
            <img src={sampleProfileData.imgURL} alt="" className='w-1/2' />

        </div>
    )
}

export default HomeMain
