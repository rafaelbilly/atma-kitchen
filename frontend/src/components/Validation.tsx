import {
  isEmailAvailable,
  isEmailVerified,
  isUsernameAvailable,
} from "../lib/repository/AuthRepository";

export const ValidationLogin = async (values: any) => {
  const errors = {
    username: "",
    password: "",
  };

  const username_pattern = /^[a-zA-Z0-9]{3,30}$/;
  const password_pattern = /^.{5,}$/;

  if (values.username === "") {
    errors.username = "Username is required!";
  } else if (!username_pattern.test(values.username)) {
    errors.username = "Username must be alphanumeric and 3-30 characters long!";
  } else if (!(await isEmailVerified(values.username))) {
    errors.username = "This account is not verified! Please check your email!";
  }

  if (values.password === "") {
    errors.password = "Password is required!";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password must be alphanumeric and 5 characters long!";
  }

  return errors;
};

export const ValidationRegister = async (values: any) => {
  const errors = {
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    addressLabel: "",
    birthDate: "",
    gender: "",
  };

  const name_pattern = /^[a-zA-Z ]{1,30}$/;
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const username_pattern = /^[a-zA-Z0-9]{3,30}$/;
  const password_pattern = /^.{5,}$/;
  const address_pattern = /^[a-zA-Z0-9 ]{1,100}$/;
  const addressLabel_pattern = /^[a-zA-Z0-9 ]{1,30}$/;
  const gender_pattern = /^(male|female)$/;

  if (values.name === "") {
    errors.name = "Name is required!";
  } else if (!name_pattern.test(values.name)) {
    errors.name = "Name must be alphabetic and 1-30 characters long!";
  }

  if (values.email === "") {
    errors.email = "Email is required!";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Email must be valid!";
  } else if (!(await isEmailAvailable(values.email))) {
    errors.email = "Email is already taken!";
  }

  if (values.username === "") {
    errors.username = "Username is required!";
  } else if (!username_pattern.test(values.username)) {
    errors.username = "Username must be alphanumeric and 3-30 characters long!";
  } else if (!(await isUsernameAvailable(values.username))) {
    errors.username = "Username is already taken!";
  }

  if (values.password === "") {
    errors.password = "Password is required!";
  } else if (!password_pattern.test(values.password)) {
    errors.password = "Password must be alphanumeric and 5 characters long!";
  }

  if (values.phone === "") {
    errors.phone = "Phone is required!";
  }
  if (!values.phone || values.phone.length < 10 || values.phone.length > 15) {
    errors.phone = "Phone must be numeric and 10-15 characters long!";
  }

  if (values.address === "") {
    errors.address = "Address is required!";
  } else if (!address_pattern.test(values.address)) {
    errors.address = "Address must be alphanumeric and 1-100 characters long!";
  }

  if (values.addressLabel === "") {
    errors.addressLabel = "Address Label is required!";
  } else if (!addressLabel_pattern.test(values.addressLabel)) {
    errors.addressLabel =
      "Address Label must be alphanumeric and 1-30 characters long!";
  }

  if (values.birthDate === "") {
    errors.birthDate = "Birth Date is required!";
  }

  if (values.gender === "") {
    errors.gender = "Gender is required!";
  } else if (!gender_pattern.test(values.gender)) {
    errors.gender = "Gender must be 'male' or 'female'!";
  }

  return errors;
};

export const ValidationSendEmail = async (values: any) => {
  const errors = {
    email: "",
  };

  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (values.email === "") {
    errors.email = "Email is required!";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Email must be valid!";
  }

  return errors;
};
