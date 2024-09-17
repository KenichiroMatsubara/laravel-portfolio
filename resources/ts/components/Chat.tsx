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
    const [trigger,setTrigger] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setTrigger(prev => prev + 1); // 状態を更新して`useEffect`を発火させる
        }, 10000); // 10秒ごと
        return () => clearInterval(interval); 
    },[]);

    useEffect(() => {
        getChat();
    },[trigger]);

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


    const handleSendText = async() => {
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
            console.log("sdafdsafdasfdasfdsafdsafdsa")
            console.log(response);
            setSendText("");
            getChat();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col mt-20 ml-auto mr-auto border bg-orange-50 w-80 h-96'>
            <CloseIcon
                className='absolute top-0 right-0 p-1 ml-auto text-white duration-300 bg-red-500 hover:bg-red-300'
                onClick={() => setOnModal(false)}
            />
            <div className='flex flex-col overflow-y-scroll bg-orange-100'>
                {chats.map((chat) => (
                <div className={"c_to_e"==chat.type ?'ml-4 mr-1 rounded-xl bg-white my-2 py-5 px-2':'mr-4 ml-1 rounded-xl bg-orange-400 text-white my-2 py-5 px-2'}>
                    <span className=''>{chat.text}</span>
                </div>))}
                <div className='h-24'>　</div>
            </div>
            <div className='absolute bottom-0 flex items-center w-full h-12 bg-white outline-none'>
                <input
                    type="text"
                    className='px-2 py-1 m-1 w-60'
                    value={sendText}
                    onChange={(e) => setSendText(e.target.value)}
                    />
                <SendIcon
                    className='text-orange-400 duration-300 hover:text-orange-100'
                    onClick={() => handleSendText()}
                />
            </div>
        </div>
    )
}

export default Chat
