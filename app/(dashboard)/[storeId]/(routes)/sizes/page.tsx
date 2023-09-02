import React from 'react'
import SizeClient from './components/client'
import prismadb from '@/lib/prismadb';
import { SizeColumn } from './components/columns';
import { format } from 'date-fns';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    
    const storeId = params.storeId;

    const colors = await prismadb.size.findMany({
        where: {
            storeId: storeId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formatedColors: SizeColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <>
            <div className=' h-full w-full'>
                <div className="container px-8 pt-6 w-full">
                    <SizeClient data={formatedColors} />
                </div>
            </div>
        </>
    )
}

export default SizesPage