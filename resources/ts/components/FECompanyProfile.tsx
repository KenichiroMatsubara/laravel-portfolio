import React, { FC, useState } from 'react'
import type { companyProfile } from '../types/companyProfile'
import Conma from './Conma'
import { FECompanyProfileProps } from '../types/fECompanyPorfileProps'
import Chat from './Chat'
import FEChat from './FEChat'

const FECompanyProfile: FC<FECompanyProfileProps> = ({companyId,onAnyModals,setOnAnyModals}) => {

    const [onModal,setOnModal] = useState<boolean>(false);
    //このチャットが開いているかどうかを管理する

    const [companyProfileData,setCompanyProfileData] = useState<companyProfile>({
        name: "matsubaraJapan",
        homepage: "https://www.triple-e.inc/",
        address: "愛知県岡崎市山綱町",
        phoneNumber: "123-4567-8901",
        usedStacks: ["php","laravel","aws","docker","github","react","vue"],
        jobDescription: "バックエンドエンジニアとフロントエンドエンジニアを募集しています。",
        imgURL: 'https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
    })

    const handleWatchChat = () => {
        if(onAnyModals==true) return;//どれかチャットが一つでも開いていたらボタンが発動しないようにする
        else {
            setOnModal(true);
            setOnAnyModals(true);
        }
    }

    return (
        <div className='mt-5 border-b p-3'>
            <div className='flex items-center justify-between pr-10'>
                <img
                    src={companyProfileData.imgURL}
                    alt=""
                    className='w-16 h-16'
                />
                <div className='flex flex-col'>
                    <span className='text-xl font-bold'>{companyProfileData.name}</span>
                    <a href={companyProfileData.homepage} className='text-xs text-blue-500 hover:text-blue-300 duration-300 cursor-pointer'>ホームページ</a>
                    <span className='text-xs'>{companyProfileData.phoneNumber}</span>
                    <span className='text-xs'>{companyProfileData.address}</span>
                </div>
                <div className='flex flex-col'>
                    <span>使用技術</span>
                    <Conma Array={companyProfileData.usedStacks} />
                </div>
                <button
                    onClick={() => handleWatchChat()}
                    className='text-white bg-orange-500 hover:bg-orange-300 duration-300 py-2 px-5 rounded'
                >
                    チャットを見る
                </button>
                {onAnyModals && onModal && <FEChat engineerId={1} companyId={companyId} setOnModal={setOnModal} setOnAnyModals={setOnAnyModals} />}
            </div>
        </div>
    )
}

export default FECompanyProfile
