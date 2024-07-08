import React, { useEffect, useState } from 'react'
import FESidebar from '../components/FESidebar'
import FECompanyProfile from '../components/FECompanyProfile';

const FECompanyProfiles = () => {
    const [conmpanyIds,setCompanyIds] = useState<number[]>([1,2,3]);
    const [onAnyModals,setOnAnyModals] = useState<boolean>(false);
    // 一つでもチャットがあったらほかのチャットを開かないようにする
    return (
        <div className='flex'>
            <FESidebar />
            <div className='w-9/12'>
                {conmpanyIds.map((conmpanyId) =>
                    <FECompanyProfile companyId={conmpanyId} onAnyModals={onAnyModals} setOnAnyModals={setOnAnyModals} />)}
            </div>
        </div>
    )
}

export default FECompanyProfiles
