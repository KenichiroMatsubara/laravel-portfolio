import React, { FC, useContext, useEffect, useState } from 'react'
import Conma from './Conma';
import Product from './Product';
import { ProfileMainProps } from '../types/profileMainProps';
import axios from 'axios';
import { BaseURLContext } from '../app';

const ProfileMain: FC<ProfileMainProps> = ({engineerId,setOnModal}) => {

    const baseURL:string = useContext(BaseURLContext);

    const [workExperience,setWorkExperience] = useState<number>(0);
    const [name,setName] = useState<string>("未設定");
    const [langs,setLangs] = useState<string[]>(["未設定"]);
    const [places,setPlaces] = useState<string[]>(["未設定"]);
    const [productIds,setProductIds] = useState<number[]>([]);

    useEffect(() => {
        const getEngineerInfo = async () => {
            const sendData = {
                "engineer_id": engineerId,
            };
            console.log(sendData);
            console.log(location.pathname.split("/"));
            try {
                const response = await axios.post(`${baseURL}/api/get_engineer_info`,sendData);
                console.log(response.data);
                // profileがNULLでないとき
                if(response.data.engineer_profile!==null){
                    setWorkExperience(response.data.engineer_profile.work_experience);
                    setName(response.data.engineer_profile.name);
                }
                // engineer_good_atがNULLでなく、長さも０でないとき
                if(response.data.engineer_good_ats!==null && response.data.engineer_good_ats.length!==0){
                    const newLangs:string[] = [];
                    response.data.engineer_good_ats.forEach(engineer_good_at => {
                        newLangs.push(engineer_good_at.stack);
                    })
                    setLangs(newLangs);
                }
                // engineer_want_to_atがNULLでなく、長さも０でないとき
                if(response.data.engineer_want_work_ats!==null && response.data.engineer_want_work_ats.length!==0){
                    const newPlaces:string[] = [];
                    response.data.engineer_want_work_ats.forEach(engineer_want_work_at => {
                        newPlaces.push(engineer_want_work_at.place);
                    })
                    setPlaces(newPlaces);
                }
                if(response.data.portfolios!==null){
                    const newProductIds:number[] = [];
                    response.data.portfolios.forEach(portfolio => {
                        newProductIds.push(portfolio.id);
                    });
                    setProductIds(newProductIds);
                }
                console.log(langs);
            } catch (error) {
                console.log(error);
            }
        };
        getEngineerInfo();
    },[]);

    return (
        <div className='w-9/12 py-5'>
            <div className='flex'>
                <div className='flex flex-col items-center justify-center'>
                    <img src='https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
                        className='object-cover w-16 h-16 rounded-full'
                    />
                    <span className=''>{name}</span>
                </div>
                <div className='flex'>
                    <div className='flex flex-col ml-10'>
                        <span>実務経験{workExperience}年</span>
                        <span>得意言語・フレームワーク</span>
                        <Conma Array={langs} />
                        <span>希望勤務地　<Conma Array={places} /></span>
                    </div>
                    <div className='flex flex-col ml-10'>
                    </div>
                </div>
                <button
                    className='h-12 p-2 text-white duration-300 bg-blue-500 rounded hover:bg-blue-300'
                    onClick={() => setOnModal(true)}
                >
                    チャットを見る
                </button>
            </div>
            {productIds.map((productId) => (
                <Product productId={productId} />
            ))}
        </div>
    )
}

export default ProfileMain
