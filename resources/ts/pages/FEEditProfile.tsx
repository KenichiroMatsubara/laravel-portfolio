import React, { FormEventHandler, useContext, useEffect, useState } from 'react'
import FESidebar from '../components/FESidebar';
import { useUserContext } from '../UserContext';
import axios from 'axios';
import { BaseURLContext } from '../app';
import MultiInputFiled from '../components/MultiInputFiled';
import { useNavigate } from 'react-router-dom';

const FEEditProfile = () => {
    const { userContext: { userType,id,token,state } } = useUserContext();
    const baseURL:string = useContext(BaseURLContext);
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [workExperience, setWorkExperience] = useState<number>(0);
    const [stacks, setStacks] = useState<string[]>([]);
    const [wantWorkAts, setWantWorkAts] = useState<string[]>([]);

    // これはエンジニアの編集をするコンポーネントなのでまず、初期値（今のポートフォリオの情報）を取得する
    useEffect(() => {
        const getEngineerInfo = async () => {
            const sendData = {
                "engineer_id": id,
            }
            try {
                const response = await axios.post(`${baseURL}/api/get_engineer_info`,sendData);
                setName(response.data.engineer_profile.name);
                console.log(response.data);
                setWorkExperience(response.data.engineer_profile.work_experience);
                const newStacks = [...stacks];
                response.data.engineer_good_ats.forEach(stack => {
                    newStacks.push(stack.stack);
                });
                setStacks(newStacks);
                const newWantWorkAts = [...wantWorkAts];
                response.data.engineer_want_work_ats.forEach(place => {
                    newWantWorkAts.push(place.place);
                });
                setWantWorkAts(newWantWorkAts);
            } catch (error) {
                console.log(sendData);
                console.log(error);
            }
        }
        getEngineerInfo();
    },[]);

    const handleSend = async () => {
        const sendData = {
            'id': id,
            'name': name,
            'work_experience': Number(workExperience),
            'stacks': stacks,
            'want_work_ats': wantWorkAts,
        };
        // ここからがapi
        try {
            const response = await axios.post(`${baseURL}/api/update_engineer_account`,sendData);
            console.log(sendData);
            console.log(response.data);
            navigate(`/engineer/`);
        } catch (error) {
            console.log("error occur!")
            console.log(sendData);
            console.log(error);
        }
    }

    const handleChangeStacks = (key:string) => {
        const newStacks = {...stacks};
        newStacks[key] = !newStacks[key];
        setStacks(newStacks);
    }

    return (
        <div className='flex'>
            <FESidebar />
            <div className='flex flex-col w-9/12 gap-3 m-5'>
                <span className='mb-8 text-3xl text-orange-600 underline'>プロフィールを編集する</span>
                <div className='flex flex-col gap-2'>
                    <span className='text-2xl'>名前</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='text-2xl'>実務経験</span>
                    <input
                        type="number"
                        name='workExperience'
                        required
                        value={workExperience}
                        onChange={(e) => setWorkExperience(Number(e.target.value))}
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col gap-1 text-lg'>
                    <span className='mt-2 text-2xl'>得意な技術一覧</span>
                    <span className='mt-2 mb-4'>例　react、laravel、Django、Heroku、AWS</span>
                    <MultiInputFiled array={stacks} setArray={setStacks} placeholder='使用技術' />
                </div>
                <div className='flex flex-col gap-1 text-lg'>
                    <span className='mt-2 text-2xl'>勤務希望地</span>
                    <span className='mt-2 mb-4'>例　愛知県、静岡県、東京都、北海道</span>
                    <MultiInputFiled array={wantWorkAts} setArray={setWantWorkAts} placeholder='希望勤務地' />
                </div>
                <button
                    className='w-32 p-2 mt-5 text-white duration-300 bg-orange-600 rounded hover:bg-orange-400'
                    onClick={() => handleSend()}
                >送信</button>
            </div>
        </div>
    )
}

export default FEEditProfile
