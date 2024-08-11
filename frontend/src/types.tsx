export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdEmployee: any[];
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  age: string;
  userId: string;
};
