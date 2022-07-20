import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addUsers } from "../../service/addusers";
import { getRole } from "../../service/role";
import "./AddUserList.scss";

const AddUserList = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [forceChangePassword, setForceChangePassword] = useState("0");
  const [taxExempt, setTaxExempt] = useState("0");
  const [paymentRailsType, setPaymentRailsType] = useState("individual");
  const [accessLevel, setAccessLevel] = useState("10");
  const [role, setRole] = useState([]);

  const addNewUser = async () => {
    const [data, error] = await addUsers({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirm_password: confirmPassword,
      membership_id: membershipId,
      forceChangePassword: forceChangePassword,
      taxExempt: taxExempt,
      paymentRailsType: paymentRailsType,
      access_level: accessLevel,
    });
    const [role, error2] = await getRole({});
    setRole(role.data.administrator);
  };
  return (
    <div className="AddUserList">
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
        <form className="form-adduserlist">
          <div className="form-adduserlist-part1">
            <div>
              <h2 className="form-adduserlist-title">Create profile</h2>
            </div>
            <div>
              <h4>Email & password</h4>
            </div>
            <div>
              <ul>
                <li className="d-flex form-adduserlist-list">
                  <label className="form-adduserlist-label">
                    First Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <input
                    className="form-input-and-select"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </li>
                <li className="d-flex form-adduserlist-list">
                  <label className="form-adduserlist-label">
                    Last Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <input
                    className="form-input-and-select"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </li>
                <li className="d-flex form-adduserlist-list">
                  <label className="form-adduserlist-label">
                    Email
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <input
                    className="form-input-and-select"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li className="d-flex form-adduserlist-list">
                  <label className="form-adduserlist-label">
                    Password
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <input
                  type='password'
                    className="form-input-and-select"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </li>
                <li className="d-flex form-adduserlist-list">
                  <label className="form-adduserlist-label">
                    Confirm password
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                    </svg>
                  </label>
                  <input type='password' className="form-input-and-select" onChange={e => setConfirmPassword(e.target.value)}/>
                </li>
                <li className="d-flex form-adduserlist-list">
                  <label className="form-adduserlist-label">Type</label>
                  <select
                    className="form-input-and-select"
                    onChange={(e) => setPaymentRailsType(e.target.value)}
                  >
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                  </select>
                </li>
                <li className="d-flex form-adduserlist-list">
                  <label className="form-adduserlist-label">
                    PaymentRails ID
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="seperated-space"></div>
          <div>
            <h4>Access information</h4>
            <ul>
              <li className="d-flex form-adduserlist-list">
                <label className="form-adduserlist-label">
                  Access level
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M417.1 368c-5.937 10.27-16.69 16-27.75 16c-5.422 0-10.92-1.375-15.97-4.281L256 311.4V448c0 17.67-14.33 32-31.1 32S192 465.7 192 448V311.4l-118.3 68.29C68.67 382.6 63.17 384 57.75 384c-11.06 0-21.81-5.734-27.75-16c-8.828-15.31-3.594-34.88 11.72-43.72L159.1 256L41.72 187.7C26.41 178.9 21.17 159.3 29.1 144C36.63 132.5 49.26 126.7 61.65 128.2C65.78 128.7 69.88 130.1 73.72 132.3L192 200.6V64c0-17.67 14.33-32 32-32S256 46.33 256 64v136.6l118.3-68.29c3.838-2.213 7.939-3.539 12.07-4.051C398.7 126.7 411.4 132.5 417.1 144c8.828 15.31 3.594 34.88-11.72 43.72L288 256l118.3 68.28C421.6 333.1 426.8 352.7 417.1 368z" />
                  </svg>
                </label>
                <select
                  className="form-input-and-select"
                  onChange={(e) => setAccessLevel(e.target.value)}
                  defaultValue='Vendor'
                >
                  <option value="10">Vendor</option>
                  <option value="100">Admin</option>
                </select>
                {/* <select className="form-input-and-select">
                  {role &&
                    role.length > 0 &&
                    role.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select> */}
              </li>
              <li className="d-flex form-adduserlist-list">
                <label className="form-adduserlist-label">Memberships</label>
                <select
                  className="form-input-and-select"
                  onChange={(e) => setMembershipId(e.target.value)}
                >
                  <option value="">Ignore membership</option>
                  <option value="4">General</option>
                </select>
              </li>
              <li className="d-flex form-adduserlist-list">
                <label className="form-adduserlist-label">
                  Require to change password on next log in
                </label>
                <input
                  style={{ marginLeft: "16px" }}
                  onChange={(e) => setForceChangePassword(Number(e.target.checked))}
                  type={"checkbox"}
                />
              </li>
            </ul>
          </div>
          <div className="seperated-space"></div>

          <div>
            <h4>Tax information</h4>
            <ul>
              <li className="d-flex form-adduserlist-list">
                <label className="form-adduserlist-label">Tax exempt</label>
                <input
                  style={{ marginLeft: "16px" }}
                  type={"checkbox"}
                  onChange={(e) => setTaxExempt(Number(e.target.checked))}
                />
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div className="sticky-panel">
        <div>
          <div>
            <Link to="/pages/users">
            
            <button className="sticky-panel-button" onClick={addNewUser}>
              Create account
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserList;
