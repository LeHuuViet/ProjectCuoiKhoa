import "./App.css";
import NavBar from "./auth/components/Navbar/NavBar";
import Product from "./auth/components/Product/Product";
import LoginPage from "./auth/pages/LoginPage";
import SideNavigationMenu from "./auth/components/SideNavigationMenu/SideNavigationMenu";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const User = () => <h1>User</h1>;

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <SideNavigationMenu />
      <div className="main-container">
        <Routes>
          <Route path="/products" element={<Product />} />
          <Route path="/users" element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
