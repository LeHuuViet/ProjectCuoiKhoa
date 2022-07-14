import { API } from "./api";

export const getProducts = async ({
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
    const result = await API.post("/api/products/list", {
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
