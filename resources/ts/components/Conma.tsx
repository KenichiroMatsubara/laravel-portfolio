import React, { FC } from 'react'


const Conma: React.FC<{Array: string[]}> = ({Array}) => {
    return (
        <span>{Array.map((hoge,index) => (index==0 ? <span key={Math.random()}>{hoge}</span>:<span key={Math.random()}>,{hoge}</span>))}</span>
    )
}

export default Conma
