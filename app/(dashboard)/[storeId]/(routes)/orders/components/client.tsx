"use client"
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {AppList} from "@/components/ui/alert-list";
import {columns, OrdersColumn} from "@/app/(dashboard)/[storeId]/(routes)/orders/components/column";


interface OrderClientProps{
    data:OrdersColumn[]
}
const OrderClient:React.FC<OrderClientProps>=({
    data
}) =>{
    return(
        <>
                <Heading title={`Orders(${data.length})`} description="Manage Orders For Your Store" />
            <Separator/>
            <DataTable searchKey={"products"} columns={columns} data={data}/>
        </>
    );
}
export default OrderClient;