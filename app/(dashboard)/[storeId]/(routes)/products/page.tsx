import prismadb from "@/lib/prismadb";
import {format} from "date-fns";
import {formatter} from "@/lib/utils";
import {ProductColumn} from "@/app/(dashboard)/[storeId]/(routes)/products/components/column";
import ProductClient from "@/app/(dashboard)/[storeId]/(routes)/products/components/client";

const ProductsPage = async ({
    params
                        }:{params:{storeId:string}}) =>{
    const products = await prismadb.product.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
          category:true,
          size:true,
          brand:true
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    // @ts-ignore
    const formattedProducts:ProductColumn[] = products.map((item)=>({
        id:item.id,
        name:item.name,
        isFeatured:item.isFeatured,
        isArchieved:item.isArchieved,
        price: formatter.format(item.price.toNumber()),
        category:item.category.name,
        size:item.size.name,
        brand:item.brand.name,
        createdAt: format(item.createdAt,"MMMM do,yyyy")
    }))
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts}/>
            </div>
        </div>
    );
}
export default ProductsPage;