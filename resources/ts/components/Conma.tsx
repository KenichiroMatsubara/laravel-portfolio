import React, { FC } from 'react'


const Conma: React.FC<{Array: string[]}> = ({Array}) => {
    return (
        <span>{Array.map((hoge,index) => (index==0 ? <span>{hoge}</span>:<span>,{hoge}</span>))}</span>
    )
}

export default Conma
