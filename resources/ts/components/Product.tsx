import React, { FC, useContext, useEffect, useState } from 'react'
import { ProductInfo } from '../types/productInfo'
import axios from "axios";
import { BaseURLContext } from '../app';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { ProductProps } from "../types/productProps";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useUserContext } from '../UserContext';


const Product: FC<ProductProps> = ({productId}) => {
    const baseURL:string = useContext(BaseURLContext);
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();

    const [productInfo, setProductInfo] = useState<ProductInfo>();
    const [stacks,setStacks] = useState<string>("");
    const [onModal,setOnModal] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
    const [isOwner,setIsOwner] = useState<boolean>(false);

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
            try {
                const response = await axios.post(`${baseURL}/api/get_portfolio_info`,sendData);
                const newProductInfo = {
                    name: response.data.portfolio.name,
                    explain: response.data.portfolio.explain,
                    githubURL: response.data.portfolio.githubURL,
                    deployURL: response.data.portfolio.deployURL,
                };
                let newStacks = ""
                response.data.stacks.forEach((stack,index) => {
                    if(index === 0) {
                        newStacks = stack.stack;
                    }
                    else {
                        newStacks += "," + stack.stack;
                    }
                });
                setStacks(newStacks);
                setProductInfo(newProductInfo);
                // UsertypeがEngingeerでportfolioのEngieer_idと今使っているユーザーのidが一致するときのみにポートフォリオの作成者であると認定
                if(userType==="engineer" && response.data.portfolio.engineer_id===id){
                    setIsOwner(true)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getPortfolio();
    },[]);

    if(productInfo){
    return (
            <div className='flex w-full p-5 border-b'>
                <div className='flex flex-col w-3/12 gap-1'>
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
                <div className='w-8/12 px-5 break-words whitespace-pre-wrap'>
                    {productInfo.explain}
                </div>
                {isOwner===true &&
                <MoreVertIcon
                    className='w-1/12 duration-300 cursor-pointer hover:text-gray-600'
                    onClick={() => handleClickMoreIcon()}
                />
                }
                {/* TODOあとでポートフォリオの変種機能をつけておく　削除はそのままボタン一つでできるようにして、更新はFEMakeNewを利用して作れば行ける */}
                {(onModal===true) &&
                <div className='absolute z-10 flex flex-col w-32 bg-white border border-gray-600 right-10'>
                    <CloseIcon
                        className='absolute top-0 right-0 p-1 text-white duration-300 bg-red-500 cursor-pointer hover:bg-red-300'
                        onClick={() => handleCloseModal()}
                    />
                    <div
                        className='flex gap-3 mt-8 ml-3 duration-300 cursor-pointer hover:text-gray-500'
                        onClick={() => handleDelete("none")}
                    >
                        <DeleteIcon />
                        <span>削除する</span>
                    </div>
                    <Link
                        to={`${baseURL}/engineer/edit_portfolio/${productId}`}
                        className='flex gap-3 mt-3 mb-3 ml-3 duration-300 cursor-pointer hover:text-gray-500'
                    >
                        <EditIcon />
                        <span>編集する</span>
                    </Link>
                    {deleteConfirmation===true &&
                    <div className='absolute z-20 flex flex-col items-center w-48 gap-2 p-3 bg-white border border-gray-600 top-5 right-3'>
                        <span>本当に削除しますか？</span>
                        <div className='flex gap-3'>
                            <button
                                className='duration-300 hover:text-gray-500'
                                onClick={() => handleDelete("yes")}
                            >
                                はい
                            </button>
                            <button
                                className='duration-300 hover:text-gray-500'
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
