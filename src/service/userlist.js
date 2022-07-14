import { API } from "./api";

export const getUserList = async ({
    page,
    count,
    search,
    category,
    stock_status,
    availability,
    vendor,
    sort,
    order_by,
    search_type,
}) => {
  try {
    const result = await API.post("/apiAdmin/users/list", {
        page,
        count,
        search,
        category,
        stock_status,
        availability,
        vendor,
        sort,
        order_by,
        search_type,
    });
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};
