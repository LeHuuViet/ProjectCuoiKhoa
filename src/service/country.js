import { API } from "./api";

export const getCountry = async (code) => {
  try {
    const result = await API.get("/apiAdmin/commons/country", {
      code,
    });
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
