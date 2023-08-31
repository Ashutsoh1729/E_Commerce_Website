"use client"
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Billboard } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'


interface BillboardClientProps {
    data: BillboardColumn[] 
}


const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {

    const router = useRouter()
    const params = useParams();
    // console.log(params);
    


    return (
        <>
            <div className='header flex w-full justify-between'>
                <Heading title={`Billboards (${data?.length})`} description='Add a new Billboard' />
                <Button className='' variant={"default"} onClick={() => { router.push(`/${params.storeId}/billboards/new`)}}>
                    <Plus className=' h-4 w-4 mr-2' />
                    Add New
                </Button>
            </div>
            <Separator className=' my-2' />
            <div className=' body mt-4'>
                <DataTable searchKey='label' columns={columns} data={data}/>
            </div>
        </>
    )
}

export default BillboardClient