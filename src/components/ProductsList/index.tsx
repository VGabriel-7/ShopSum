"use client"
import useCartStore from "@/src/stores/cart.store"
import CardItem from "../CardProduct"

export default function ProductsList() {
  const { products } = useCartStore()
 return (
  <div className="w-full h-screen overflow-y-auto pb-10 pt-40 flex flex-col items-center gap-3">
    {products.map(({id, name, price, quantity}) => (
      <CardItem key={id} id={id as string} name={name}  price={price} quantity={quantity} />
    ))}
  </div>
 )
}