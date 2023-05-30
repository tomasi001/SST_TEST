import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
});

export const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const confirmationCodeSchema = yup.object().shape({
  confirmationCode: yup.string().required("Confirmation Code is required"),
});

export const billingFormValidationSchema = yup.object().shape({
  storage: yup
    .number()
    .typeError("Storage must be a number")
    .positive("Storage must be a positive number")
    .required("Storage is required"),
  cardHolder: yup.string().required("Card Holder's Name is required"),
  // cardNumber: yup.string().required("Card Number is required"),
  // expiryDate: yup.string().required("Expiry Date is required"),
  // cvv: yup.string().required("CVV is required"),
  // pin: yup.string().required("Card Pin is required"),
});
