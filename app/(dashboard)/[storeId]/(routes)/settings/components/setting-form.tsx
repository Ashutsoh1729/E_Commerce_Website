'use client'


import AlertModal from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import Heading from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

interface SettingFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1),
})

// Type of setting form values

type SettingFormValues = z.infer<typeof formSchema>

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {

    const form = useForm<SettingFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const onSubmit =async (data:SettingFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            
            toast.success("Store Updated.")
        } catch (error) {
            toast.error("something went wrong")
        } finally {
            setLoading(false)
        }
        
    }
    const onDelete =async () => {
        try {

            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push("/")
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
                    title="Settings"
                    description={"Manage store preferences"}
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
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <>
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Store name" disabled={loading} {...field} />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">Save Changes</Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title="TEST" description="TEST" variant="admin"/>

        </>
    )
}

export default SettingForm