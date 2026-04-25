import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [error, setError] = useState("");
    const formRef = useRef(null);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = formRef.current;
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        setError("");

        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            if (userName == 'admin' && password == 'admin') {
                navigate("/menu");
            } else {
                setError("Invalid Username or Password. Please try again.");
            }
        }
        form.classList.add("was-validated");
    }

    return (
        <div>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
          <form className="needs-validation" onSubmit={handleSubmit} noValidate ref={formRef}>
          <div className="form-floating mb-3">
            <input
              name="username"
              type="text"
              className="form-control"
              id="floatingUsername"
              placeholder="Username:"
              ref={userNameRef}
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
              ref={passwordRef}
              required
            />
            <label htmlFor="floatingPassword">Password:</label>
          </div>
          <button
            className="btn btn-primary w-50 d-block mx-auto fs-4 fw-bold"
            type="submit"
          >
            Login
          </button>
        </form>
        </div>
    )
}