import "./UserList.scss";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import moment from "moment";

function UserList() {
  const [data, setData] = useState([]);
  const [checkAll, setCheckAll] = useState([false]);
  useEffect(() => {
    const datas = fetch(
      "https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list",
      {
        method: "POST",
        headers: {
          Authorization:
            "9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

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

  const handleCheckAndUnCheck = (checkAll) => {
    if (checkAll === true) handleCheckAll();
    else handleUnCheckAll();
  };

  const columns = [
    {
      name: (
        <input
          type={"checkbox"}
          name="checkbox"
          onClick={() => {
            handleCheckAndUnCheck(checkAll);
          }}
        />
      ),
      selector: (row) => <input name="checkbox" type={"checkbox"} />,
      width: "50px",
    },
    {
      name: "Login/Email",
      selector: (row) => (
        <div className="d-flex" style={{ flexDirection: "column" }}>
          <a href="" style={{ color: "#007bff" }}>
            {row.vendor}
          </a>
          <label>{row.storeName}</label>
        </div>
      ),
      width: "300px",
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => {
        if (row.fistName == null && row.lastName == null) return "";
        else return row.fistName + " " + row.lastName;
      },
      width: "200px",
      sortable: true,
    },

    {
      name: "Access Level",
      selector: (row) => row.access_level,
      width: "150px",
      sortable: true,
    },
    {
      name: "Products",
      selector: (row) => row.product,
    },
    {
      name: "Orders",
      selector: (row) => row.order.order_as_buyer,
    },
    {
      name: "Created",
      selector: (row) =>
        moment.unix(Number.parseInt(row.created)).format("lll"),
      width: "200px",
      sortable: true,
    },
    {
      name: "Last Login",
      selector: (row) =>
        moment.unix(Number.parseInt(row.last_login)).format("lll"),
      width: "200px",
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <button className="userlist-delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
          </svg>
        </button>
      ),
    },
  ];
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
          columns={columns}
          data={data.data}
          pagination={true}
        />
      </div>
    </div>
  );
}

export default UserList;
