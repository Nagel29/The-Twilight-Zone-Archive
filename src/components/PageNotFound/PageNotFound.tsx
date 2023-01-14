import { Link } from "react-router-dom";
import "../PageNotFound/PageNotFound.css";

export const PageNotFound = () => {
  return (
    <div className="page404">
      <h1>☞ 404 Page Not Found</h1>
      <p>
        We're sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <Link className="button-back" to="/" id='back-button'>
        Go Back
      </Link>
    </div>
  )
}
