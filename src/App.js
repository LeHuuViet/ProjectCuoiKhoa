import "./App.css";
import Header from "./components/Header/Header"
//import Product from "./components/Product/Product";
import Product from "./components/Product/Product";
import LoginPage from "./pages/LoginPage";
import SideNavigationMenu from "./components/SideNavigationMenu/SideNavigationMenu";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import AddProduct from "./components/Product/AddProduct";
import AddUserList from "./components/UserList/AddUserList";
import ViewDetailUser from "./components/UserList/ViewDetailUser";
import ViewProduct from "./components/Product/ViewProduct";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SideNavigationMenu />
      <div className="main-container">
        <Routes>
          <Route path="/pages/products" element={<Product />} />
          <Route path="/pages/users" element={<UserList />} />
          <Route path="/pages/add-products" element={<AddProduct />} />
          <Route path="/pages/add-users" element={<AddUserList />} />
          <Route path="/pages/users/user-detail/:id" element={<ViewDetailUser />} />
          <Route path="/pages/products/products-detail/:id" element={<ViewProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
    // <Router>
    //   <Header />
    // <SideNavigationMenu />
      
    // </Router>
  );
}

export default App;
