import "./UserList.scss";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { userListColumns } from "./UserList.utils";
import { getUserList } from "../../service/userlist";

function UserList() {
  const initData = {
    search: "",
    memberships: [],
    types: [],
    status: [],
    country: "",
    states: "",
    address: "",
    phone: "",
  };

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [checkAll, setCheckAll] = useState([false]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(25);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [states, setStates] = useState("");
  const [status, setStatus] = useState([]);
  const [types, setTypes] = useState([]);
  const [state, setState] = useState(initData);
  const [dateType, setDateType] = useState("");

  const axiosAllUserList = async () => {
    const [
      search,
      memberships,
      types,
      status,
      country,
      states,
      address,
      phone,
      pageCount,
    ] = state;
    const [data, error] = await getUserList({
      page,
      count: pageCount,
      search,
      memberships,
      types,
      status,
      country,
      states,
      address,
      phone,
      date_type: dateType,
      date_range: dateRange,
      sort: "last-login",
      order_by: "DESC",
      tz: "7",
    });
    console.log("@@", data);
    setData(data.data);
    setTotalItems(data.recordsFiltered);
    const itemOffSet = data.recordsFiltered / itemsPerPage;
    setTotalPages(Math.round(itemOffSet));
  };

  useEffect(() => {
    axiosAllUserList();
  }, [
    state.search,
    state.country,
    state.states,
    state.address,
    state.phone,
    state.memberships,
    state.types,
    state.status,
    page,
    state.pageCount,
  ]);

  const onPerPageChange = (value) => {
    setItemsPerPage(value);
    setState((state) => ({ ...state, pageCount: +value }));
    setPage(1);
  };

  const handleChangePage = (e) => {
    setPage(e.selected + 1);
  };

  const handleCheckAll = () => {
    var checkboxes = document.getElementsByName("checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
    setCheckAll(false);
  };

  const handleUnCheckAll = () => {
    var checkboxes = document.getElementsByName("checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setCheckAll(true);
  };

  const handleCheckAndUnCheck = () => {
    if (checkAll === true) handleCheckAll();
    else handleUnCheckAll();
  };

  return (
    <div className="UserList">
      <div style={{ marginBottom: "40px" }}>
        <h2 className="userlist-title">Search for users</h2>
        <form className="border">
          <ul className="userlist-search-1 d-flex">
            <li style={{ width: "50%", marginRight: "20px" }}>
              <input
                className="userlist-search-input border width100"
                placeholder="Search keywords"
              />
            </li>
            <li style={{ width: "50%", marginRight: "20px" }}>
              <select
                className="userlist-select border width100"
                defaultValue={"All memberships"}
              >
                <option>General</option>
                <option>General</option>
              </select>
            </li>
            <li style={{ width: "50%", marginRight: "20px" }}>
              <select className="userlist-select border width100">
                All user types
              </select>
            </li>
            <li style={{ width: "35%", marginRight: "20px" }}>
              <select className="userlist-select border width100"></select>
            </li>
            <li>
              <div>
                <button className="userlist-button width100">Search</button>
              </div>
            </li>
          </ul>
          <div className="line-1"></div>
          <ul className="userlist-search-2 d-flex">
            <li className="userlist-search-2-1">
              <ul>
                <li className="d-flex space-between">
                  <label>Country</label>
                  <select
                    className="userlist-select border"
                    style={{ width: "100%" }}
                  ></select>
                </li>
                <li className="d-flex space-between">
                  <label>State</label>
                  <input className="userlist-search-input border" />
                </li>
                <li className="d-flex space-between">
                  <label>Address</label>
                  <input className="userlist-search-input border" />
                </li>
                <li className="d-flex space-between">
                  <label>Phone</label>
                  <input className="userlist-search-input border" />
                </li>
              </ul>
            </li>
            <li className="userlist-search-2-2">
              <div className="d-flex">
                <label>User activity</label>
                <div>
                  <ul className="d-flex">
                    <li>
                      <input type={"checkbox"} />
                      <label>Register</label>
                    </li>
                    <li>
                      <input type={"checkbox"} />
                      <label>Last Logged in</label>
                    </li>
                  </ul>
                  <input
                    className="userlist-search-input border"
                    placeholder="Enter date range"
                    style={{ width: "300px", marginTop: "10px" }}
                  />
                </div>
              </div>
            </li>
          </ul>
        </form>
      </div>
      <div>
        <button className="userlist-button">Add User</button>
      </div>
      <div className="userlist-table">
        <DataTable
          keyField="id"
          columns={userListColumns(handleCheckAndUnCheck)}
          data={data}
        />
        <div className="pagination-bar">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handleChangePage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
          />
          <div style={{ color: "white" }}>{totalItems} items</div>
          <select
            className="pagiSelect"
            onChange={(e) => onPerPageChange(e.target.value)}
            defaultValue={25}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default UserList;
