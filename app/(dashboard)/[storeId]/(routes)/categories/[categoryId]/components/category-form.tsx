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
import { Billboard, Category, Store } from "@prisma/client"
import axios from "axios"
import { Link, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFormProps {
    initialData: Category | null,
    billboards: Billboard[]
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string()
})

// Type of setting form values

type CategoryFormValues = z.infer<typeof formSchema>

const CategoryFrom: React.FC<CategoryFormProps> = ({ initialData , billboards }) => {

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:initialData?.name,
            billboardId: ""
        }
    });

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Category" : "Create Category";
    const description = initialData ? "Edit a Category" : "Add a new Category";
    const toastMessage = initialData ? "Category updated" : "Category Created";
    const action = initialData ? "Save Changes" : "Create";





    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true)
            // console.log(data);
            
            if (action === "Create") {
                await axios.post(`/api/${params.storeId}/category`, data)
            } else {
                await axios.patch(`/api/${params.storeId}/category/${initialData?.id}`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/categories`)
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
            await axios.delete(`/api/${params.storeId}/category/${initialData?.id}`)
            router.refresh()
            router.push(`/${params.storeId}/category`)
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
                                        <FormLabel className="px-1">Label</FormLabel>
                                        <FormControl>
                                            <Input className=" w-4/12" placeholder="Category"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem className=" w-4/12">
                                    <FormLabel>Billboard</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                                
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => {
                                                return (
                                                    <>
                                                        <SelectItem value={billboard.id}>{ billboard.label}</SelectItem>
                                                    </>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
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

export default CategoryFrom


