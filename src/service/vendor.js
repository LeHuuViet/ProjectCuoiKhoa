import { API } from "./api";

export const getVendor = async ({}) => {
  try {
    const result = await API.get("/apiAdmin/vendors/list", {});
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
