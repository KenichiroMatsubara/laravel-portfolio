import React, { FC, useContext, useEffect, useState } from 'react'
import { ProductInfo } from '../types/productInfo'
import axios from "axios";
import { BaseURLContext } from '../app';


const Product: FC<{productId: number}> = ({productId}) => {

    const baseURL:string = useContext(BaseURLContext);

    const [productInfo, setProductInfo] = useState<ProductInfo>();

    // const productInfo: ProductInfo = {
    //     name: "リアルSNS",
    //     stacks: {
    //         php: false,
    //         laravel: false,
    //         javascript: false,
    //         typescript: false,
    //         nodejs: true,
    //         reactjs: true,
    //         vuejs: false,
    //         python: false,
    //         django: false,
    //         nextjs: false,
    //     },
    //     explain: "とても面白いアプリです。使用技術はフロントエンドにはreactjs、バックエンドにはNodejsのExpressを使用しています。",
    //     githubURL: "https://github.com/KenichiroMatsubara/real-sns-frontend/blob/main/src/pages/Profile.jsx",
    //     deployURL: "https://github.com/Ken  ichiroMatsubara/real-sns-frontend/blob/main/src/pages/Profile.jsx",
    // }

    // ある一つのポートフォリオを取得
    useEffect(() => {
        const getPortfolio = async() => {
            const sendData = {
                portfolio_id: productId,
            };
            console.log({sendData});
            try {
                const response = await axios.post(`${baseURL}/api/get_portfolio_info`,sendData);
                console.log(response);
                const newProductInfo = {
                    name: response.data.portfolio.name,
                    explain: response.data.portfolio.explain,
                    githubURL: response.data.portfolio.githubURL,
                    deployURL: response.data.portfolio.deployURL,
                    stacks: {
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
                    },
                };
                console.log(newProductInfo);
                response.data.stacks.forEach((stack) => {
                    newProductInfo.stacks[stack.stack]=true;
                });
                console.log(newProductInfo);
                setProductInfo(newProductInfo);
            } catch (error) {
                console.log(error);
            }
        }
        getPortfolio();
    },[]);

    if(productInfo){
    return (
            <div className='grid w-full grid-cols-2 p-5 border-b'>
                <div className='flex flex-col'>
                    <span>{productInfo.name}</span>
                    <div>
                        <span>使用技術</span>
                        <div className='grid grid-cols-3'>
                            {Object.keys(productInfo.stacks).map((stack) => (
                                productInfo.stacks[stack]==true && (
                                    <span className='mx-1'>{stack}</span>
                                )
                            ))}
                        </div>
                    </div>
                    <div className='font-bold text-blue-500'>
                        <p><a href={productInfo.githubURL}>githubURL</a></p>
                        <p><a href={productInfo.deployURL}>deployURL</a></p>
                    </div>
                </div>
                <div className=''>
                    {productInfo.explain}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='grid w-full grid-cols-2 p-5 border-b'>
                データを取得中です
            </div>
        )
    }
}

export default Product
