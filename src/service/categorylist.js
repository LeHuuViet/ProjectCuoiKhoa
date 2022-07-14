import { API } from "./api";

export const getCategory = async ({}) => {
  try {
    const result = await API.post("/api/categories/list", {});
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
