import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useOrigin } from '@/hooks/use-origin'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'
import { format } from 'date-fns'

const BillboardsPage = async({params}:{params:{storeId: string}}) => {

    const storeId = params.storeId;
    // console.log(storeId);

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: storeId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    // console.log(billboards);
    const formatedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt,"MMMM do, yyyy")
    }))
    
    

    return (
        <div className=' w-full h-full '>
            <div className=' container px-8 pt-6 w-full'>
                <BillboardClient data={formatedBillboards} />
            </div>

        </div>
    )
}

export default BillboardsPage

