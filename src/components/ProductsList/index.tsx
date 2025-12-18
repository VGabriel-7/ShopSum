"use client"

import useCartStore from "@/src/stores/cart.store"
import CardItem from "../CardProduct"

export default function ProductsList() {
  const { products } = useCartStore()
 return (
  <>
    {products.map(({id, name, price, quantity}) => (
      <CardItem key={id} id={id as string} name={name}  price={price} quantity={quantity} />
    ))}
  </>
 )
}