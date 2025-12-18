"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoAddOutline  } from "react-icons/io5"
import { IoIosRemove } from "react-icons/io";
import useCartStore from "@/src/stores/cart.store"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { FormSchemaCreateProduct, type FormDataCreate } from "./schemas"
import ErrorMessage from "../Form/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from "nanoid"
import { formatter } from "@/src/utils/formatter"
import { useEffect, useState } from "react"

export function AddProductDialog() {
  const { addProduct } = useCartStore()
  const methods = useForm<FormDataCreate>({
    resolver: zodResolver(FormSchemaCreateProduct),
    defaultValues: {
      name: "",
      quantity: 0,
      price: 0
    }
  })
  const formattedPrice = formatter.format(methods.watch("price") * methods.watch("quantity"))

  const onSubmit = () => {
    addProduct({
      id: nanoid(),
      name: methods.getValues("name"),
      quantity: methods.getValues("quantity"),
      price: methods.getValues("price"),
    })

    methods.reset()
  }

  const handleChangeQuantity = (operation: "add" | "sub") => {
    const cuurQtd = methods.getValues("quantity")
    return {
      add: () => methods.setValue("quantity", cuurQtd + 1),
      sub: () => methods.setValue("quantity", cuurQtd > 0 ? cuurQtd - 1 : 0),
    }[operation]()
  }

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Dialog>
      <FormProvider {...methods}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-shops-primary flex items-center justify-center gap-2 p-2 w-full font-bold  rounded-md text-shops-base"
            >
              <IoAddOutline/> Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="md:w-[425px] w-full p-0 border-0 rounded-t-3xl [&>button]:text-white [&>button]:hover:text-white">
            <DialogHeader className="w-full bg-shops-primary rounded-t-2xl flex items-start p-4 text-shops-base">
              <DialogTitle>Adicionar Produto</DialogTitle>
            </DialogHeader>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="grid gap-4 p-2">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Nome do Produto</Label>
                    <Input {...methods.register("name")} value={methods.watch("name")} id="name-1" name="name" className="focus:border-shops-primary" placeholder="Ex 1kg Arroz" />
                    <ErrorMessage error={methods.formState.errors.name?.message} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="qtd">Quantidade</Label>
                    <div className="flex gap-2">
                      <Button type="button" onClick={() => handleChangeQuantity("sub")} variant="secondary"><IoIosRemove/></Button>
                      <Input id="qtd" {...methods.register("quantity")} min={0} name="quantity" type="number" className="text-center font-medium" />
                      <Button type="button" onClick={() => handleChangeQuantity("add")} variant="secondary"><IoAddOutline/></Button>
                    </div>
                    <ErrorMessage error={methods.formState.errors.quantity?.message} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price">Preço Unitário</Label>
                    <div className="flex gap-2">
                      <h1 className="text-3xl font-medium text-shops-text-dark opacity-80">R$</h1>
                      <Input id="price" step="any" {...methods.register("price")} name="price" type="number" />
                      <ErrorMessage error={methods.formState.errors.price?.message} />
                    </div>
                  </div>
                  <div className="flex justify-between px-3 py-5 bg-[#edf1ff] rounded-md items-center text-shops-text-dark border-[1px] border-[#e0e8ff]">
                    <h2 className="text-sm opacity-80 font-medium">Subtotal</h2>
                    <h1 className="text-2xl text-shops-primary font-bold">{formattedPrice === "R$ NaN" ? "0,00" : formattedPrice}</h1>
                  </div>
                </div>
                <DialogFooter className="p-2 gap-3 flex-row justify-center">
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full active:shadow-[inset_1px_0_4px_theme(colors.shops.text-dark/0.35),inset_-1px_0_4px_theme(colors.shops.text-dark/0.35)]">Cancelar</Button>
                  </DialogClose>
                    <Button type="submit" className="bg-shops-primary active:shadow-[inset_1px_0_4px_theme(colors.shops.base/0.35),inset_-1px_0_4px_theme(colors.shops.base/0.35)] w-full font-bold text-shops-base">Adicionar</Button>
                </DialogFooter>
              </form>
          </DialogContent>
      </FormProvider>
    </Dialog>
  )
}
