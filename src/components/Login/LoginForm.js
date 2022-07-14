import { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../../validate";
import { MoonLoader } from "react-spinners";
import Header from "../Header/Header"
import './LoginForm.scss'
import SideNavigationMenu from "../SideNavigationMenu/SideNavigationMenu";
import Product from "../Product/Product";

const account = { email: "lhv.nk53@gmail.com", password: "123123" };

const LoginForm = () => {
  const [isLogIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [error, setError] = useState({
    email: "",
    password: "",
    account: false,
  });

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue({ ...value, [e.target.name]: inputValue });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const errorEmail = validateEmail(value.email);
    const errorPassword = validatePassword(value.password);
    setError((prev) => ({ ...prev, email: "", password: "" }));

    if (!!errorEmail || !!errorPassword) {
      return setError((prev) => ({
        ...prev,
        email: errorEmail,
        password: errorPassword,
      }));
    }

    if (value.email === account.email && value.password === account.password) {
      return setIsLoggedIn(true);
    } else {
      setError((prev) => ({ ...prev, account: true }));
    }
  };

  const handleLogOut = (e) => {
    setError((prev) => ({ ...prev, email: "", password: "" }));
    setValue((prev) => ({ ...prev, email: "", password: "" }));
    setIsLoggedIn(false);
    setLoading(true);
  };

  if (isLogIn) {
    return (
      <>
            <Header />
            <div className="product-menu">
            <SideNavigationMenu />
            <Product />
            </div>
      </>
    );
  }

  return (
    <div className="LoginForm">
      <div>
        <p className="LoginForm-title">Login</p>
        <form className="validation-form">
          {error.account && (
            <div className="alert">
              <p className="alert-msg">Invalid username / password</p>
            </div>
          )}

          <div className="form-input">
            <input
              placeholder="Email"
              value={value.email}
              onChange={handleChange}
              className="form-control"
              name="email"
              type="text"
            />
            <p className="error-msg">{error.email}</p>
          </div>
          <div className="form-input">
            <input
              placeholder="Password"
              value={value.password}
              onChange={handleChange}
              className="form-control"
              name="password"
              type="password"
            />
            <p className="error-msg">{error.password}</p>
          </div>
          <div className="login-button">
            <button type="submit" className="button" onClick={handleLogIn}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z" />
              </svg>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
