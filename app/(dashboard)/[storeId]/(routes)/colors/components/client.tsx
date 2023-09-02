'use client'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ColorColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'


interface ColorsClientProps{
    data: ColorColumn[]
}

const ColorsClient:React.FC<ColorsClientProps> = ({data}) => {

    const router = useRouter();
    const params = useParams();
    // console.log(params.storeId);
    
    

    return (
        <>
            <div className=' header w-full flex justify-between'>
                <Heading title={`Colors `} description='Add new colors ' />
                <Button className='' variant={"default"} onClick={() => { router.push(`/${params.storeId}/colors/new`) }}>
                    <Plus className=' h-4 w-4 mr-2' />
                    Add New
                </Button>
            </div>
            <Separator className=' mt-3' />
            <div className=' body mt-4'>
                <DataTable columns={columns} data={data} searchKey={'name'} />
            </div>
            
            
        </>
    )
}

export default ColorsClient