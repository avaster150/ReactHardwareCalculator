import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import MakeProduct from "./components/MakeProduct";
import ProductDetail from "./components/ProductDetail";
import EditProduct from "./components/EditProduct";
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/products" component={Products} />
          <Route path="/new-product" component={MakeProduct} />
          <Route path="/product/:name" component={ProductDetail} />
          <Route path="/edit-product/:name" component={EditProduct} />
          <Redirect to={"/products"} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
