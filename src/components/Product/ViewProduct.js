import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewProduct.scss";
import { getBrand } from "../../service/brand";
import { getCategory } from "../../service/categorylist";
import { getCountry } from "../../service/country";
import AsyncSelect from "react-select/async";
import { Select, Switch, DatePicker } from "antd";
import "antd/dist/antd.min.css";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { getVendor } from "../../service/vendor";
import axios from "axios";
import moment from "moment";
import ImageUpLoad from "../../UploadImage";

const ViewProduct = (props) => {
  let currentUrl = window.location.pathname;
  let result = currentUrl.lastIndexOf("/");
  let idProduct = currentUrl.slice(result + 1, currentUrl.length);
  const Today = new Date().toLocaleString("fr-CA", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const [id, setId] = useState("");
  const initSKU = new Date().getTime();
  const [vendorId, setVendorId] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [brandId, setBrandId] = useState("");
  const [conditionId, setConditionId] = useState("292");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [ShippingToZones, setShippingToZones] = useState([
    { id: 1, price: "0.00" },
  ]);
  const [selectVendor, setSelectVendor] = useState(null);
  const [inputVendor, setInputVendor] = useState("");
  const [country, setCountry] = useState("");
  const [taxExempt, setTaxExempt] = useState("0");
  const [price, setPrice] = useState(0);
  const [arrivalDate, setArrivalDate] = useState(Today);
  const [inventoryTracking, setInventoryTracking] = useState("0");
  const [quantity, setQuantity] = useState(0);
  const [sku, setSku] = useState(initSKU);
  const [participateSale, setParticipateSale] = useState(0);
  const [salePrice, SetSalePrice] = useState("0.0000");
  const [ogTagsType, setOgTagsType] = useState(0);
  const [ogTags, setOgTags] = useState("");
  const [metaDescType, setMetaDescType] = useState("A");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [productPageTitle, setProductPageTitle] = useState("");
  const [fbMarketingEnabled, setFbMarketingEnabled] = useState("0");
  const [ggFeedEnabled, setGgFeedEnabled] = useState("0");
  const [images, setImages] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const maxNumber = 10;

  const loadVendor = async (inputText, callback) => {
    const res = await axios.post(
      "https://api.gearfocus.div4.pgtest.co/apiAdmin/vendors/list",
      { search: `${inputText}` },
      {
        headers: {
          Authorization:
            "9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275",
        },
      }
    );
    const data = res.data && res.data.data ? res.data.data : [];
    callback(data.map((i) => ({ id: i.id, name: i.name })));
  };

  const getProductDetail = async () => {
    //const res = await axios.post

    const res = await axios.post(
      "https://api.gearfocus.div4.pgtest.co/apiAdmin/products/detail",
      `{"id":"${idProduct}"}`,
      {
        headers: {
          Authorization:
            "9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275",
        },
      }
    );
    setId(res.data.data.id);
    setVendorId(res.data.data.vendor_id);
    setProductTitle(res.data.data.name);
    setConditionId(res.data.data.condition_id);
    setBrandId(res.data.data.brand_id);
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(res.data.data.description)
        )
      )
    );
    setSku(res.data.data.sku);
    console.log(images.map((item) => item.file.toString()));
    setImages(res.data.data.images);
    setCategories(res.data.data.categories);
    setArrivalDate(res.data.data.arrival_date);
    setEnabled(Number(res.data.data.enabled));
    setPrice(res.data.data.price);
    setQuantity(res.data.data.quantity);
    setShippingToZones(res.data.data.shipping);
    setOgTagsType(res.data.data.og_tags_type);
    setOgTags(res.data.data.og_tags);
    setMetaDescType(res.data.data.meta_desc_type);
    setMetaDesc(res.data.data.meta_description);
    setMetaKeywords(res.data.data.meta_keywords);
    setProductPageTitle(res.data.data.product_page_title);
    setFbMarketingEnabled(+res.data.data.facebook_marketing_enabled);
    setGgFeedEnabled(+res.data.data.google_feed_enabled);
    // setInputVendor(res)
    setCategoryList(categoryList);
    setCountryList(countryList);
    setVendorList(vendorList);
    setBrandList(brandList);
    const [categoryList, error2] = await getCategory({});
    const [countryList, error3] = await getCountry({});
    const [vendorList, error4] = await getVendor({});
    const [brandList, error5] = await getBrand({});
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const decimalNumber = (num, n) => {
    const index = String(num).indexOf(".", 0);
    const result = String(num).slice(0, index + n + 1);
    return result;
  };

  return (
    <div className="AddProduct">
      <div>
        <Link to="/pages/products">
          <button className="button-back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
            </svg>
          </button>
        </Link>
      </div>
      <div>
        <form className="form-addproduct">
          <div className="form-addproduct-part1">
            <div>
              <h2 className="form-addproduct-title">{productTitle}</h2>
            </div>
            <div>
              <ul>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Vendor
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    value={selectVendor}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => setVendorId(e.id)}
                    loadOptions={loadVendor}
                    onChange={(e) => setSelectVendor(e)}
                    onInputChange={(e) => setInputVendor(e)}
                    placeholder={inputVendor}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "#c8c8c8",
                      },
                    })}
                  />
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Product Title
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <input
                    type={"text"}
                    defaultValue={productTitle}
                    className="form-input-and-select"
                    onChange={(e) => productTitle(e.target.value)}
                  />
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Brand
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <select
                    defaultValue={brandId}
                    value={brandId}
                    className="form-input-and-select"
                    onChange={(e) => setBrandId(e.target.value)}
                  >
                    {brandList &&
                      brandList.length > 0 &&
                      brandList.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Condition
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <select
                    defaultValue={conditionId}
                    className="form-input-and-select"
                    onChange={(e) => setConditionId(e.target.value)}
                  >
                    <option>Used</option>
                  </select>
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">SKU</label>
                  <input
                    value={sku}
                    className="form-input-and-select"
                    onChange={(e) => setSku(e.target.value)}
                  />
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Image
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <div className="image-wrapper">
                    {images.map((img) => (
                      <img
                        style={{ width: "140px" }}
                        src={img.file}
                        key={img.id}
                      />
                    ))}
                  </div>
                  {/* <ImageUpLoad setIma={setImages} Ima={images} /> */}
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Category
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <Select
                    mode="tags"
                    placeholder="Type Categories name to select"
                    style={{ width: "600px", minHeight: "40px" }}
                    onSelect={setCategories}
                    defaultValue={categories.map((item) =>
                      "".concat(item.name)
                    )}
                  >
                    {categoryList &&
                      categoryList.length > 0 &&
                      categoryList.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                  {/* <select className="form-input-and-select">
                    {categoryList && categoryList.length > 0 && categoryList.map(item => {return (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )})}
                  </select> */}
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Description
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <div>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={(e) => {
                        setEditorState(e);
                        setDescription(
                          draftToHtml(convertToRaw(e.getCurrentContent()))
                        );
                      }}
                      toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                      }}
                    />
                    <textarea disabled value={description} />
                  </div>
                </li>
                <li className="d-flex form-addproduct-list">
                  <label className="form-addproduct-label">
                    Available for sale
                  </label>
                  <Switch
                    style={{ marginTop: "6px" }}
                    checkedChildren={"Yes"}
                    unCheckedChildren={"No"}
                    defaultChecked={0}
                    onChange={(e) => setEnabled(Number(e.target.checked))}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="seperated-space"></div>
          <div>
            <h4>Prices & Inventory</h4>
            <ul>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">Memberships</label>
                <select
                  defaultChecked={memberships}
                  defaultValue={""}
                  className="form-input-and-select"
                >
                  <option></option>
                  <option>General</option>
                </select>
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">Tax class</label>
                <div
                  className="d-flex"
                  style={{ width: "400px", justifyContent: "space-between" }}
                >
                  <label>default</label>
                  <div style={{ marginRight: "100px" }}>
                    <input
                      type="checkbox"
                      onSelect={(e) => setTaxExempt(e.target.checked)}
                      defaultChecked={Number(taxExempt)}
                    />
                    <label>Tax Exempt</label>
                  </div>
                </div>
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Price
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  placeholder="0.00"
                  type={"number"}
                  className="form-input-and-select"
                  onChange={(e) => setPrice(e.target.value)}
                  value={decimalNumber(price, 2)}
                />
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">Arrival date</label>
                <DatePicker
                  defaultValue={moment(new Date().toLocaleDateString())}
                  value={moment(
                    new Date(arrivalDate * 1000).toLocaleDateString()
                  )}
                  format={"YYYY-MM-DD"}
                  onChange={(e) =>
                    setArrivalDate(
                      new Date(e._d).toLocaleDateString("fr-CA", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      })
                    )
                  }
                ></DatePicker>
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Quantity in stock
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  value={quantity}
                  className="form-input-and-select"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </li>
            </ul>
          </div>
          <div className="seperated-space"></div>

          <div>
            <h4>Shipping</h4>
            <ul>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Continental U.S.
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  defaultValue={decimalNumber(
                    ShippingToZones.filter((item) => item.id === "1")[0]?.price,
                    2
                  )}
                  type="number"
                  className="form-input-and-select"
                  onChange={(e) =>
                    setShippingToZones((prevState) => {
                      const newState = prevState.map((obj) => {
                        if (obj.id === 1) {
                          return { ...obj, price: `${e.target.value}` };
                        }
                        return obj;
                      });

                      return newState;
                    })
                  }
                />
              </li>
              <li className="d-flex form-addproduct-list">
                <select
                  style={{ marginLeft: "166px" }}
                  input
                  className="form-input-and-select"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="0">Select new zone</option>
                  {countryList &&
                    countryList.length > 0 &&
                    countryList.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.country}
                        </option>
                      );
                    })}
                </select>
                <label
                  style={{ width: "200px" }}
                  className="form-addproduct-label"
                >
                  Add Shipping Location
                </label>
              </li>
            </ul>
          </div>
          <div className="seperated-space"></div>

          <div>
            <h4>Marketing</h4>
            <ul>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Open Graph meta tags
                </label>
                <select
                  className="form-input-and-select"
                  onChange={(e) => setOgTagsType(e.target.value)}
                  defaultValue={ogTagsType}
                >
                  <option value="0">Autogenerated</option>
                  <option value="1">Custom</option>
                </select>
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Meta description
                </label>
                <select
                  className="form-input-and-select"
                  onChange={(e) => setMetaDescType()}
                  defaultValue={metaDescType}
                >
                  <option value="A">Autogenerated</option>
                  <option value="C">Custom</option>
                </select>
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">Meta keywords</label>
                <input
                  className="form-input-and-select"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  defaultValue={metaKeywords}
                />
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Product page title
                </label>
                <input
                  className="form-input-and-select"
                  onChange={(e) => setProductPageTitle(e.target.value)}
                  defaultValue={productPageTitle}
                />
              </li>
              <div>
                <p>Leave blank to use product name as Page Title.</p>
              </div>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Add to Facebook product feed
                </label>
                <Switch
                  style={{ marginTop: "16px" }}
                  checkedChildren={"Yes"}
                  unCheckedChildren={"No"}
                  defaultChecked={fbMarketingEnabled}
                  onChange={(e) =>
                    setFbMarketingEnabled(Number(e.target.checked))
                  }
                />
              </li>
              <li className="d-flex form-addproduct-list">
                <label className="form-addproduct-label">
                  Add to Google product feed
                </label>
                <Switch
                  style={{ marginTop: "16px" }}
                  defaultChecked={ggFeedEnabled}
                  checkedChildren={"Yes"}
                  unCheckedChildren={"No"}
                  onChange={(e) => setGgFeedEnabled(Number(e.target.checked))}
                />
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div className="sticky-panel">
        <div>
          <div>
            <button className="sticky-panel-button">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
