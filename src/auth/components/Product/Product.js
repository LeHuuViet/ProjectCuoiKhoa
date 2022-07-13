/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useDispatch } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import "./Product.scss";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom"

const Product=()=> {
  const initData = {
    search: "",
    category: "0",
    stockStatus: "all",
    searchIn: "",
    availability: "",
  };

  const [checkAll, setCheckAll] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(25);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("0");
  const [stockStatus, setStockStatus] = useState("all");
  const [searchIn, setSearchIn] = useState("");
  const [availability, setAvailability] = useState("all");
  const [state, setState] = useState(initData);

  const fetchAllProducts = async () => {
    const datas = await axios.post(
      "https://api.gearfocus.div4.pgtest.co/api/products/list",
      {
        page: page,
        count: itemsPerPage,
        'search': state.search,
        'category': state.category,
        'stock_status': state.stockStatus,
        'availability': state.availability,
        'vendor': "",
        'sort': "name",
        'order_by': "ASC",
        'search_type': state.searchIn,
      },
      {
        headers: {
          Authorization:
            "9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275",
        },
      }
    );
    console.log('search',search)
    setData(datas.data);
    setTotalItems(datas.data.recordsFiltered);
    const itemOffSet = datas.data.recordsFiltered / itemsPerPage;
    setPageCount(Math.round(itemOffSet));
  };

  useEffect(() => {
    fetchAllProducts();
  }, [page, itemsPerPage, state]);

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

  const handleCheckAndUnCheck = (checkAll) => {
    if (checkAll === true) handleCheckAll();
    else handleUnCheckAll();
  };

  const columns = [
    {
      name: (
        <input
          name="checkbox"
          type={"checkbox"}
          onClick={() => handleCheckAndUnCheck(checkAll)}
        />
      ),
      selector: (row) => <input name="checkbox" type={"checkbox"} />,
      width: "50px",
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
      width: "150px",
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => (
        <a href="" style={{ color: "#007bff" }}>
          {row.name}
        </a>
      ),
      width: "300px",

      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      width: "250px",
    },
    {
      name: "Price",
      selector: (row) => <input value={row.price} />,
      width: "100px",

      sortable: true,
    },
    {
      name: "Instock",
      selector: (row) => <input value={row.amount} />,
      width: "100px",
      sortable: true,
    },
    {
      name: "Vendor",
      selector: (row) => (
        <a href="" style={{ color: "#007bff" }}>
          {row.vendor}
        </a>
      ),
      width: "300px",
      sortable: true,
    },
    {
      name: "Arrival Date",
      selector: (row) =>
        moment.unix(Number.parseInt(row.arrivalDate)).format("ll"),
      width: "200px",
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <button className="product-delete">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
          </svg>
        </button>
      ),
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const N = document.getElementById("by-title").checked;
    const S = document.getElementById("by-sku").checked;
    const F = document.getElementById("by-descr").checked;
    const searchvendor = document.getElementById("search-vendor").value;

    let X = "";
    N ? (X = X.concat("name,")) : (X = X.concat(""));
    S ? (X = X.concat("sku,")) : (X = X.concat(""));
    F ? (X = X.concat("description,")) : (X = X.concat(""));
    X = X.slice(0, X.length - 1);

    setState((state) => ({
      ...state,
      'Search': search,
      'Category': category,
      'Availability': availability,
      'StockStatus': stockStatus,
      'searchIn': X,
    }));
    // cai nay da co code gi lien quan den phan search dau ma search duoc

  };

  return (
    <div className="Products">
      <div>
        <h2 className="products-title">Products</h2>
        <div className="product-search-form">
          <form className="border" onSubmit={handleSearch}>
            <ul className="products-search-1 d-flex">
              <li style={{ width: "50%", marginRight: "20px" }}>
                <div>
                  <input
                    className="products-search-input border"
                    type="text"
                    placeholder="Search keywords"
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    id="search-keywords"
                  />
                </div>
              </li>
              <li style={{ width: "25%", marginRight: "20px" }}>
                <div>
                  <select
                    name="category"
                    id="category"
                    defaultValue={"Any category"}
                    onChange={(e) => setCategory(e.target.value)}
                    className="products-select border"
                  ></select>
                </div>
              </li>
              <li style={{ width: "20%", marginRight: "20px" }}>
                <div>
                  <select
                    className="products-select border"
                    name="inventory"
                    id="inventory"
                    defaultValue={"Any inventory"}
                    onChange={(e) => setStockStatus(e.target.value)}
                  >
                    <option value="all">Any stock status</option>
                    <option value="in">In stock</option>
                    <option value="low">Low stock</option>
                    <option value="out">SOLD</option>
                  </select>
                </div>
              </li>
              <li style={{ width: "5%", marginRight: "20px" }}>
                <div>
                  <button
                    type="submit"
                    className="products-search-button"
                    // onClick={() => handleSearch()}
                  >
                    Search
                  </button>
                </div>
              </li>
            </ul>
            <div className="line-1"></div>
            <ul className="products-search-2 d-flex">
              <li className="d-flex" style={{ marginRight: "40px" }}>
                <label>Search in:</label>
                <ul style={{ padding: "0px" }}>
                  <li>
                    <input type={"checkbox"} name="by-title" id="by-title" />
                    <label htmlFor="by-title">Name</label>
                  </li>
                  <li>
                    <input type={"checkbox"} name="by-sku" id="by-sku" />
                    <label htmlFor="by-sku">SKU</label>
                  </li>
                  <li>
                    <input type={"checkbox"} name="by-descr" id="by-descr" />
                    <label htmlFor="by-descr">Full Description</label>
                  </li>
                </ul>
              </li>
              <li className="d-flex" style={{ marginRight: "40px" }}>
                <label>Availability</label>
                <select
                  name="availability"
                  id="availability"
                  defaultValue={"Any availability status"}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="products-select border"
                >
                  <option value="all">Any availability status</option>
                  <option value="1">Only enabled</option>
                  <option value="0">Only disabled</option>
                </select>
              </li>
              <li className="d-flex" style={{ marginRight: "40px" }}>
                <label>Vendor</label>
                <input
                  type="text"
                  id="search-vendor"
                  className="products-search-input border"
                />
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div>
        <Link to="/pages/add-products">
        <button className="products-search-button">Add product</button>
        </Link>
      </div>
      <div className="products-table border">
        <DataTable keyField="id" columns={columns} data={data.data} />
        <div className="pagination-bar">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handleChangePage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={pageCount}
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
            onChange={(e) => setItemsPerPage(e.target.value)}
            defaultValue={10}
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

export default Product;
