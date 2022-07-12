import "./App.css";
import Header from "./auth/components/Header/Header"
import Product from "./auth/components/Product/Product";
import LoginPage from "./auth/pages/LoginPage";
import SideNavigationMenu from "./auth/components/SideNavigationMenu/SideNavigationMenu";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserList from "./auth/components/UserList/UserList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SideNavigationMenu />
      <div className="main-container">
        <Routes>
          <Route path="/pages/products/manage-product" element={<Product />} />
          <Route path="/pages/products/manage-users" element={<UserList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
