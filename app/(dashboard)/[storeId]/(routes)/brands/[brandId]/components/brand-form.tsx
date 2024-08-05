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
import {Brand} from "@prisma/client";
interface  BrandFormProps{
    initialData : Brand | null
}
const formSchema = z.object({
    name:z.string().min(1),
    value:z.string().min(1)
})
type BrandFormValues = z.infer<typeof formSchema>
export const BrandForm:React.FC<BrandFormProps> = ({
    initialData
                                                         }) =>{
    const params = useParams()
    const router = useRouter()
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    const title = initialData ? "Edit a Brand" :"Create a Brand"
    const description = initialData ? "Edit a Brand" :"Add a new Brand"
    const toastMessage = initialData ? "Brand updated." :"Brand Created."
    const action = initialData ? "Save Changes" :"Create"

    const form = useForm<BrandFormValues>({resolver:zodResolver(formSchema),defaultValues:initialData || {
            name: "",
            value:""
        }})
    const onSubmit = async (data:BrandFormValues)=>{
        try {
        setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/brands/${params.brandId}`,data)
            }
            else{
                await axios.post(`/api/${params.storeId}/brands`,data)
            }
            router.refresh();
            window.location.assign(`/${params.storeId}/brands`)
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
            await axios.delete(`/api/${params.storeId}/brands/${params.brandId}`)
            router.refresh();
            window.location.assign(`/${params.storeId}/brands`)
            toast.success("Brand Deleted ..")
        }
        catch (error){
            toast.error("Make Sure You Delete All The Products Using This Brand")
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
                                    <Input placeholder='Brand Name' disabled={loading} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                         <FormField control={form.control} name="value" render={({field})=>(
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <div className={"flex items-center gap-x-4"}>
                                        <Input placeholder='Brand Value' disabled={loading} {...field}/>
                                    </div>
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