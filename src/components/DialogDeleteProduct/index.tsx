"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { ICartProduct } from "@/src/interfaces/interfaces";
import useCartStore from "@/src/stores/cart.store";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function DialogDeleteProduct(product: ICartProduct) {
  const { deleteProduct } = useCartStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="self-end text-red-400 p-2 rounded-md bg-[#ffe2e27c] hover:bg-[#ffe2e2e7] active:bg-[#ffe2e2e7]">
        <RiDeleteBin6Line/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
            Isso irá excluir permanentemente esse produto do seu carrinho.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteProduct(product)} className="bg-shops-primary text-shops-base">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
</AlertDialog>
  )
}