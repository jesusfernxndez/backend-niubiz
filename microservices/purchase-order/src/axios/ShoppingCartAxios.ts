type ProductToShoppingCart = {
  idProduct: string;
  description: string;
  url: string;
  price: number;
  quantity: number;
};

export interface ShoppingCartAxiosDTO {
  shoppingNumber: string;
  products: ProductToShoppingCart[];
}
