'use client'


import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"




import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category, Color, Store } from "@prisma/client"
import axios from "axios"
import { Link, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFormProps {
    initialData: Color | null,
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string()
})

// Type of setting form values

type CategoryFormValues = z.infer<typeof formSchema>

const ColorForm: React.FC<CategoryFormProps> = ({ initialData }) => {

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            value: ""
        }
    });

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Color" : "Create Color";
    const description = initialData ? "Edit a Color" : "Add a new Color";
    const toastMessage = initialData ? "Color updated" : "Color Created";
    const action = initialData ? "Save Changes" : "Create";





    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true)
            // console.log(data);
            const newData = { ...data, value: `#${data.value}` }
            // console.log(newData);
            

            if (action === "Create") {
                await axios.post(`/api/${params.storeId}/colors`, newData)
            } else {
                await axios.patch(`/api/${params.storeId}/colors/${initialData?.id}`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("something went wrong")
            console.log(error);

        } finally {
            setLoading(false)
            form.reset()
        }

    }
    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${initialData?.id}`)
            router.refresh()
            router.push(`/${params.storeId}/colors`)
            toast.success("Store Deleted.")

        } catch (error) {
            toast.error("Make sure you have deleted all the categories and products first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }

    }

    return (
        <>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                <Button
                    className=""
                    variant={"destructive"}
                    size={'icon'}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8  w-full">
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: { field: any }) => (
                                <>
                                    <FormItem className="">
                                        <FormLabel className="px-1">Name</FormLabel>
                                        <FormControl>
                                            <Input className=" w-4/12" placeholder="Color Name"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel className="px-1">Value</FormLabel>
                                    <FormControl>
                                        <Input className=" w-4/12" placeholder="In Hex form"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
                </form>
            </Form>
        </>
    )
}

export default ColorForm


