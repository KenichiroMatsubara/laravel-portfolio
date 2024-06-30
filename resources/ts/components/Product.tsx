import React, { FC } from 'react'

export interface ProductInfo {
    title: string,
    stacks: {
        php: boolean,
        laravel: boolean,
        javascript: boolean,
        typescript: boolean,
        nodejs: boolean,
        reactjs: boolean,
        vuejs: boolean,
        python: boolean,
        django: boolean,
        nextjs: boolean,
    },
    explain: string,
    githubURL: string,
    deployURL: string,
}

const Product: FC<{productId: number}> = ({productId}) => {
    const productInfo: ProductInfo = {
        title: "リアルSNS",
        stacks: {
            php: false,
            laravel: false,
            javascript: false,
            typescript: false,
            nodejs: true,
            reactjs: true,
            vuejs: false,
            python: false,
            django: false,
            nextjs: false,
        },
        explain: "とても面白いアプリです。使用技術はフロントエンドにはreactjs、バックエンドにはNodejsのExpressを使用しています。",
        githubURL: "https://github.com/KenichiroMatsubara/real-sns-frontend/blob/main/src/pages/Profile.jsx",
        deployURL: "https://github.com/KenichiroMatsubara/real-sns-frontend/blob/main/src/pages/Profile.jsx",
    }
    return (
        <div className='grid w-full grid-cols-2 p-5 border-b'>
            <div className='flex flex-col'>
                <span>{productInfo.title}</span>
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

export default Product
