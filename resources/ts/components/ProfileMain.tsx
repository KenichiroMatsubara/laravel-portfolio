import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Conma from './Conma';
import ProductList from './ProductList';

const ProfileMain = () => {
    const engineername = useParams().engineername;
    const year: number = 0;
    const [user,setUser] = useState<{id: number,token: string}>({id:0,token:""});
    const langs: string[] = ["php","laravel","react","typescript","nodejs"];
    const places: string[] = ["愛知県"];
    return (
        <div className='py-5 w-9/12'>
            <div className='flex'>
                <div className='flex flex-col items-center justify-center'>
                    <img src='https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
                        className='h-16 w-16 object-cover rounded-full'
                    />
                    <span className=''>{engineername}</span>
                </div>
                <div className='flex'>
                    <div className='flex flex-col ml-10'>
                        <span>実務経験{year}年</span>
                        <span>得意言語・フレームワーク</span>
                        <Conma Array={langs} />
                        <span>希望勤務地　<Conma Array={places} /></span>
                    </div>
                    <div className='flex flex-col ml-10'>
                    </div>
                </div>
            </div>
            <ProductList engineerId={1} />
        </div>
    )
}

export default ProfileMain
