import { ResponseAPI } from "@interfaces/extend.i";

export interface Login_DTO {
    username: string;
    password: string;
}

export interface Login_API {
    username: string;
    message:  string;
    token:    string;
    status:   boolean;
}

export interface Login_Response extends ResponseAPI<Login_API> {}

export interface SignUp_DTO {
    username:             string;
    password:             string;
    firstname:            string;
    lastname:             string;
    numIdentification:    number;
    typeIdentificationId: string;
    ipsUuid:              string;
    role:                 Role_DTO;
}

interface Role_DTO {
    roles: string[];
}

export interface SignUp_Response extends ResponseAPI<string> {}