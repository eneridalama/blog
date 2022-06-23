export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
}

export class UserModelClass implements UserModel {
  id = 0;
  firstName = '';
  lastName = '';
  email = '';
  token = '';
  role = '';
}
