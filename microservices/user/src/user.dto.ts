export interface UserRequestDTO {
  email: string;
  firstName: string;
  lastName: string;
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
