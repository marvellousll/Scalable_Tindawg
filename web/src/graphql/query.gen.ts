/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMatches
// ====================================================

export interface GetMatches_getMatches_user {
  __typename: "User";
  id: number;
}

export interface GetMatches_getMatches {
  __typename: "UserInfo";
  user: GetMatches_getMatches_user;
  dogName: string;
  dogAge: number;
  dogBreed: string;
  location: string;
  bio: string | null;
  contact: string | null;
  facebook: string | null;
  linkedin: string | null;
  imageURL: string | null;
}

export interface GetMatches {
  getMatches: (GetMatches_getMatches | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPotential
// ====================================================

export interface GetPotential_getPotentialMatches_user {
  __typename: "User";
  id: number;
}

export interface GetPotential_getPotentialMatches {
  __typename: "UserInfo";
  user: GetPotential_getPotentialMatches_user;
  dogName: string;
  dogAge: number;
  dogBreed: string;
  location: string;
  bio: string | null;
  contact: string | null;
  facebook: string | null;
  linkedin: string | null;
  imageURL: string | null;
}

export interface GetPotential {
  getPotentialMatches: (GetPotential_getPotentialMatches | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SwipeLeft
// ====================================================

export interface SwipeLeft {
  swipeLeft: boolean;
}

export interface SwipeLeftVariables {
  userId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SwipeRight
// ====================================================

export interface SwipeRight {
  swipeRight: boolean;
}

export interface SwipeRightVariables {
  userId: number;
}

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

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
