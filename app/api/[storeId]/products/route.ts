import {NextResponse} from "next/server";
import {auth} from  '@clerk/nextjs/server'
import prismadb from "@/lib/prismadb";

export async function POST(
    req:Request,
    {params}:{params : {storeId:string}}){
    try{
        const {userId} = auth();
        const body = await req.json()
        const {name,price,categoryId,sizeId,images,brandId,isFeatured,isArchieved} = body
        if(!userId){
            return new NextResponse("Unauthenticated",{status:401})
        }
        if(!name)
        {
            return new NextResponse("Name is required",{status:400})
        }
         if(!price)
        {
            return new NextResponse("Price is required",{status:400})
        }
         if(!categoryId)
        {
            return new NextResponse("Category is required",{status:400})
        }
         if(!sizeId)
        {
            return new NextResponse("Size is required",{status:400})
        }
         if(!brandId)
        {
            return new NextResponse("Brand is required",{status:400})
        }
         if(!images || !images.length)
        {
            return new NextResponse("Images is required",{status:400})
        }
          if(!params.storeId)
        {
            return new NextResponse("Store Id is required",{status:400})
        }

          const storeByUserId = await prismadb.store.findFirst({
              where:{
                  id:params.storeId,
                  userId
              }
          })

        if(!storeByUserId){
            return new NextResponse("UnAuthorized is required",{status:403})
        }


        const product = await prismadb.product.create({
            data:{
                name,price,categoryId,sizeId,brandId,isFeatured,isArchieved,
                storeId:params.storeId,
                images:{
                createMany:{
                    data:[
                        ...images.map((image:{url:string}) => image)
                    ]
                }
                }
            }
        })
        return NextResponse.json(product)
    }catch(err){
        console.log("[PRODUCT_POST]",err);
        return new NextResponse("Internal server error",{status:500})
    }
}

export async function GET(
    req:Request,
    {params}:{params : {storeId:string}}){
    try{
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const brandId = searchParams.get("brandId") || undefined
        const isFeatured = searchParams.get("isFeatured")
          if(!params.storeId)
        {
            return new NextResponse("Store Id is required",{status:400})
        }
        const products = await prismadb.product.findMany({
            where:{
                storeId:params.storeId,
                categoryId,
                sizeId,
                brandId,
                isFeatured : isFeatured ? true : undefined,
            },
            include:{
                images:true,
                category : true,
                size: true,
                brand: true,
            },
            orderBy:{
                createdAt:'desc',
            }
        })
        return NextResponse.json(products)
    }catch(err){
        console.log("[PRODUCT_GET]",err);
        return new NextResponse("Internal server error",{status:500})
    }
}