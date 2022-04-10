import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h2>Hardware calculator app</h2>
          </div>
          <div className="navbar-links">
            <NavLink className="navbar-link" to="/products">
              Products
            </NavLink>
            <NavLink className="navbar-link" to="/new-product">
              Create product
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
