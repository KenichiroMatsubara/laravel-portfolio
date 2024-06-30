import React from 'react'
import { Link } from 'react-router-dom';
import Conma from './Conma';

export interface EngineerInfo {
    engineerName: string,
    engineerId: number,
    engieerExperience: number,
    favoriteLangs: string[],
    workAt: string[],
    profileImg: string,
}

const SearchMain = () => {
    const year: number = 0;
    const name1: string = "名前1";
    const name2: string = "名前2";
    const langs: string[] = ["php","laravel","react","typescript","nodejs"]
    const places: string[] = ["愛知県"];
    const engineerInfos: EngineerInfo[] = [
        {
            engineerName: name1,
            engineerId: 1,
            engieerExperience: 0,
            favoriteLangs: ["php","laravel","react","nodejs"],
            workAt: ["愛知県","東京都"],
            profileImg: "https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png"
        },
        {
            engineerName: name2,
            engineerId: 2,
            engieerExperience: 10,
            favoriteLangs: ["php","laravel","react","nodejs"],
            workAt: ["愛知県","東京都"],
            profileImg: "https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png"
        },
    ];
    return (
        <div className='flex flex-col w-9/12'>
            <ul className='h-full'>
                {engineerInfos.map((engineerInfo: EngineerInfo) => (
                    <Link to={`/profile/${engineerInfo.engineerName}`}>
                        <li className='flex items-center py-5 border-b border-orange-300 hover:bg-orange-100 duration-300'>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={engineerInfo.profileImg}
                                    className='h-16 w-16 object-cover rounded-full'
                                />
                                <span className=''>{engineerInfo.engineerName}</span>
                            </div>
                            <div className='flex flex-col ml-5'>
                                <span>実務経験{engineerInfo.engieerExperience}年</span>
                                <span>得意言語・フレームワーク</span>
                                <Conma Array={engineerInfo.favoriteLangs} />
                                <span>希望勤務地　<Conma Array={engineerInfo.workAt} /></span>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default SearchMain
