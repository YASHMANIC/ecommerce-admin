"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from "lucide-react";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import {AlertModal} from "@/components/modals/alert-modal";
import {SizeColumn} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/column";

interface CellActionProps{
    data : SizeColumn
}
export const CellAction:React.FC<CellActionProps> = ({
    data
                                                     }) =>{
    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = useState(false);
    const [open,setOpen]=useState(false);

     const onCopy = (id:string) =>{
        navigator.clipboard.writeText(id);
        toast.success("Size Id Copied Successfully!");
    }

        const onDelete = async () =>{
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh();
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
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only"></span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                    </DropdownMenuTrigger>
                <DropdownMenuContent className="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                        <Copy className="h-4 w-4 mr-2"/>
                        CopyId
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/sizes/${data.id}`)}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
           </>
    )
}