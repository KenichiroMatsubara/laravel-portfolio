import React from 'react';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

// 型定義
export type UserContext = {
    state: string,
    userType: string,
    id: number,
    token: string,
};
type UserContextType = { userContext: UserContext; setUserContext: Dispatch<SetStateAction<UserContext>> };
const initUserContext: UserContext = {
    state: "none",
    userType: "none",
    id: -1,
    token: ""||"",
};

// Context定義
// exportしないことで、context関連のロジックをこのファイルに閉じ込める。
const UserContext = createContext<UserContextType>({ userContext: initUserContext, setUserContext: () => {} });

// Application全体を囲うProvider

export const UserContextProvider = (props: { children: ReactNode }) => {
    const { children } = props;
    const [userContext, setUserContext] = useState<UserContext>(initUserContext);
    return <UserContext.Provider value={{ userContext, setUserContext }}>{children}</UserContext.Provider>;
};

// SampleContextを使うカスタムhook。基本はこっちを使って、参照＆更新する。
export const useUserContext = () => {
    const { userContext, setUserContext } = useContext(UserContext);
    const dispatcher = {
        setState: (nextState: string) => setUserContext((pre)=> ({...pre,state: nextState})),
        setUserType: (nextUserType: string) => setUserContext((pre) => ({ ...pre, userType: nextUserType })),
        setId: (nextId: number) => setUserContext((pre) => ({ ...pre, id: nextId })),
        setToken: (nextToken: string) => setUserContext((pre) => ({ ...pre, token: nextToken })),
    };
    return { userContext, dispatcher };
};

// 初回ロード等の時だけ、こちらのsetterでコンテキストを丸ごと置き換える。
export const useSetUserContext = () => {
    const { setUserContext } = useContext(UserContext);
    return { setUserContext };
};
