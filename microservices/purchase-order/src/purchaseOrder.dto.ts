export interface PurchaseOrderRequestDTO {
  shoppingCartId: string;
  deliveryDate: string;
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
