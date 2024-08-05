import prismadb from "@/lib/prismadb";
import {format} from "date-fns";
import {BrandColumn} from "@/app/(dashboard)/[storeId]/(routes)/brands/components/column";
import BrandClient from "@/app/(dashboard)/[storeId]/(routes)/brands/components/client";

const BrandsPage = async ({
    params
                        }:{params:{storeId:string}}) =>{
    const brands = await prismadb.brand.findMany({
        where:{
            storeId:params.storeId
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    // @ts-ignore
    const formattedBrands:BrandColumn[] = brands.map((item)=>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt: format(item.createdAt,"MMMM do,yyyy")
    }))
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BrandClient data={formattedBrands}/>
            </div>
        </div>
    );
}
export default BrandsPage;