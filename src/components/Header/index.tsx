import { IoCartOutline, IoAddOutline } from "react-icons/io5";
import { AddProductDialog } from "../Dialog/AddProductDialog";

export default function Header() {
  return (
    <div className="w-[95%] md:w-[80%] rounded-b-md shadow-md p-4 bg-shops-secondary flex flex-col gap-4 fixed z-50 top-0">
      <div className="flex gap-2 items-center justify-self-start">
        <div className="p-4 bg-shops-primary rounded-md text-shops-base text-2xl">
          <IoCartOutline />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold font-stretch-125%">ShopSum</h1>
          <p className="text-xs">Calculadora de Compras</p>
        </div>
      </div>
      <AddProductDialog />
    </div>
  )
}