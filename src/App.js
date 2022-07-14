import "./App.css";
import Header from "./components/Header/Header"
//import Product from "./components/Product/Product";
import Product from "./components/Product/Product";
import LoginPage from "./pages/LoginPage";
import SideNavigationMenu from "./components/SideNavigationMenu/SideNavigationMenu";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import { Switch } from "@mui/material";
import AddProduct from "./components/Product/AddProduct";

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
