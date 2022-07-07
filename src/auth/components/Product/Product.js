import { faTruckField } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useDispatch } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import "./Product.scss";
import moment from "moment";

function Product() {
  const [checkAll, setCheckAll] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0);

  
  useEffect(() => {
    const datas = fetch('https://api.gearfocus.div4.pgtest.co/api/products/list')
    .then(response => response.json())
    .then(data => setData(data));
    setTotalItems(data.recordsFiltered)
    const pc = data.recordsFiltered / itemsPerPage;
    setPageCount(Math.round(pc))
  }, [page, itemsPerPage]);

  const handleChangePage = (e) => {
    setPage(e.selected + 1);
  }

  const handleCheckAll = () => {
    var checkboxes = document.getElementsByName('checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
    setCheckAll(false)
  }

  const handleUnCheckAll = () => {
    var checkboxes = document.getElementsByName('checkbox')
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    setCheckAll(true)
  }

  const handleCheckAndUnCheck = (checkAll) => {
    if (checkAll === true) handleCheckAll();
    else handleUnCheckAll();
  } 


  const columns = [
    {
      name: <input name='checkbox' type={'checkbox'} onClick={() => handleCheckAndUnCheck(checkAll)}/>,
      selector: row => <input name='checkbox' type={'checkbox'}/>
    },
    {
      name: 'SKU',
      selector: row => row.sku
    },
    {
      name: 'Name',
      selector: row => <a href='' style={{width: '300px'}}>{row.name}</a>
    },
    {
      name: 'Category',
      selector: row => row.category
    },
    {
      name: 'Price',
      selector: row => <input value={row.price}/>

    },
    {
      name: 'Instock',
      selector: row => <input value={row.amount}/>
    },
    {
      name: 'Vendor',
      selector: row => <a href="">{row.vendor}</a>
    },
    {
      name: 'Arrival Date',
      selector: row => moment(row.arrivalDate).format('ll')
    },
    {
      name: '',
      selector: row => <button className="product-delete">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg>
      </button>
    },
    
  ]

  return (
    <div className="Products">
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
                    <input type={"checkbox"}/>
                    <label>Name</label>
                  </li>
                  <li>
                    <input type={"checkbox"} />
                    <label>SKU</label>
                  </li>
                  <li>
                    <input type={"checkbox"} />
                    <label>Full Description</label>
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
            <DataTable 
            keyField="id"
            columns={columns}
            data={data.data}
            pagination={true}
              />
            <div className="pagination-bar">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handleChangePage}
                    pageRangeDisplayed={2}
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
                <div>{totalItems} items</div>
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
