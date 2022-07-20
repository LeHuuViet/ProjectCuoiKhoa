import DisabledContext from "antd/lib/config-provider/DisabledContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addUsers } from "../../service/addusers";
import { getRole } from "../../service/role";
import "./ViewDetailUser.scss";

const ViewDetailUser = () => {
  let currentUrl = window.location.pathname;
  let result = currentUrl.lastIndexOf("/");
  let idUser = currentUrl.slice(result + 1, currentUrl.length);
  const [orderAsBuyer, setOrderAsBuyer] = useState({
    quantity: 0,
    total: "0.00",
  });
  const [shopName, setShopName] = useState("");
  const [emailName, setEmailName] = useState("");
  const [vendorIncome, setVendorIncome] = useState("");
  const [vendorExpense, setVendorExpense] = useState("");
  const [earning, setEarning] = useState("");
  const [productTotal, setProductTotal] = useState("");
  const [joined, setJoined] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [language, setLanguage] = useState("");
  const [referer, setReferer] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [accessLevel, setAccessLevel] = useState("10");
  const [pending, setPending] = useState("");
  const [forceChangePassword, setForceChangePassword] = useState("0");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [membership, setMembership] = useState("");
  const [type, setType] = useState("individual");
  const [taxExempt, setTaxExempt] = useState("0");
  const [accRoles, setAccRoles] = useState([]);

  const getUserDeltailData = async () => {
    const res = await axios.post(
      "https://api.gearfocus.div4.pgtest.co/apiVendor/profile/detail",
      `{"id":"${idUser}"}`,
      {
        headers: {
          Authorization:
            "9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275",
        },
      }
    );
    const info = res.data.data.info;
    setOrderAsBuyer({
      ...orderAsBuyer,
      quantity: info.order_as_buyer,
      total: info.order_as_buyer_total,
    });
    setVendorIncome(info.income);
    setVendorExpense(info.expense);
    setEarning(info.earning);
    setProductTotal(info.products_total);
    setJoined(
      new Date(info.joined * 1000).toLocaleString("en-VN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    setLastLogin(
      new Date(info.last_login * 1000).toLocaleString("en-VN", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    setLanguage(info.language);
    setReferer(info.referer);
    setFirstName(info.firstName);
    setLastName(info.lastName);
    setEmail(info.email);
    setPaymentType(info.paymentRailsType);
    setPaymentId(info.paymentRailsId);
    setAccessLevel(info.access_level);
    setPending(info.pending_membership_id);
    setForceChangePassword(info.forceChangePassword);
    setEmailName(res.data.data.info.email);
    setShopName(res.data.data.info.companyName);
    setRoles(res.data.data.info.roles);
    setAccRoles(res.data.data.account_roles);
    setTaxExempt(info.taxExempt);
    console.log(res.data.data.info)
  };

  useEffect(() => {
    getUserDeltailData();
  }, []);
  const decimalNumber = (num, n) => {
    const index = String(num).indexOf(".", 0);
    const result = String(num).slice(0, index + n + 1);
    return result;
  };
  return (
    <div className="ViewDetailUser">
      <div>
        <Link to="/pages/users">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
            </svg>
          </button>
        </Link>
      </div>
      <div>
        <form className="form-viewuser">
          <div className="form-adduserlist-part1">
            <div>
              <h2 className="form-viewuser-title">
                {emailName}({shopName})
              </h2>
            </div>
            <div>
              <ul>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">
                    Orders placed as a buyer
                  </label>
                  <a href="#" className="form-a-viewuser">
                    {orderAsBuyer.quantity}
                  </a>
                  <span className="form-span-viewuser">
                    (${decimalNumber(orderAsBuyer.total, 2)})
                  </span>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Vendor Income</label>
                  <span
                    className="form-span-viewuser"
                    onChange={(e) => setLastName(e.target.value)}
                  >
                    ${vendorIncome}
                  </span>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Vendor Expense</label>
                  <span
                    className="form-span-viewuser"
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    ${vendorExpense}
                  </span>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">
                    View transaction details
                  </label>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Earning balance</label>
                  <span className="form-span-viewuser">${earning}</span>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">
                    Products listed as vendor
                  </label>
                  <a href="#" className="form-a-viewuser">
                    {productTotal}
                  </a>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Joined</label>
                  <span className="form-span-viewuser">{joined}</span>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Last login</label>
                  <span className="form-span-viewuser">{lastLogin}</span>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Language</label>
                  <span className="form-span-viewuser">{language}</span>
                </li>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Referer</label>
                  <span className="form-span-viewuser">{referer}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="seperated-space"></div>
          <div>
            <div>
              <h4>Email & password</h4>
            </div>
            <ul>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  First Name
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-input-and-select"
                />
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  Last Name
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-input-and-select"
                />
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  Email
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input-and-select"
                />
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  Password
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  type="password"
                  className="form-input-and-select"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  Confirm password
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <input
                  onChange={(e) => setCfPassword(e.target.value)}
                  type="password"
                  className="form-input-and-select"
                />
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">Type</label>
                <span>{paymentType}</span>
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">PaymentRails ID</label>
                <span>{paymentId}</span>
              </li>
            </ul>~
          </div>
          <div className="seperated-space"></div>

          <div>
            <h4>Access information</h4>
            <ul>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">Access level</label>
                <span className="form-span-viewuser">
                  {accessLevel === "100" ? "Administrator" : "Vendor"}
                </span>
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">Roles</label>
                <span className="form-span-viewuser">
                  {roles}
                </span>
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">Account status</label>
                <select
                  name="membership"
                  id="membership"
                  onChange={(e) => setMembership(e.target.value)}
                  defaultValue="Ignore Membership"
                  className="form-input-and-select"
                >
                  <option value="">Enable</option>
                  <option value="4">Disable</option>
                  <option value="5">Unapproved Vendor</option>
                </select>
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  Status comment (reason)
                </label>
                <textarea className="form-input-and-select"></textarea>
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">Membership</label>
                <select
                  name="Membership"
                  id="Membership"
                  onChange={(e) => setMembership(e.target.value)}
                  defaultValue="Ignore Membership"
                  className="form-input-and-select"
                >
                  <option value="">Ignore Membership</option>
                  <option value="4">General</option>
                </select>
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  Pending membership
                </label>
                <span className="form-span-viewuser">
                  {pending === null ? "None" : pending}
                </span>
              </li>
              <li className="d-flex form-viewuser-list">
                <label className="form-viewuser-label">
                  Require to change password on next log in
                </label>
                <input
                  style={{ marginLeft: "16px", marginBottom: "12px" }}
                  type="checkbox"
                  defaultChecked={Number(forceChangePassword)}
                  onChange={(e) =>
                    setForceChangePassword(Number(e.target.checked))
                  }
                ></input>
              </li>
            </ul>
            <div className="seperated-space"></div>
            <div>
              <h4>Tax information</h4>
              <ul>
                <li className="d-flex form-viewuser-list">
                  <label className="form-viewuser-label">Tax exempt</label>
                  <input
                    style={{ marginLeft: "16px", marginBottom: "12px" }}
                    type={"checkbox"}
                    onChange={(e) => setTaxExempt(Number(e.target.checked))}
                    defaultChecked={decimalNumber(taxExempt)}
                  />
                </li>
              </ul>
            </div>
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

export default ViewDetailUser;
