import { API } from "./api";

export const getUserList = async ({
  page,
  count,
  search,
  memberships,
  types,
  status,
  country,
  state,
  address,
  phone,
  date_type,
  date_range,
  sort,
  order_by,
  tz,
}) => {
  try {
    const result = await API.post("/apiAdmin/users/list", {
      page,
      count,
      search,
      memberships,
      types,
      status,
      country,
      state,
      address,
      phone,
      date_type,
      date_range,
      sort,
      order_by,
      tz,
    });
    return [result.data, null];
  } catch (error) {
    return [null, error];
  }
};