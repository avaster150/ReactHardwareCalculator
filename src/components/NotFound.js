import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>
        <i className="fas fa-exclamation-triangle"></i> 404
      </h1>
      <h2>Oops... Page Not Found</h2>
      <Link className="go-back" to="/">
        Go to home page
      </Link>
    </div>
  );
};
export default NotFound;
