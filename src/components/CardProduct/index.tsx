"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCartStore from "@/src/stores/cart.store";
import { formatter } from "@/src/utils/formatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiEditLine, RiCheckLine } from "react-icons/ri";
import { FormSchemaEditProduct, type FormDataEdit } from "../Dialog/schemas";
import DialogDeleteProduct from "../DialogDeleteProduct";

interface IProps {
  id: string
  name: string
  quantity: number
  price: number
}

type ProductAction = "incrementQty" | "decrementQty"

export default function CardProduct({
  id,
  name,
  quantity,
  price,
}: IProps) {
  const [isEditable, setIsEditable] = useState(false)
  const { editProduct } = useCartStore()
  const methods = useForm<FormDataEdit>({
    resolver: zodResolver(FormSchemaEditProduct),
  })

  const onSubmit = () => {
    const newPrice = methods.getValues("price")
    if (+newPrice > 0) {
      editProduct({
      id,
        name,
        quantity,
        price: methods.getValues("price"),
      })
    }
    setIsEditable(false)
  }

  const handleEditProduct = (action: ProductAction) => {
    return {
      incrementQty: () => {
        editProduct({id, name, price, quantity: quantity + 1})
      },
      decrementQty: () => {
        editProduct({id, name, price, quantity: quantity > 0 ? quantity - 1 : 0})
      },
    }[action]()
  }

  return (
    <div className="bg-[#f7f8fa] rounded-xl shadow-md text-shops-text-dark md:max-w-[50%] justify-between flex flex-col p-5 max-w-[95%] w-full">
      <div className="flex justify-between border-b-[1px] p-2 border-gray-300">
        <div className="gap-2 flex flex-col">
          <h2 className="font-extrabold">{name}</h2>
          
          <div className="flex gap-2 gap-x-4 items-center bg-[#ededee] p-2 rounded-sm border-[0.5px] border-gray-300">
            <button onClick={() => handleEditProduct("decrementQty")} className="px-3 rounded-sm bg-gray-50 text-2xl active:bg-white hover:bg-white">-</button>
            <h3 className="">{quantity}</h3>
            <button onClick={() => handleEditProduct("incrementQty")} className="px-3 rounded-sm bg-gray-50 text-2xl active:bg-white hover:bg-white">+</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <DialogDeleteProduct name={name} price={price} quantity={quantity} id={id} />
          {isEditable ?
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex gap-2 items-center">
              <Button
                type="submit"
                variant="secondary"
                className="text-green-600 self-end p-2 rounded-md bg-[#e3ffe27c] hover:bg-[#e9ffe2e7] active:bg-[#e9ffe2e7]"
              >
                <RiCheckLine/>
              </Button>
              <Input
                step="any"
                type="number" {...methods.register("price")}
                name="price"
                className="flex items-end pl-5 border-[0.5px] max-w-32 border-gray-300 rounded-md pr-1 py-1 bg-[#ededee]"
              />
            </form>
          :
            <div className="flex gap-2 items-center">
              <Button
                variant="secondary"
                onClick={() => setIsEditable(true)}
                className="text-shops-text-dark self-end p-2 rounded-md hover:bg-[#e5e7ebc0] active:bg-[#e9ffe2e7]"
              >
                <RiEditLine/>
              </Button>
              <div className="flex items-end pl-5 border-[0.5px] max-w-40 border-gray-300 rounded-md pr-1 py-1 bg-[#ededee]">
                {formatter.format(price)}
              </div>
            </div>
          }
        </div>
      </div>

      <div className="flex justify-between p-2 pt-4">
        <h4 className="font-semibold opacity-60">Subtotal</h4>
        <h1 className="text-shops-primary font-black">{formatter.format(price * quantity)}</h1>
      </div>

    </div>
  )
}