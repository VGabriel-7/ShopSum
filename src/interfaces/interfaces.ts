export interface ICartProduct {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICartStore {
  products: Array<ICartProduct>;
  totalPrice: number;
  totalProducts: number;
  addProduct: (product: ICartProduct) => void;
  deleteProduct: (product: ICartProduct) => void;
  editProduct: (editedInfo: ICartProduct) => void;
}
