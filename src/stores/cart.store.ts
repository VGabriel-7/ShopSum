import { create } from 'zustand'
import type { ICartProduct, ICartStore } from '../interfaces/interfaces'

const useCartStore = create<ICartStore>((set) => ({
  products: [],
  totalPrice: 0,
  totalProducts: 0,
  addProduct: (item: ICartProduct) => set((state) => ({
    products: [...state.products, item],
    totalPrice:
      state.products.reduce((total, i) => total + i.price * i.quantity, 0) + (item.price * item.quantity),
    totalProducts:
      state.products.reduce((total, i) => total + i.quantity, 0) + item.quantity
  })),
  deleteProduct: (item) => set((state) => {
    const products = [...state.products.filter((i) => item.id != i.id)]
    return {
      products,
      totalPrice: products.reduce((total, i) => total + i.price * i.quantity, 0),
      totalProducts: state.totalProducts - item.quantity
    }
  }),
  editProduct: (editedItem: ICartProduct) => set((state) => {
    return {
      products: state.products.map((item) => item.id === editedItem.id ? {...item, ...editedItem} : item),
      totalPrice: state.products.reduce((total, i) => i.id === editedItem.id ? total :total + i.price * i.quantity, 0) + (editedItem.price * editedItem.quantity),
      totalProducts: state.products.reduce((total, i) => i.id === editedItem.id ? total : total + i.quantity, 0) + editedItem.quantity
    }
  }),
}))

export default useCartStore;
