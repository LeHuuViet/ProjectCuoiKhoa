import './App.css';
import NavBar from './auth/components/Navbar/NavBar';
import Product from './auth/components/Product/Product';
import LoginPage from './auth/pages/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/products/manage-product">
          <Product />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;