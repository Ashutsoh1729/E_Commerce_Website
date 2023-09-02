import React from 'react'
import CategoryClient from './components/client'
import prismadb from '@/lib/prismadb'
import { CategoryColumn } from './components/columns';
import { format } from 'date-fns';

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  

  const storeId = params.storeId;
  
  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      billboard: true
    }
  })
  
  const formatedBillboards: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <>
      <div className=' h-full w-full'>
        <div className="container px-8 pt-6 w-full">
          <CategoryClient data={formatedBillboards}/>
        </div>
      </div>
    </>
  )
}

export default CategoryPage