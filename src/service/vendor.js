import { API } from "./api";

export const getVendor = async (search) => {
  try {
    const result = await API.post("/apiAdmin/vendors/list", {
      search,
    });
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
