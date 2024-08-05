"use client"

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Store} from "@prisma/client";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useParams,useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusCircle, StoreIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";

type PopOverTriggerProps =React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopOverTriggerProps {
    items:Store[]
}

export default function StoreSwitcher ({
    className,
    items = []
                                       }:StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams()
    const router= useRouter()
    const formattedItems = items.map((item)=>({
        label:item.name,
        value:item.id
    }))
    const currentStore = formattedItems.find((item)=>item.value === params.storeId)
    const [open,setOpen] = useState(false)
    const onStoreSelect = (store:{label:string,value:string}) => {
        setOpen(true);
        router.push(`/${store.value}`)
    }
    return(
       <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline"
                        size="sm"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a Store"
                        className={cn("w-[200px] justify-between",className)}>
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-75 shrink-0" />
                </Button>
            </PopoverTrigger>
           <PopoverContent className="w-[200px] p-0">
               <Command>
                   <CommandList>
                        <CommandInput placeholder="Search a Store" />
                        <CommandEmpty>No Stores Found .</CommandEmpty>
                       <CommandGroup heading="Stores">
                            {formattedItems.map((store)=>(
                                    <CommandItem key={store.value} onSelect={()=> onStoreSelect(store)}
                                            className="text-sm">
                                        <StoreIcon className="mr-2 h-5 w-5"/>
                                        {store.label}
                                        <Check className={cn("ml-auto h-4 w-4",
                                        currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
                                    </CommandItem>
                                ))}
                       </CommandGroup>
                   </CommandList>
                  <CommandSeparator/>
                    <CommandList>
                         <CommandGroup>
                             <CommandItem onSelect={()=>{
                                 setOpen(false)
                                 storeModal.onOpen()}}>
                                <PlusCircle className="mr-2 h-5 w-5"/>
                                 Create a Store
                             </CommandItem>
                         </CommandGroup>
                     </CommandList>
               </Command>
           </PopoverContent>
       </Popover>
    )
}
// <PopoverContent className="w-[200px] p-0">
//                 <Command>
//                     <CommandList>
//                         <CommandInput placeholder="Search a Store" />
//                         <CommandEmpty>No Stores Found .</CommandEmpty>
//                             <CommandGroup heading="Stores">
//                                 {formattedItems.map((store)=>(
//                                     <CommandItem key={store.value} onSelect={()=> onStoreSelect(store)}
//                                             className="text-sm">
//                                         <StoreIcon className="mr-2 h-5 w-5"/>
//                                         {store.label}
//                                         <Check className={cn("ml-auto h-4 w-4",
//                                         currentStore?.value === store.value ? "opacity-100" : "opacity-0")} />
//                                     </CommandItem>
//                                 ))}
//                             </CommandGroup>
//                     </CommandList>
//                     <CommandSeparator />
//                     <CommandList>
//                         <CommandGroup>
//                             <CommandItem>
//                                 <Button onClick={()=>{
//                                 setOpen(false)
//                                 storeModal.onOpen()}}>Hola</Button>
//                             </CommandItem>
//                         </CommandGroup>
//                     </CommandList>
//                 </Command>
//             </PopoverContent>


