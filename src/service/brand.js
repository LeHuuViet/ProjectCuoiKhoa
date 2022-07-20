import { API } from "./api";

export const getBrand = async ({}) => {
  try {
    const result = await API.get("/apiAdmin/brands/list", {});
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};

