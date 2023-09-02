"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Category } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CategoryColumn, columns } from './columns'

interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {

  const router = useRouter();
  const params = useParams();



  return (
    <>
      <div className=' header flex w-full justify-between'>
        <Heading title={`categories (${data?.length})`} description='Add a new Billboard' />
        <Button className='' variant={"default"} onClick={() => { router.push(`/${params.storeId}/categories/new`) }}>
          <Plus className=' h-4 w-4 mr-2' />
          Add New
        </Button>
      </div>
      <Separator className='my-2'/>
      <div className=' body mt-4'>
        <DataTable columns={columns} data={data} searchKey={'name'}/>
      </div>
      
    </>
  )
}

export default CategoryClient