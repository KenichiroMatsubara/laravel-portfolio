import React, { FC, useState } from 'react'
import type { Chat } from '../types/chat';
import CloseIcon from '@mui/icons-material/Close';
import { FEChatProps } from '../types/fEChatProps';
import SendIcon from '@mui/icons-material/Send';

const chats: Chat[] =[
    {
        text: "お元気ですか",
        createdAt: "2024/06/30-19:06",
        from: "company",
        read: false,
    },
    {
        text: "元気です",
        createdAt: "2024/06/30-19:07",
        from: "engineer",
        read: false,
    },
    {
        text: "教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育",
        createdAt: "2024/07/06-21:07",
        from: "engineer",
        read: false,
    },
    {
        text: "教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育",
        createdAt: "2024/07/06-21:07",
        from: "engineer",
        read: false,
    },
    {
        text: "教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育",
        createdAt: "2024/07/06-21:07",
        from: "engineer",
        read: false,
    },
    {
        text: "教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育教育",
        createdAt: "2024/07/06-21:07",
        from: "engineer",
        read: false,
    },
];

const FEChat: FC<FEChatProps> = ({engineerId,companyId,setOnModal,setOnAnyModals}) => {

    const [sendText,setSendText] = useState<string>("");

    const closeThisModal = () => {
        setOnModal(false);
        setOnAnyModals(false);
    }

    const handleSendText = () => {
    }

    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 z-50 mt-20 ml-auto mr-auto bg-orange-100 border w-80 h-96 flex flex-col'>
            <CloseIcon
                className='absolute top-0 right-0 p-1 ml-auto text-white duration-300 bg-red-500 hover:bg-red-300'
                onClick={() => closeThisModal()}
            />
            <div className='bg-orange-100 flex flex-col overflow-y-scroll'>
                {chats.map((chat) => (
                <div className={"Engineer"==chat.from ?'ml-4 mr-1 rounded-xl bg-white my-2 py-5 px-2':'mr-4 ml-1 rounded-xl bg-pink-300 my-2 py-5 px-2'}>
                    <span className=''>{chat.text}</span>
                    <span className='text-xs text-gray-500'>{chat.createdAt}</span>
                </div>))}
                <div className='h-24'>　</div>
            </div>
            <div className='flex bg-white bottom-0 absolute h-12 w-full items-center outline-none'>
                <input
                    type="text"
                    className=' py-1 px-2 m-1 w-60'
                    value={sendText}
                    onChange={(e) => setSendText(e.target.value)}
                    onClick={() => handleSendText()}
                />
                <SendIcon className='text-orange-400 hover:text-orange-100 duration-300' />
            </div>
        </div>
    )
}

export default FEChat
