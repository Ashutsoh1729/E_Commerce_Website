import prismadb from '@/lib/prismadb';
import React from 'react'
import BillboardsFrom from './components/billboard-form';

interface IParams {
    params: {
        storeId: string;
        billboardsId: string;
    },
    searchParams: {}
}


const BillboardsPage = async ({ params }: IParams) => {

    const billboards = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardsId
        }
    })

    return (
        <div className=' flex flex-col'>
            <div className=' flex-1 space-y-4 p-8 pt-6'>
                <BillboardsFrom initialData={billboards}/>
            </div>
        </div>
    )
}

export default BillboardsPage