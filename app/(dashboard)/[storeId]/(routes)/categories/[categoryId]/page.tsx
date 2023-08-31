import prismadb from '@/lib/prismadb';
import React from 'react'
import CategoryFrom from '../../billboards/[billboardsId]/components/billboard-form';
// import BillboardsFrom from './components/billboard-form';

interface IParams {
  params: {
    storeId: string;
    categoryId: string;
  },
  searchParams: {}
}


const CategoryPage = async ({ params }: IParams) => {

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  })

  return (
    <div className=' flex flex-col'>
      <div className=' flex-1 space-y-4 p-8 pt-6'>
        <CategoryFrom initialData={category} />
      </div>
    </div>
  )
}

export default CategoryPage