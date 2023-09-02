import React from 'react'
import ColorForm from './components/color-form';
import prismadb from '@/lib/prismadb';

interface IParams {
  params: {
    storeId: string;
    colorId: string;
  },
  searchParams: {}
}

const ColorPage = async({ params }: IParams) => {
  
  const colors = await prismadb.color.findUnique({
    where: {
      id: params.colorId
    }
  })

  return (
    <>
      <div className=' flex flex-col'>
        <div className=' flex-1 space-y-4 p-8 pt-6'>
          <ColorForm initialData={colors}  />
        </div>
      </div>
    </>
  )
}

export default ColorPage