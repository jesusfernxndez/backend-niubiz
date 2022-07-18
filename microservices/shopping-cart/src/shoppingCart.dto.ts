type Product = {
  id: string;
  quantity: number;
};

export interface UpdateShoppingCartDTO {
  products: Product[];
}

export interface CreateShoppingCartDTO extends UpdateShoppingCartDTO {
  auditProperties: {
    userCreate: {
      idUser: string;
      email: string;
    };
  };
  status?: {
    value: number;
    description: string;
  };
}
