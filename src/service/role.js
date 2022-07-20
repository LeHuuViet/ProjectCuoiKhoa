import { API } from "./api";

export const getRole = async () => {
  try {
    const result = await API.get("/apiAdmin/commons/role", {
    });
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
