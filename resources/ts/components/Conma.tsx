import React, { FC } from 'react'


const Conma: React.FC<{Array: string[]}> = ({Array}) => {
    return (
        <span>{Array.map((hoge,index) => (index==0 ? <span key={index}>{hoge}</span>:<span key={index}>,{hoge}</span>))}</span>
    )
}

export default Conma
