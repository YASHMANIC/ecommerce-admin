"use client"
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {AppList} from "@/components/ui/alert-list";
import {columns, ProductColumn} from "@/app/(dashboard)/[storeId]/(routes)/products/components/column";


interface ProductClientProps{
    data:ProductColumn[]
}
const ProductClient:React.FC<ProductClientProps>=({
    data
}) =>{
    const router = useRouter()
    const params = useParams()
    return(
        <>
            <div className="flex items-center justify-between ">
                <Heading title={`Products(${data.length})`} description="Manage Products For Your Store" />
                <Button onClick={()=> router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey={"name"} columns={columns} data={data}/>
            <Heading title={"API"} description={"API Calls For Your Products"}/>
            <Separator/>
            <AppList entityName={"products"} entityIdName={"productId"}/>
        </>
    );
}
export default ProductClient;