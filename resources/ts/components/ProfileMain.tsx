import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import Conma from './Conma';
import Product from './Product';

const ProfileMain: FC<{engineerId: number}> = (engineerId) => {
    const year: number = 0;
    const langs: string[] = ["php","laravel","react","typescript","nodejs"];
    const places: string[] = ["愛知県"];
    const productIds: number[] = [1];
    return (
        <div className='w-9/12 py-5'>
            <div className='flex'>
                <div className='flex flex-col items-center justify-center'>
                    <img src='https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
                        className='object-cover w-16 h-16 rounded-full'
                    />
                    <span className=''>{}</span>
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
            {productIds.map((productId) => (
                <Product productId={productId} />
            ))}
        </div>
    )
}

export default ProfileMain
