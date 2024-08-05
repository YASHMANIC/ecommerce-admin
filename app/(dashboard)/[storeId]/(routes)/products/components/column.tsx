"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/app/(dashboard)/[storeId]/(routes)/products/components/cell-action";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name:string
  price:string
  category:string
  size:string
  brand:string
  isFeatured:boolean
  isArchieved:boolean
  createdAt:string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
    {
    accessorKey: "price",
    header: "Price",
  },
    {
    accessorKey: "category",
    header: "Category",
  },
    {
    accessorKey: "brand",
    header: "Brand",
  },
    {
    accessorKey: "size",
    header: "Size",
  },
    {
    accessorKey: "isArchieved",
    header: "Archieved",
  },
    {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:"actions",
    cell: ({row}) => <CellAction data={row.original}/>
  },
]
