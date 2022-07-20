import { API } from "./api";

export const getDetailUserList = async ({id}) => {
  try {
    const result = await API.get("/apiAdmin/vendors/list", {id});
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
