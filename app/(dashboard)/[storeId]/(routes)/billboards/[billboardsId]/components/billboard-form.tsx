'use client'


import ImageUpload from "@/components/image-upload"
import AlertModal from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Store } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

interface BillboardsFormProps {
    initialData: Billboard | null
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().nonempty()
})

// Type of setting form values

type BillboardsFormValues = z.infer<typeof formSchema>

const BillboardsFrom: React.FC<BillboardsFormProps> = ({ initialData }) => {

    const form = useForm<BillboardsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: initialData?.label,
            imageUrl: initialData?.imageUrl
        }
    });

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
    const toastMessage = initialData ? "Billoard updated" : "Billboard Created";
    const action = initialData ? "Save Changes" : "Create";





    const onSubmit = async (data: BillboardsFormValues) => {
        try {
            setLoading(true)
            console.log(data);
            
            if (action === "Create") {
                await axios.post(`/api/${params.storeId}/billboards`,data)
            } else {
                await axios.patch(`/api/${params.storeId}/billboards/${initialData?.id}`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
            await axios.delete(`/api/${params.storeId}/billboards/${initialData?.id}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
                            name="imageUrl"
                            render={({ field }: { field: any }) => (
                                <>
                                    <FormItem className=" mb-4" >
                                        <FormLabel className="px-1">Image</FormLabel>
                                        <FormControl>
                                            {/* <Input placeholder="Billboard" disabled={loading} {...field} /> */}
                                            <ImageUpload
                                                value={field.value ? [field.value] : []}
                                                disabled ={loading}
                                                onChange={(url) => field.onChange(url)}
                                                onRemove={()=>field.onChange("")}
                                            />
                                        </FormControl>
                                        <FormMessage></FormMessage>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }: { field: any }) => (
                                <>
                                    <FormItem>
                                        <FormLabel className="px-1">Label</FormLabel>
                                        <FormControl>
                                            <Input className=" w-4/12" placeholder="Billboard"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
                </form>
            </Form>
        </>
    )
}

export default BillboardsFrom


