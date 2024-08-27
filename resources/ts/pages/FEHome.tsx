import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Conma from '../components/Conma';
import FESidebar from '../components/FESidebar';
import Product from '../components/Product';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import { BaseURLContext } from '../app';

const FEHome = () => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();

    const [engineerName,setEngineerName] = useState<string>("");

    const [workExperience,setWorkExperience] = useState<number>(0);
    const [langs,setLangs] = useState<string[]>(["未設定"]);
    const [places,setPlaces] = useState<string[]>(["未設定"]);
    const [productIds,setProductIds] = useState<number[]>([]);
    const baseURL: string = useContext(BaseURLContext);


    useEffect(() => {
        const getPortfolios = async() => {
            console.log(id,state,token,userType);
            const sendData = {
                "engineer_id": id
            };
            try {
                const response = await axios.post(`${baseURL}/api/get_portfolio_ids`,sendData);
                setProductIds(response.data.product_ids);
            } catch (error) {
                console.log(error);
            }
        }
        getPortfolios();
        const getEngineerInfo = async() => {
            const sendData = {
                "engineer_id": id
            }
            try {
                const response = await axios.post(`${baseURL}/api/get_engineer_info`,sendData);
                setWorkExperience(response.data.engineer_profile.work_experience);
                setEngineerName(response.data.engineer_profile.name);
                const newLangs: string[] = [];
                const newPlaces: string[] = [];
                response.data.engineer_good_ats.forEach((element) => {
                    newLangs.push(element.stack);
                })
                response.data.engineer_want_work_ats.forEach((element) => {
                    newPlaces.push(element.place);
                })
                setLangs(newLangs);
                setPlaces(newPlaces);
                console.log(sendData);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEngineerInfo();
        console.log(langs);
        console.log(places);
    },[]);

    return (
        <div className='flex'>
            <FESidebar />
            <div className='flex flex-col w-9/12'>
                <div className='flex items-center justify-between w-full py-5 border-b'>
                    <div className='flex'>
                        <div className='flex flex-col items-center justify-center'>
                            <img src='https://kohacu.com/wp-content/uploads/2018/06/kohacu.com_001312_20180615.png'
                                className='object-contain w-16 h-16 rounded-full'
                            />
                            <span className=''>{engineerName}</span>
                        </div>
                        <div className=''>
                            <div className='flex flex-col ml-10'>
                                <span>実務経験{workExperience}年</span>
                                <span>得意言語・フレームワーク　{langs.length===0 ? "未設定" :<Conma Array={langs} />}</span>
                                <span>希望勤務地　{langs.length===0 ? "未設定" :<Conma Array={places} />}</span>
                            </div>
                            <div className='flex flex-col ml-10'>
                            </div>
                        </div>
                    </div>
                    <Link to={`${baseURL}/engineer/edit_profile/`}>
                        <button
                            className='h-12 px-4 mr-10 text-white duration-300 bg-blue-500 rounded hover:bg-blue-300'
                        >
                            アカウントを管理する
                        </button>
                    </Link>
                </div>
                {productIds.map((productId) => (
                    <Product key={Math.random()} productId={productId} />
                ))}
            </div>
        </div>
    )
}

export default FEHome
