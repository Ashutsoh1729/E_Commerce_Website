import React from 'react'
import ColorsClient from './components/client'
import prismadb from '@/lib/prismadb';
import { ColorColumn } from './components/columns';
import { format } from 'date-fns';

const ColorsMainPage = async ({params}:{params:{storeId: string}}) => {
    
    const storeId = params.storeId;

    const colors = await prismadb.color.findMany({
        where: {
            storeId: storeId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formatedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <>
            <div className=' h-full w-full'>
                <div className="container px-8 pt-6 w-full">
                    <ColorsClient data={formatedColors}  />
                </div>
            </div>
        </>
    )
}

export default ColorsMainPage