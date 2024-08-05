"use client"
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {AppList} from "@/components/ui/alert-list";
import {columns, SizeColumn} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/column";


interface SizesClientProps{
    data:SizeColumn[]
}
const SizesClient:React.FC<SizesClientProps>=({
    data
}) =>{
    const router = useRouter()
    const params = useParams()
    return(
        <>
            <div className="flex items-center justify-between ">
                <Heading title={`Sizes(${data.length})`} description="Manage Sizes For Your Store" />
                <Button onClick={()=> router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey={"name"} columns={columns} data={data}/>
            <Heading title={"API"} description={"API Calls For Your Sizes"}/>
            <Separator/>
            <AppList entityName={"sizes"} entityIdName={"sizeId"}/>
        </>
    );
}
export default SizesClient;