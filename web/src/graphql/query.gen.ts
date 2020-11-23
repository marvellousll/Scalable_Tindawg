/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  email: string;
  userType: UserType;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserInfoById
// ====================================================

export interface getUserInfoById_getUserInfoById {
  __typename: "UserInfo";
  dogName: string | null;
  dogAge: number | null;
  dogBreed: string | null;
  bio: string | null;
}

export interface getUserInfoById {
  getUserInfoById: getUserInfoById_getUserInfoById | null;
}

export interface getUserInfoByIdVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getContactById
// ====================================================

export interface getContactById_getUserInfoById {
  __typename: "UserInfo";
  contact: string | null;
  linkedin: string | null;
  facebook: string | null;
  location: string | null;
}

export interface getContactById {
  getUserInfoById: getContactById_getUserInfoById | null;
}

export interface getContactByIdVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getImageById
// ====================================================

export interface getImageById_getUserInfoById {
  __typename: "UserInfo";
  image: string | null;
}

export interface getImageById {
  getUserInfoById: getImageById_getUserInfoById | null;
}

export interface getImageByIdVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeInfo
// ====================================================

export interface ChangeInfo {
  changeUserInfo: boolean;
}

export interface ChangeInfoVariables {
  input: UserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UserInput {
  dogName?: string | null;
  dogAge?: number | null;
  dogBreed?: string | null;
  bio?: string | null;
  contact?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  location?: string | null;
  image?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
