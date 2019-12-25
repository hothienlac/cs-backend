// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta


export interface IPersonalInformation {
  userID?: string;
  fullName?: string;
  dateOfBirth?: string;
  degree?:
    "Bachelor" |
    "Master" |
    "Doctor" |
    "Assistant Professor" |
    "Associate Professor" |
    "Professor";
  gender?: "Male" | "Female";
  currentPosition?: string;
  idCardNumber?: string;
  department?: string;
  organization?: string;
  organizationAddress?: string;
  province?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  workingEmail?: string;
  fax?: string;
  alternativeEmail?: string;
  bankAccountNumber?: string;
  bank?: string;
  bankBranch?: string;
}
