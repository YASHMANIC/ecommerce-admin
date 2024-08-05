"use client"
import {Store} from "@prisma/client";
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
import {ApiAlert} from "@/components/ui/api-alert";
interface  SettingsFormProps{
    initialData : Store
}
const formSchema = z.object({
    name:z.string().min(1)
})
type SettingsFormValues = z.infer<typeof formSchema>
export const SettingsForm:React.FC<SettingsFormProps> = ({
    initialData
                                                         }) =>{
    const params = useParams()
    const router = useRouter()
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const form = useForm<SettingsFormValues>({resolver:zodResolver(formSchema),defaultValues:initialData})
    const onSubmit = async (data:SettingsFormValues)=>{
        try {
        setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`,data);
            router.refresh();
            toast.success("Store Updated.")
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
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            window.location.assign('/')
            toast.success("Stored Deleted ..")
        }
        catch (error){
            toast.error("Make Sure You Delete All The Products And Categories")
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
                <Heading title="Settings" description="Settings Description"/>
                <Button disabled={loading} variant="destructive" size="icon" onClick={() => { setOpen(true)
                }}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Name' disabled={loading} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <Button type="submit" disabled={loading} className="mt-3">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator/>
           <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant={"public"} />
        </>
    )
}