"use client"
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {AppList} from "@/components/ui/alert-list";
import {CategoryColumn, columns} from "@/app/(dashboard)/[storeId]/(routes)/categories/components/column";


interface CategoryClientProps{
    data:CategoryColumn[]
}
const CategoryClient:React.FC<CategoryClientProps>=({
    data
}) =>{
    const router = useRouter()
    const params = useParams()
    return(
        <>
            <div className="flex items-center justify-between ">
                <Heading title={`Categories(${data.length})`} description="Manage Categories For Your Store" />
                <Button onClick={()=> router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 w-4 h-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey={"name"} columns={columns} data={data}/>
            <Heading title={"API"} description={"API Calls For Your Billboards"}/>
            <Separator/>
            <AppList entityName={"categories"} entityIdName={"categoryId"}/>
        </>
    );
}
export default CategoryClient;