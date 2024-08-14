import React, { FormEventHandler, useContext, useEffect, useState } from 'react'
import FESidebar from '../components/FESidebar';
import { useUserContext } from '../UserContext';
import axios from 'axios';
import { BaseURLContext } from '../app';
import Conma from '../components/Conma';


const FEEditProfile = () => {
    const { userContext: { id } } = useUserContext();
    const baseURL:string = useContext(BaseURLContext);

    const [defaultName, setDefaultName] = useState<string>("");
    const [defaultWorkExperience, setDefaultWorkExperience] = useState<number>(0);
    const [stacks, setStacks] = useState<string[]>([]);
    const [wantWorkAts, setWantWorkAts] = useState<string[]>([]);

    // これはエンジニアの編集をするコンポーネントなのでまず、初期値（今のポートフォリオの情報）を取得する
    useEffect(() => {
        const getEngineerInfo = async () => {
            const sendData = {
                "engineer_id": Number(id),
            }
            try {
                const response = await axios.post(`${baseURL}/api/get_engineer_info`,sendData);
                setDefaultName(response.data.engineer_profile.name);
                setDefaultWorkExperience(response.data.engineer_profile.work_experience);
                const newStacks = [...stacks];
                response.data.engineer_good_ats.forEach(stack => {
                    newStacks.push(stack.stack);
                });
                setStacks(newStacks);
                const newWantWorkAts = [...wantWorkAts];
                response.data.engineer_good_ats.forEach(stack => {
                    newWantWorkAts.push(stack.stack);
                });
                setWantWorkAts(newWantWorkAts);
                console.log(response.data);
            } catch (error) {
                console.log(sendData);
                console.log(error);
            }
        }
        getEngineerInfo();
    },[]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name: FormDataEntryValue = form.get("name") || "";
        const workExperience: FormDataEntryValue = String(form.get("workExperience")) || "0";
        const sendData = {
            "id": id,
            "name": name,
            "work_experience": Number(workExperience),
            "stacks": stacks,
            "want_work_ats": wantWorkAts,
        };
        // ここからがapi
        try {
            const response = await axios.post(`${baseURL}/api/update_engineer`,sendData);
            console.log(sendData);
            console.log(response.data);
            window.location.assign(`${baseURL}/engineer/`);
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
            <form className='flex flex-col w-9/12 m-5' onSubmit={handleSubmit}>
                <span className='mb-8 text-3xl text-orange-600 underline'>新しく制作物を追加する</span>
                <div className='flex flex-col'>
                    <span className='text-2xl'>名前</span>
                    <input
                        type="text"
                        name='name'
                        defaultValue={defaultName}
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='text-2xl'>実務経験</span>
                    <input
                        type="number"
                        name='workExperience'
                        defaultValue={defaultWorkExperience}
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>使用技術一覧</span>
                    {stacks.length!==0 ?
                        <Conma Array={stacks} />
                        :
                        <p>未設定</p>
                    }
                    <input
                        className=''
                        placeholder='新たにあなたの得意な技術を入力してください'
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>勤務希望地</span>
                    {stacks.length!==0 ?
                        <Conma Array={stacks} />
                        :
                        <p>未設定</p>
                    }
                    <input
                        className=''
                        placeholder='新たにあなたの得意な技術を入力してください'
                    />
                </div>
                <input
                    type='submit'
                    className='w-32 p-2 mt-5 text-white duration-300 bg-orange-600 rounded hover:bg-orange-400'
                    value={"送信"}
                />
            </form>
        </div>
    )
}

export default FEEditProfile
