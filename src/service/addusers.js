import { API } from "./api";

export const addUsers = async ({
  email,
  firstName,
  lastName,
  password,
  confirm_password,
  membership_id,
  forceChangePassword,
  taxExempt,
  paymentRailsType,
  access_level,
}) => {
  try {
    const result = await API.post("/apiAdmin/users/create", {
      email,
      firstName,
      lastName,
      password,
      confirm_password,
      membership_id,
      forceChangePassword,
      taxExempt,
      paymentRailsType,
      access_level,
    });
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
