"use client"
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {AppList} from "@/components/ui/alert-list";
import {BrandColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/brands/components/column";

interface BrandClientProps{
    data:BrandColumn[]
}
const BrandClient:React.FC<BrandClientProps>=({
    data
}) =>{
    const router = useRouter()
    const params = useParams()
    return(
        <>
            <div className="flex items-center justify-between ">
                <Heading title={`Brands(${data.length})`} description="Manage Brands For Your Store" />
                <Button onClick={()=> router.push(`/${params.storeId}/brands/new`)}>
                    <Plus className="mr-2 w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey={"name"} columns={columns} data={data}/>
            <Heading title={"API"} description={"API Calls For Your Brands"}/>
            <Separator/>
            <AppList entityName={"brands"} entityIdName={"brandId"}/>
        </>
    );
}
export default BrandClient;