import React, { useEffect, useState, useDispatch } from "react";
import "./Product.scss";
import axios from "axios";
import { deleteUser } from "../../../action/action";
import ReactPaginate from "react-paginate";

function Product() {
  const [CheckedAll, setCheckedAll] = useState(true);
  const [ProductList, setProductList] = useState([]);
  const [Page, setPage] = useState(1);

  const [pageCount, setPageCount] = useState(+0);
  const [totalItem, setTotalItem] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const dispatch = useDispatch()


  useEffect(() => {
      (async () => {
          const res = await axios.post("https://api.gearfocus.div4.pgtest.co/api/products/list",
              `{
      "page":${Page},
      "count":${itemsPerPage},
      "search":"",
      "category":"0",
      "stock_status":"all",
      "availability":"all",
      "vendor":"",
      "sort":"name",
      "order_by":"ASC",
      "search_type":""}`,
              {
                  headers: {
                      Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                  }
              });
          setProductList(res.data.data)
          setTotalItem(+res.data.recordsFiltered)
          // console.log('setProductList', ProductList)
          // console.log('res', typeof (+res.data.recordsFiltered))
          // console.log('res', +res.data.recordsFiltered)
          // console.log('totalItem', totalItem)
          // console.log('itemsPerPage', itemsPerPage)
          const pc = +res.data.recordsFiltered / itemsPerPage
          setPageCount(Math.round(pc))
          // console.log(pageCount);
      })()
      console.log('setProductList', ProductList)
  }, [Page, itemsPerPage])

  const handleDelete = (id) => {
      console.log('ng dung bi xoa la', id)
      dispatch(deleteUser(id));
  }

  const handlePageClick = (event) => {
      setPage(event.selected + 1);
      console.log(event.selected);
  };

  const handleCheckAll = () => {
      // Lấy danh sách checkbox
      var checkboxes = document.getElementsByName('name[]');

      // Lặp và thiết lập checked
      for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = true;
      }
      setCheckedAll(false);
  }

  const handleCheckNone = () => {
      // Lấy danh sách checkbox
      var checkboxes = document.getElementsByName('name[]');

      // Lặp và thiết lập Uncheck
      for (var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = false;
      }
      setCheckedAll(true);
  }

  const handle = (CheckedAll) => {
      if (CheckedAll === true)
          handleCheckAll()
      else
          handleCheckNone()
  }

  return (
    <div className="products">
      <div>
        <h2 className="products-title">Products</h2>
        <div className="product-search-form">
          <form>
            <ul className="products-search-1 d-flex">
              <li style={{width: '50%', marginRight: '20px'}}>
                <div>
                  <input
                    className="products-search-input"
                    placeholder="Search keywords"
                  />
                </div>
              </li>
              <li style={{width: '25%', marginRight: '20px'}}>
                <div>
                  <select className="products-search-select"></select>
                </div>
              </li>
              <li style={{width: '20%', marginRight: '20px'}}>
                <div>
                  <select className="products-search-select" id='inventory' defaultValue={'Any stock status'}>
                    <option value='all'>Any stock status</option>
                    <option value='in'>In stock</option>
                    <option value='low'>Low stock</option>
                    <option value='out'>SOLD</option>
                  </select>
                </div>
              </li>
              <li style={{width: '5%', marginRight: '20px'}}>
                <div>
                  <button className="products-search-button">Search</button>
                </div>
              </li>
            </ul>
            <div className="line-1"></div>
            <ul className="products-search-2 d-flex">
              <li className="d-flex" style={{marginRight: '40px'}}>
                <label>Search in:</label>
                <ul style={{padding: '0px'}}>
                  <li>
                    <input type={"checkbox"} />
                  </li>
                  <li>
                    <input type={"checkbox"} />
                  </li>
                  <li>
                    <input type={"checkbox"} />
                  </li>
                </ul>
              </li>
              <li className="d-flex" style={{marginRight: '40px'}}>
                <label>Availability</label>
                <select className="products-search-select" defaultValue={'Any availability status'}>
                    <option value='all'>Any availability status</option>
                    <option value='1'>Only enabled</option>
                    <option value='0'>Only disabled</option>
                </select>
              </li>
              <li className="d-flex" style={{marginRight: '40px'}}>
                <label>Vendor</label>
                <input className="products-search-input" />
              </li>
            </ul>
          </form>
        </div>
      </div>
          <div>
            <button className='products-search-button'>Add product</button>
          </div>
          <div className="products-table">
          <table className="table">
            <thead>
                <tr>
                    <th><input type={'checkbox'}/></th>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>In stock</th>
                    <th>Vendor</th>
                    <th>Arrival Date</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                    {ProductList && ProductList.length > 0 && ProductList.map((item, index) => {
                        return (
                            <tr key={`products-${index}`}>
                                <th><input type="checkbox" name='name[]' id='check_all'></input></th>
                                <td>{item.sku}</td>
                                <td><a className='link' title={`${item.name}`}>{item.name}</a></td>
                                <td>{item.category}</td>
                                <td>${item.price.slice(0, item.price.indexOf('.', [-1]) + 3)}</td>
                                <td>{item.amount}</td>
                                <td><a className='link' title={`${item.vendor}`}>{item.vendor}</a></td>
                                <td>{item.arrivalDate != 0 ? new Date(+item.arrivalDate * 1000).toLocaleString("en-ZA", { month: "short", day: "numeric", year: "numeric" }) : '--'}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="pagination-bar">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName='active'
                />
                <div>{totalItem} items</div>
                <select className="pagiSelect" onChange={(e) => setItemsPerPage(e.target.value)} defaultValue={25}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
              </div>
          </div>
          </div>
  )};

  export default Product;
