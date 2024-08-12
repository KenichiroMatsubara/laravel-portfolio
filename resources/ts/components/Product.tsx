import React, { FC, useContext, useEffect, useState } from 'react'
import { ProductInfo } from '../types/productInfo'
import axios from "axios";
import { BaseURLContext } from '../app';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { ProductProps } from "../types/productProps";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Product: FC<ProductProps> = ({productId}) => {
    const baseURL:string = useContext(BaseURLContext);
    const [productInfo, setProductInfo] = useState<ProductInfo>();
    const [stacks,setStacks] = useState<string>("");
    const [onModal,setOnModal] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

    const handleClickMoreIcon  = () => {
        if(onModal===true) return;
        else {
            setOnModal(true);
        }
    };

    const handleCloseModal = () => {
        setOnModal(false);
        setDeleteConfirmation(false);
    };

    const handleDelete = async (answer) => {
        if(deleteConfirmation===false && answer==="none"){
            setDeleteConfirmation(true);
        }
        else if(deleteConfirmation===true && answer==="yes"){
            // そのポートフォリオを消すためのapiを書いといて
            const sendData = {
                "id":productId
            }
            try {
                const response = await axios.post(`${baseURL}/api/destroy_portfolio`,sendData);
                console.log(sendData);
                console.log(response.data);
                window.location.reload();
            } catch (error) {
                console.log(sendData);
                console.log(error);
            }
        }
        else if(deleteConfirmation===true && answer==="no"){
            setOnModal(false);
            setDeleteConfirmation(false);
        }
    };

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
            <div className='flex w-full p-5 border-b'>
                <div className='flex flex-col gap-1 w-3/12'>
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
                <div className='break-words whitespace-pre-wrap w-8/12 px-5'>
                    {productInfo.explain}
                </div>
                <MoreVertIcon
                    className='w-1/12 hover:text-gray-600 duration-300 cursor-pointer'
                    onClick={() => handleClickMoreIcon()}
                />
                {/* TODOあとでポートフォリオの変種機能をつけておく　削除はそのままボタン一つでできるようにして、更新はFEMakeNewを利用して作れば行ける */}
                {(onModal===true) &&
                <div className='absolute right-10 flex flex-col bg-white w-32 border border-gray-600 z-10'>
                    <CloseIcon
                        className='absolute top-0 right-0 bg-red-500 text-white p-1 hover:bg-red-300 duration-300 cursor-pointer'
                        onClick={() => handleCloseModal()}
                    />
                    <div
                        className='flex gap-3 mt-8 ml-3 hover:text-gray-500 duration-300 cursor-pointer'
                        onClick={() => handleDelete("none")}
                    >
                        <DeleteIcon />
                        <span>削除する</span>
                    </div>
                    <div
                        className='flex gap-3 mt-3 ml-3 mb-3 hover:text-gray-500 duration-300 cursor-pointer'
                    >
                        <EditIcon />
                        <span>編集する</span>
                    </div>
                    {deleteConfirmation===true &&
                    <div className='flex flex-col gap-2 p-3 absolute top-5 right-3 w-48 items-center bg-white border border-gray-600 z-20'>
                        <span>本当に削除しますか？</span>
                        <div className='flex gap-3'>
                            <button
                                className='hover:text-gray-500 duration-300'
                                onClick={() => handleDelete("yes")}
                            >
                                はい
                            </button>
                            <button
                                className='hover:text-gray-500 duration-300'
                                onClick={() => handleDelete("no")}
                            >
                                いいえ
                            </button>
                        </div>
                    </div>}
                </div>}
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
