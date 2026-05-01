import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const formRef = useRef(null);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = formRef.current;
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        setDisabled(true);
        setError("");

        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            try {
              const response = await fetch(
                "https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/auth/login",
                {
                  method: "POST",
                  headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ username: userName, password: password }),
                }
              );

              const data = await response.json();
              
              if (!response.ok) {
                setError("Invalid Username or Password. Please try again.");
                setDisabled(false);
              } else {
                localStorage.setItem("token", data.access_token);
                const user = data.user;
                navigate("/menu", { state: { user }});
              }
            } catch (error) {
              console.error(error);
            }
        }
        form.classList.add("was-validated");
        
    }

    return (
        <div className="mx-auto" style={{ width: "100%", maxWidth: "400px" }}>
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
            disabled={disabled}
            type="submit"
          >
            Login
          </button>
        </form>
        </div>
    )
}