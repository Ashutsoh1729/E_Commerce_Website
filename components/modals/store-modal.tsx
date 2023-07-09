'use client'

import React, { useState } from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import Modal from '@/components/ui/modal'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import useStoreModal from '@/hooks/use-store-modal'
import axios from 'axios'
import { toast } from 'react-hot-toast'


// Form Schema in zod
const formSchema = z.object({
    name: z.string().min(1)
});


const StoreModal = () => {

    const [isLoading,setIsLoading] = useState(false)
    const storeModal = useStoreModal();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        setIsLoading(true)
        axios.post('/api/stores', values)
            .then((response) => {
                toast.success("store Created")

                // We are using it is going to do a complete refresh on our page, 
                // that means the created store will be 100 % stored in the database,
                // but in case of router there are some cases in which the database is 
                // simply not ready and then it get stuck in the modal page => For UX
                window.location.assign(`/${response.data.id}`)
            }).catch((err) => {
                console.log(err);
                toast.error("store-modal")
            }).finally(() => {
                setIsLoading(false)
            })

    }


    return (
        <>
            <Modal
                title='Create Store'
                description='Add a new Store to manage products and categories'
                isOpen={storeModal.isOpen}
                onClose={storeModal.onClose}
            >
                <div>
                    <div>
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8'>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input disabled={isLoading} placeholder='E-Commerce' {...field} />
                                                </FormControl>
                                                {/* <FormDescription>Create your first account</FormDescription> */}
                                                <FormMessage/>
                                            </FormItem>
                                        )}

                                    />
                                    <div className='pt-6 space-x-4 flex items-center justify-end w-full'>
                                        {/* Issue -> Submit occure when i click on the cancel button */}
                                        <Button disabled={isLoading} type='button' variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                                        <Button disabled={isLoading} type='submit' variant={"default"}>Continue</Button>
                                        
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default StoreModal
