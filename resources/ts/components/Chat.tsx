import React, { FC, useContext, useEffect, useState } from 'react'
import type { Chat } from '../types/chat';
import CloseIcon from '@mui/icons-material/Close';
import { ChatProps } from '../types/chatProps';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import { BaseURLContext } from '../app';


const Chat: FC<ChatProps> = ({engineerId,companyId,setOnModal}) => {
    const { userContext: { userType,id,token,state }, dispatcher: { setUserType, setId,setToken,setState } } = useUserContext();
    const baseURL:string = useContext(BaseURLContext);

    const [sendText,setSendText] = useState<string>("");
    const [chats, setChats] = useState<Chat[]>([]);
    const [targetIndex, setTargetIndex] = useState<number|undefined>();
    const [trigger,setTrigger] = useState<number>(0);
    // Triggerを変化させる
    useEffect(() => {
        const interval = setInterval(() => {
          setTrigger(prev => prev + 1); // 状態を更新して`useEffect`を発火させる
        }, 3000); // 3秒ごと
        return () => clearInterval(interval);
    },[]);

    // Triggerの変化のたびにチャットを更新
    useEffect(() => {
        getChat();
        console.log("GET CHAT FIRE!!!");
    },[trigger]);

    // チャットの開始位置を調整
    useEffect(() => {
        const newTargetIndex: number = chats.length-1;
        const element = document.getElementById(`item-${newTargetIndex}`);
        if(element){
            element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
        }
        setTargetIndex(newTargetIndex);
    },[chats]);

    const closeThisModal = () => {
        setOnModal(false);
        console.log(setOnModal);
    }

    const getChat = async() => {
        const sendData = {
            "engineer_id": engineerId,
            "company_id": companyId
        };
        console.log(sendData);
        try {
            const response = await axios.post(`${baseURL}/api/get_chat`,sendData);
            console.log(response);
            setChats(response.data.chats);
        } catch (error) {
            console.log(error);
        }
    }


    const handleSendText = async(e) => {
        e.preventDefault();
        if(sendText.trim()===""){
            return;
        }
        const sendData = {
            "engineer_id":engineerId,
            "company_id":companyId,
            "type":userType==="engineer" ? "e_to_c":"c_to_e",
            "text":sendText,
        };
        console.log(sendData);
        try {
            const response = await axios.post(`${baseURL}/api/create_chat`,sendData);
            console.log(response);
            setSendText("");
            getChat();
        } catch (error) {
            console.log(error);
        }
    }

    const handleChatClass = (type: string) => {
        let returnClass = '';
        'ml-4 mr-1 rounded-xl bg-white my-2 py-5 px-2'
        'mr-4 ml-1 rounded-xl bg-orange-400 text-white my-2 py-5 px-2'
        if(userType==="engineer"){
            // 会社からのチャットのとき
            if(type==="c_to_e") {
                returnClass='mr-4 ml-1 rounded-xl bg-orange-400 text-white my-2 py-5 px-2';
            }
            // エンジニアからのチャットのとき
            else {
                returnClass='ml-4 mr-1 rounded-xl bg-white my-2 py-5 px-2';
            }
        }
        else if(userType==="company"){
            if(type==="c_to_e") {
                returnClass='ml-4 mr-1 rounded-xl bg-white my-2 py-5 px-2';
            }
            else {
                returnClass='mr-4 ml-1 rounded-xl bg-orange-300 text-white my-2 py-5 px-2';
            }
        }
        return returnClass;
    };

    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col mt-20 ml-auto mr-auto border border-gray-500 bg-orange-50 w-80 h-96'>
            <CloseIcon
                className='absolute top-0 right-0 p-1 ml-auto text-white duration-300 bg-red-500 hover:bg-red-300'
                onClick={() => setOnModal(false)}
            />
            <div className='flex-1 flex flex-col overflow-y-scroll bg-orange-100 pb-5'>
                {chats.length>0 ? chats.map((chat,index) => (
                    <>
                        <div className={handleChatClass(chat.type)} key={index} id={`item-${index}`}>
                            <span className=''>{chat.text}</span>
                        </div>
                        {index===targetIndex && index!==chats.length-1 &&
                        (<span className='mx-auto bg-orange-50 w-10/12 text-center rounded text-gray-500 text-xs'>新着</span>)
                        }
                    </>
                )):
                <span className='text-center p-3'>ここにチャットは送受信されていません
                </span>}
            </div>
            <form className='flex items-center w-full h-12 bg-white outline-none' onSubmit={(e) => handleSendText(e)}>
                <input
                    type="text"
                    className='px-2 py-1 m-1 w-60'
                    value={sendText}
                    onChange={(e) => setSendText(e.target.value)}
                    />
                <button type='submit' className='flex items-center justify-center'>
                    <SendIcon
                        className='text-orange-400 duration-300 hover:text-orange-100'
                    />
                </button>
            </form>
        </div>
    )
}

export default Chat
