
export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IItems {
  _id: string;
  title: string,
  description: string,
  image: string | null,
  price: number,
  category: string,
  salesman: string,
}

export interface ItemMutation {
  title: string,
  description: string,
  image: string | null,
  price: number,
  category: string,
}
 export interface ICategories {
  _id: string;
  name: string,
 }

interface Salesman {
  _id: string;
  displayName: string;
  phoneNumber: string;
}

interface IItemFull {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  salesman: Salesman;
}