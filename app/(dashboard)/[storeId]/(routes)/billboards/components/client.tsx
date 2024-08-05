"use client"
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {BillboardColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/column";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {AppList} from "@/components/ui/alert-list";


interface BillboardClientProps{
    data:BillboardColumn[]
}
const BillboardClient:React.FC<BillboardClientProps>=({
    data
}) =>{
    const router = useRouter()
    const params = useParams()
    return(
        <>
            <div className="flex items-center justify-between ">
                <Heading title={`BillBoards(${data.length})`} description="Manage Billboards For Your Store" />
                <Button onClick={()=> router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey={"label"} columns={columns} data={data}/>
            <Heading title={"API"} description={"API Calls For Your Billboards"}/>
            <Separator/>
            <AppList entityName={"billboards"} entityIdName={"billboardId"}/>
        </>
    );
}
export default BillboardClient;