interface UserBaseDTO {
  email: string;
  firstName: string;
  lastName: string;
  status?: {
    value: number;
    description: string;
  };
}

export interface UserRequestDTO extends UserBaseDTO {
  auditProperties: {
    userCreate: {
      idUser: string;
      email: string;
    };
  };
}

export interface UserResponseDTO extends UserBaseDTO {
  auditProperties: {
    dateCreate: Date;
    dateUpdate: Date;
    userCreate: {
      email: string;
    };
    activeRecord: boolean;
  };
}
