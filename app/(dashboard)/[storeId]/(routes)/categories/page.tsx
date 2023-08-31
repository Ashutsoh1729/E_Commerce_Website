import React from 'react'
import CategoryClient from './components/client'
import prismadb from '@/lib/prismadb'

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  

  const storeId = params.storeId;
  
  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  

  return (
    <>
      <div className=' h-full w-full'>
        <div className="container px-8 pt-6 w-full">
          <CategoryClient data={categories}/>
        </div>
      </div>
    </>
  )
}

export default CategoryPage