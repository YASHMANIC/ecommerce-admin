import BillboardClient from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/client";
import prismadb from "@/lib/prismadb";
import {BillboardColumn} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/column";
import {format} from "date-fns";

const BillboardsPage = async ({
    params
                        }:{params:{storeId:string}}) =>{
    const billboards = await prismadb.billboard.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    // @ts-ignore
    const formattedBillboards:BillboardColumn[] = billboards.map((item)=>({
        id:item.id,
        label:item.label,
        createdAt: format(item.createdAt,"MMMM do,yyyy")
    }))
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards}/>
            </div>
        </div>
    );
}
export default BillboardsPage;