import {PrismaClient} from "@prisma/client"

declare global{
    var prisma:PrismaClient | undefined
}

// @ts-ignore
const prismadb = globalThis.primsa || new PrismaClient()

if(process.env.NODE_ENV !== "production")
{
    globalThis.prisma = prismadb
}
export default prismadb;