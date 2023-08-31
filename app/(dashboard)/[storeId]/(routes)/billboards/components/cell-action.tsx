'use client'
import React, { useState } from 'react'
import { BillboardColumn } from './columns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Copy, Dot, Edit, MoreHorizontal, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/modals/alert-modal'


interface CellActionProps{
    data: BillboardColumn
}

const CellAction: React.FC<CellActionProps> = ({
    data
}) => {


  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const onConfirm =async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
      toast.success("Billboard Deleted")
      router.refresh()
    } catch (error) {
      console.log("[Billboard_Cell_Action]", error);
      toast.error("Make sure you have removed all categories using this billboard.")
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }



  const copyId = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Billboard Id is copied to clipboard.")
  }
  

    // console.log(data);
    
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={ ()=>{setOpen(false)}}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu >
        <DropdownMenuTrigger asChild >
          <Button variant={"ghost"} className=' h-8 w-8 p-0'>
            <span className=' sr-only'>Open</span>
            <MoreHorizontal/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => { copyId(data.id) }}
          >
            <Copy className='mr-2 h-4 w-4'/>
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            className=' cursor-pointer'
            onClick={()=>{router.push(`/${params.storeId}/billboards/${data.id}`)}}
          >
            <Edit className=' mr-2 h-4 w-4'/> Update
          </DropdownMenuItem>
          <DropdownMenuItem className=' cursor-pointer' onClick={()=>{setOpen(true)}}>
            <Trash className=' mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  )
}

export default CellAction