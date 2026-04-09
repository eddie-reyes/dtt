import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Login.module.css";
import "../scss/styles.scss";

export default function login() {
  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${styles.pageBackground}`}
    >
      <div className="w-50">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="position-absolute top-0 start-50 translate-middle-x  mt-5 d-flex align-items-center">
            <img src={logo} alt="logo" style={{ width: "128px" }}></img>
            <h1 className="d-inline-block ms-3">iagnostic Training Tool</h1>
          </span>
        </div>

        <form action="">
          <div className="form-floating mb-3">
            <input
              name="username"
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Username:"
              required
            />
            <label htmlFor="floatingUsername">Username:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password:"
              required
            />
            <label htmlFor="floatingPassword">Password:</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-50 d-block mx-auto fs-4 fw-bold"
          >
            Login
          </button>

          {/* Temporary buttons */}
          <div className="d-flex flex-column gap-3 mt-4">
            <button className="btn btn-primary w-50">
              <Link className="text-white" to="/menu">
                Open the Menu
              </Link>
            </button>
            <button className="btn btn-primary w-50">
              <Link className="text-white" to="/">
                ← Back to the Main Page
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
