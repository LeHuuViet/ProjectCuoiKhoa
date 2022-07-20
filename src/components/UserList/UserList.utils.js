import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDetailUserList } from "../../service/detailuserlist";
import './AddUserList.scss'



export const userListColumns = (handleCheckAndUnCheck) => [
  {
    name: (
      <input
        style={{ cursor: "pointer" }}
        type={"checkbox"}
        name="checkbox"
        onClick={() => {
          handleCheckAndUnCheck();
        }}
      />
    ),
    selector: (row) => (
      <input style={{ cursor: "pointer" }} name="checkbox" type={"checkbox"} />
    ),
    width: "50px",
  },
  {
    name: "Login/Email",
    selector: (row) => (
      <div className="d-flex" style={{ flexDirection: "column" }}>
        <Link to = {`user-detail/${row.profile_id}`}>
        <a href="" style={{ color: "#007bff", cursor: "pointer" }}>
          {row.vendor}
        </a>
        </Link>
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
    selector: (row) => moment.unix(Number.parseInt(row.created)).format("lll"),
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
