import React, { FC, useContext, useEffect, useState } from 'react'
import { ProductInfo } from '../types/productInfo'
import axios from "axios";
import { BaseURLContext } from '../app';


const Product: FC<{productId: number}> = ({productId}) => {

    const baseURL:string = useContext(BaseURLContext);

    const [productInfo, setProductInfo] = useState<ProductInfo>();

    const [stacks,setStacks] = useState<string>("");

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
                };
                console.log(newProductInfo);
                let newStacks = ""
                response.data.stacks.forEach((stack,index) => {
                    console.log(newStacks);
                    console.log(stack.stack);
                    if(index === 0) {
                        newStacks = stack.stack;
                    }
                    else {
                        newStacks += "," + stack.stack;
                    }
                });
                setStacks(newStacks);
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
                        <div className='break-words '>
                            {stacks}
                        </div>
                    </div>
                    <div className='font-bold text-blue-500'>
                        <p><a href={productInfo.githubURL}>githubURL</a></p>
                        <p><a href={productInfo.deployURL}>deployURL</a></p>
                    </div>
                </div>
                <div className='break-words '>
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
