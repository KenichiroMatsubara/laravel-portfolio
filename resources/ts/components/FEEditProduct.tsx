import React, { FormEventHandler, useContext, useEffect, useState } from 'react'
import FESidebar from '../components/FESidebar';
import type { Stacks } from '../types/stacks';
import { useUserContext } from '../UserContext';
import axios from 'axios';
import { BaseURLContext } from '../app';
import { useParams } from 'react-router-dom';

const initStacks = {
    php: false,
    laravel: false,
    javascript: false,
    typescript: false,
    nodejs: false,
    reactjs: false,
    vuejs: false,
    python: false,
    django: false,
    nextjs: false,
}


const FEEditProduct = () => {
    const [stacks,setStacks] = useState<Stacks>(initStacks);
    const { userContext: { id } } = useUserContext();
    const { productId } = useParams();
    const baseURL:string = useContext(BaseURLContext);

    const [defaultName, setDefaultName] = useState<string>("");
    const [defaultExplain, setDefaultExplain] = useState<string>("");
    const [defaultGithubURL, setDefaultGithubURL] = useState<string>("");
    const [defaultDeployURL, setDefaultDeployURL] = useState<string>("");

    // これはポートフォリオの編集をするコンポーネントなのでまず、初期値（今のポートフォリオの情報）を取得する
    useEffect(() => {
        const getPortfolioInfo = async () => {
            const sendData = {
                "portfolio_id": Number(productId),
            }
            try {
                const response = await axios.post(`${baseURL}/api/get_portfolio_info`,sendData);
                setDefaultName(response.data.portfolio.name);
                setDefaultExplain(response.data.portfolio.explain);
                setDefaultGithubURL(response.data.portfolio.githubURL);
                setDefaultDeployURL(response.data.portfolio.deployURL);
                const newStacks = {...stacks};
                response.data.stacks.forEach(stack => {
                    newStacks[stack.stack]=true;
                });
                setStacks(newStacks);
                console.log(response.data);
            } catch (error) {
                console.log(sendData);
                console.log(error);
            }
        }
        getPortfolioInfo();
    },[]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name: FormDataEntryValue = form.get("name") || "";
        const explain: FormDataEntryValue = form.get("explain") || "";
        const githubURL: FormDataEntryValue = form.get("githubURL") || "";
        const deployURL: FormDataEntryValue = form.get("deployURL") || "";
        const usingStacks:string[] = [];
        Object.keys(stacks).forEach((stack) => {
            if(stacks[stack] === true) {
                usingStacks.push(stack);
            }
        });
        const sendData = {
            "id": Number(productId),
            "name": name,
            "engineer_id": id,
            "explain": explain,
            "githubURL": githubURL,
            "deployURL": deployURL,
            "using_stacks": usingStacks,
        };

        // ここからがapi
        try {
            const response = await axios.put(`${baseURL}/api/update_portfolio`,sendData);
            console.log(sendData);
            console.log(response.data);
            window.location.assign(`${baseURL}/engineer/`);
        } catch (error) {
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
                    <span className='mt-2 text-2xl'>使用技術一覧</span>
                    <div className='grid grid-cols-2 my-2 sm:grid-cols-5 lg:grid-cols-8'>
                        {Object.keys(stacks).map((key) =>(
                                <div key={key} className='flex items-center px-2 text-center'>
                                    <span className='mr-2 font-bold'>{key}</span>
                                    <input
                                        type="checkbox"
                                        checked={stacks[key]}
                                        onChange={() => handleChangeStacks(key)}
                                        className='w-5 h-5 p-1 border rounded'
                                    />
                                </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='mt-2 text-2xl'>機能の説明</span>
                    <textarea
                        rows={10}
                        cols={60}
                        className="h-64 p-2 my-2 border border-gray-500 rounded"
                        defaultValue={defaultExplain}
                        name='explain'
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>githubのURL</span>
                    <input
                        type="text"
                        name='githubURL'
                        defaultValue={defaultGithubURL}
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <div className='flex flex-col'>
                    <span className='my-2 text-2xl'>デプロイ先のURL</span>
                    <input
                        type="text"
                        name='deployURL'
                        className='w-64 p-2 border border-gray-500 rounded '
                    />
                </div>
                <input
                    type='submit'
                    className='w-32 p-2 mt-5 text-white duration-300 bg-orange-600 rounded hover:bg-orange-400'
                    defaultValue={defaultDeployURL}
                    value={"送信"}
                />

            </form>
        </div>
    )
}

export default FEEditProduct
