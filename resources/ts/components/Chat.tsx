import React, { FC, useState } from 'react'

export interface Chat {
    text: string,
    createdAt: string,
    from: string
    read: boolean
}

const [on,setOn] = useState<boolean>(false);

const Chat: FC<{
    userType: string,
    engineerId: number,
    companyId: number,
    setOnModal: React.Dispatch<React.SetStateAction<boolean>>
}> = ({userType,engineerId,companyId,setOnModal}) => {
    const chats: Chat[] =[
        {
            text: "お元気ですか",
            createdAt: "2024/06/30-19:06",
            from: "engineer",
            read: false,
        },
        {
            text: "元気です",
            createdAt: "2024/06/30-19:06",
            from: "engineer",
            read: false,
        }
    ];
    return (
        <div className='z-50 bg-white w-72 h-96'>

        </div>
    )
}

export default Chat
