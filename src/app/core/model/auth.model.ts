export interface IdToken {
  idToken: string;
}

export interface ResponseModel<MODEL> {
  data: MODEL;
  result: any;
}

export interface AuthModel {
  email: string;
  password: string;
}
export interface SignUpModel extends AuthModel {
  firstName: string;
  lastName: string;
}


