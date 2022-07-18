export interface ProductRequestDTO {
  name: string;
  url: string;
  description: string;
  price: number;
  auditProperties?: {
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
