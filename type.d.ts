interface TypographyType {
  regular?: string;
  medium?: string;
  bold?: string;
  JosefinSansRegular?: string;
}
interface ColorType {
  primary: string;
  black: string;
  white: string;
}

interface LoginBodyType {
  email: string;
  password: string;
}
interface RegisterBodyType {
  firstName: string;
  lastName: string;
  cellPhone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface PaymentBodyType {
  package: string;
}
interface AuthType {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
interface updateProfileBodyType {
  firstName?: string;
  lastName?: string;
}
interface updateBodyType {
  data?: updateProfileBodyType;
  auth?: AuthType;
}

interface verificationBodyType {
  type: string;
}
interface verificationSubmitBodyType {
  type: string;
  code: string;
}
