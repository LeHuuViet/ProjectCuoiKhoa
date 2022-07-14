/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import "./Product.scss";
import { Link } from "react-router-dom";
import { getProducts } from "../../service/product";
import { productColumns } from "./Product.utils";
import Vendor from "../Vendor/Vendor";
import { getCategory } from "../../service/categorylist";

const Product = () => {
  const initData = {
    search: "",
    category: "0",
    stockStatus: "all",
    searchIn: "",
    availability: "",
    pageCount: 25,
    vendor: ''
  };

  const [checkAll, setCheckAll] = useState(false);
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(25);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("0");
  const [stockStatus, setStockStatus] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [vendor, setVendor] = useState('')
  const [checked, setChecked] = useState({
    name: false,
    sku: false,
    fullDescription: false,
  });
  const [state, setState] = useState(initData);

  const axiosAllProducts = async () => {
    const { search, category, stockStatus, availability, searchIn, pageCount, vendor } =
      state;
    const [data, error] = await getProducts({
      page,
      count: pageCount,
      search,
      category,
      stock_status: stockStatus,
      availability,
      vendor,
      sort: "name",
      order_by: "ASC",
      search_type: searchIn,
    });
    const [categoryList, error2] = await getCategory({});
    setData(data.data);
    setCategoryList(categoryList.data);
    setTotalItems(data.recordsFiltered);
    const itemOffSet = data.recordsFiltered / itemsPerPage;
    setTotalPages(Math.round(itemOffSet));
  };

  useEffect(() => {
    axiosAllProducts();
  }, [
    state.search,
    state.category,
    state.stockStatus,
    state.searchIn,
    state.availability,
    page,
    state.pageCount,
    state.vendor
  ]);

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

  const onCheck = (name) => () => {
    setChecked((state) => ({ ...state, [name]: !state[name] }));
  };

  const onPerPageChange = (value) => {
    setItemsPerPage(value);
    setState((state) => ({ ...state, pageCount: +value }));
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const checkValue = [
      { type: "name", isCheck: checked.name },
      { type: "sku", isCheck: checked.sku },
      { type: "description", isCheck: checked.fullDescription },
    ];
    const searchIn = checkValue
      .filter((item) => item.isCheck)
      .map((item) => item.type)
      .join(",");
    setState((state) => ({
      ...state,
      search,
      category,
      availability,
      stockStatus,
      searchIn,
      vendor
    }));
  };

  const handleDeleteProduct = () => {
    
  }

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
                  >
                    <option className="category-option" value="0">
                      Any category
                    </option>
                    {categoryList &&
                      categoryList.length > 0 &&
                      categoryList.map((item) => {
                        return (
                          <option
                            className="category-option"
                            value={item.id}
                            key={item.id}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
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
                    <input
                      type="checkbox"
                      checked={checked.name}
                      id="by-title"
                      name="name"
                      onChange={onCheck("name")}
                    />
                    <label htmlFor="by-title">Name</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={checked.sku}
                      id="by-sku"
                      name="sku"
                      onChange={onCheck("sku")}
                    />
                    <label htmlFor="by-sku">SKU</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={checked.fullDescription}
                      id="by-desc"
                      name="fullDescription"
                      onChange={onCheck("fullDescription")}
                    />
                    <label htmlFor="by-desc">Full Description</label>
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
              <Vendor onChange={(e) => setVendor(e.target.value)}/>
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
        <DataTable
          keyField="id"
          columns={productColumns(handleCheckAndUnCheck)}
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
};

export default Product;
