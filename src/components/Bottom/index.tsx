"use client"

import useCartStore from "@/src/stores/cart.store"
import { formatter } from "@/src/utils/formatter"

export default function Bottom() {
  const {totalPrice, totalProducts} = useCartStore()

  return (
    <div className="p-4 flex justify-between text-shops-base w-[95%] md:w-[80%] absolute bottom-0 bg-shops-primary rounded-t-md">
      <div>
        <p className="text-sm">
          Total de itens
        </p>
        <h1 className="text-xl font-medium">
          {totalProducts} produtos
        </h1>
      </div>

      <div>
        <p className="text-sm">
          Total da Compra
        </p>
        <h1 className="text-2xl font-medium">
          {formatter.format(totalPrice)}
        </h1>
      </div>
    </div>
  )
}