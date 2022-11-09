import { Obj } from '@popperjs/core';

export interface LoginRequest {
  username: string;
  password: string;
}


export interface UserRegisterRequest {
  cccd: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: string;
  address: string;
  phoneNumber: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  token: string;
}
