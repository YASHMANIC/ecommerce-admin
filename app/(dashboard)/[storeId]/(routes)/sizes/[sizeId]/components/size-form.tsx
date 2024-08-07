"use client"
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import * as z from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import {AlertModal} from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import {Size} from "@prisma/client";
interface  SizeFormProps{
    initialData : Size | null
}
const formSchema = z.object({
    name:z.string().min(1),
    value:z.string().min(1)
})
type SizeFormValues = z.infer<typeof formSchema>
export const SizeForm:React.FC<SizeFormProps> = ({
    initialData
                                                         }) =>{
    const params = useParams()
    const router = useRouter()
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    const title = initialData ? "Edit a Size" :"Create a Size"
    const description = initialData ? "Edit a Size" :"Add a new Size"
    const toastMessage = initialData ? "Size updated." :"Size Created."
    const action = initialData ? "Save Changes" :"Create"

    const form = useForm<SizeFormValues>({resolver:zodResolver(formSchema),defaultValues:initialData || {
            name: "",
            value:""
        }})
    const onSubmit = async (data:SizeFormValues)=>{
        try {
        setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
            }
            else{
                await axios.post(`/api/${params.storeId}/sizes`,data)
            }
            router.refresh();
            window.location.assign(`/${params.storeId}/sizes`)
            toast.success(toastMessage)
        }
        catch(error){
            toast.error("Something Went Wrong")
        }
        finally {
            setLoading(false)
        }
    }
    const onDelete = async () =>{
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh();
            window.location.assign(`/${params.storeId}/sizes`)
            toast.success("Size Deleted ..")
        }
        catch (error){
            toast.error("Make Sure You Delete All The Products Using This Size")
        }
        finally {
            setLoading(false)
            setOpen(false);
        }
    }
    return (
        <>
            <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description}/>
                {initialData && (<Button disabled={loading} variant="destructive" size="icon" onClick={() => { setOpen(true)
                }}>
                    <Trash className="h-4 w-4"/>
                </Button>)}
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Size Name' disabled={loading} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="value" render={({field})=>(
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input placeholder='Size Value' disabled={loading} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <Button type="submit" disabled={loading} className="mt-3">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}