import "./UserList.scss";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { userListColumns } from "./UserList.utils";
import { getUserList } from "../../service/userlist";
import { Select, Option, Switch, CheckOutlined, CloseOutlined, OutGroup, DatePicker, Space } from "antd";
import "antd/dist/antd.min.css";
import { getCountry } from "../../service/country";
import { getRole } from "../../service/role";
import ReactDatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import moment from "moment";

function UserList() {
  const {RangePicker}=DatePicker
  const dateFormat = 'YYYY/MM/DD'
  const initData = {
    page: 1,
    count: 25,
    search: "",
    memberships: [],
    types: [],
    status: [],
    country: "",
    state: "",
    address: "",
    phone: "",
    dateType: "R",
    dateRange: [],
    sort: "last_login",
    order_by: "DESC",
    tz: 7,
    pageCount: 25,
  };

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [checkAll, setCheckAll] = useState([false]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(25);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [administratorList, setAdministratorList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState([]);
  const [types, setTypes] = useState([]);
  const [button, setButton] = useState(initData);
  const [dateType, setDateType] = useState("");
  const [checked, setChecked] = useState(true);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const axiosAllUserList = async () => {
    const {
      search,
      memberships,
      types,
      status,
      country,
      state,
      address,
      phone,
      pageCount,
      dateType,
    } = button;
    const [data, error] = await getUserList({
      page,
      count: pageCount,
      search,
      memberships,
      types,
      status,
      country,
      state,
      address,
      phone,
      date_type: dateType,
      date_range: dateRange,
      sort: "last-login",
      order_by: "DESC",
      tz: "7",
    });
    const [countryList, error2] = await getCountry({});
    const [roleList, error3] = await getRole({});
    setCountryList(countryList.data);
    setAdministratorList(roleList.data.administrator);
    setCustomerList(roleList.data.customer);
    setData(data.data);
    setTotalItems(data.recordsFiltered);
    const itemOffSet = data.recordsFiltered / itemsPerPage;
    setTotalPages(Math.round(itemOffSet))
  };

  useEffect(() => {
    axiosAllUserList();
  }, [
    button.search,
    button.country,
    button.state,
    button.address,
    button.phone,
    button.memberships,
    button.types,
    button.status,
    page,
    button.pageCount,
    button.dateType,
  ]);


  const onPerPageChange = (value) => {
    setItemsPerPage(value);
    setButton((state) => ({ ...state, pageCount: +value }));
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

  const handleSearch = (e) => {
    e.preventDefault();
    const checkValue = [
      { type: "register", isCheck: checked.register },
      { type: "lastLogin", isCheck: checked.lastLogin },
    ];
    const checkRadio = checkValue
      .filter((item) => item.isCheck)
      .map((item) => item.type)
      .join(",");

    setButton((button) => ({
      ...button,
      search,
      address,
      country,
      dateRange,
      dateType,
      memberships,
      phone,
      state,
      status,
      types,
      checkRadio,
    }));
  };

  const handleChangeMembershipAndTypes = (e) => {
    const { value, checked, name } = e.target;
    if (name === "membership-type") {
      if (checked) {
        setMemberships((membership) => [...membership, value]);
      } else
        setMemberships((membership) => membership.filter((e) => e !== value));
    } else {
      if (checked) {
        setTypes((type) => [...type, value]);
      } else setTypes((type) => type.filter((e) => e !== value));
    }
  };

  return (
    <div className="UserList">
      <div style={{ marginBottom: "40px" }}>
        <h2 className="userlist-title">Search for users</h2>
        <form className="border" onSubmit={handleSearch}>
          <ul className="userlist-search-1 d-flex">
            <li style={{ width: "50%", marginRight: "20px" }}>
              <input
                className="userlist-search-input border width100"
                placeholder="Search keywords"
                onChange={(e) => setSearch(e.target.value)}
              />
            </li>
            <li
              className="membership-list"
              style={{
                width: "50%",
                marginRight: "20px",
                position: "relative",
              }}
            >
              <select
                defaultValue={"All memberships"}
                placeholder="All memberships"
                style={{width: '100%'}}
                mode='multiple'
                className="userlist-search-input border width100"
                onChange={(e) => setMemberships(...[], [e.target.value])}
              >
                <option value=''>All memberships</option>
              </select>
              <div
                className="search-membership-value"
                style={{ position: "absolute" }}
              >
                <div>
                  <label>Memberships</label>
                  <div htmlFor="general-1">
                    <input
                      type="checkbox"
                      name="membership-type"
                      value="M_4"
                      onChange={handleChangeMembershipAndTypes}
                      id="general-1"
                    />
                    <label htmlFor="general-1">General</label>
                  </div>
                </div>
                <div>
                  <label>Pending Memberships</label>
                  <div htmlFor="general-2">
                    <input
                      type="checkbox"
                      name="membership-type"
                      value="P_4"
                      onChange={handleChangeMembershipAndTypes}
                      id="general-2"
                    />
                    <label htmlFor="general-2">General</label>
                  </div>
                </div>
              </div>
            </li>
            <li style={{ width: "50%", marginRight: "20px" }}>
              <select
                className="userlist-select border width100"
                defaultValue="All User Types"
                onChange={(e) =>
                  setTypes(...[], e.target.value ? [e.target.value] : [])
                }
              >
                <option value="">All User Types</option>
                <optgroup label="Memberships" />
                {administratorList &&
                  administratorList.length > 0 &&
                  administratorList.map((item) => {
                    return (
                      <option type={"checkbox"} value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                <optgroup label="Pending Memberships" />

                {customerList &&
                  customerList.length > 0 &&
                  customerList.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </li>
            <li style={{ width: "35%", marginRight: "20px" }}>
              <select
                className="userlist-select border width100"
                defaultValue={"Any Status"}
                onChange={(e) =>
                  setStatus(...[], e.target.value ? [e.target.value] : [])
                }
              >
                <option value="">Any Status</option>
                <option value="E">Enable</option>
                <option value="D">Disable</option>
                <option value="U">Unapproved vendor</option>
              </select>
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
                    defaultValue={"Select Country"}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countryList &&
                      countryList.length > 0 &&
                      countryList.map((item) => {
                        return (
                          <option value={item.code} key={item.id}>
                            {item.country}
                          </option>
                        );
                      })}
                  </select>
                </li>
                <li className="d-flex space-between">
                  <label>State</label>
                  <input
                    className="userlist-search-input border"
                    onChange={(e) => setState(e.target.value)}
                  />
                </li>
                <li className="d-flex space-between">
                  <label>Address</label>
                  <input
                    className="userlist-search-input border"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </li>
                <li className="d-flex space-between">
                  <label>Phone</label>
                  <input
                    className="userlist-search-input border"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </li>
              </ul>
            </li>
            <li className="userlist-search-2-2">
              <div className="d-flex">
                <label>User activity</label>
                <div>
                  <ul className="d-flex">
                    <li>
                      <input
                        name="register"
                        value="R"
                        type={"radio"}
                        id="register"
                        defaultChecked={true}
                        checked={checked}
                        onChange={(e) => {
                          setChecked(!checked);
                          setDateType(e.target.value);
                        }}
                      />
                      <label htmlFor="register">Register</label>
                    </li>
                    <li>
                      <input
                        name="lastLogin"
                        value="L"
                        type={"radio"}
                        id="last-login"
                        defaultChecked={false}
                        checked={!checked}
                        onChange={(e) => {
                          setChecked(!checked);
                          setDateType(e.target.value);
                        }}
                      />
                      <label htmlFor="last-login">Last Logged in</label>
                    </li>
                  </ul>
                  <Space>
                        <RangePicker 
                        format={dateFormat}
                        className="userlist-search-input border"
                        onChange={(update) => {
                      setDateRange(update);
                    }}/>
                  </Space>
                </div>
              </div>``
            </li>
          </ul>
        </form>
      </div>
      <div>
        <Link to="/pages/add-users">
          <button className="userlist-button">Add User</button>
        </Link>
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
      <div className="sticky-panel">
        <div>
          <div>
            <button className="sticky-panel-button">Remove selected</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
