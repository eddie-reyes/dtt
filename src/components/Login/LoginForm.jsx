import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [error, setError] = useState("");
    const formRef = useRef(null);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = formRef.current;
        const userName = userNameRef.current.value.trim();
        const password = passwordRef.current.value.trim();

      setError("");
		console.log("USER:", userName);
      console.log("PASS:", password);

        if (!form.checkValidity()) {
            e.stopPropagation();
				form.classList.add("was-validated");
				return;
        } 

		//   else {
      //       if (userName == 'Myat' && password == 'password') {
      //           navigate("/menu");
      //       } else {
      //           setError("Invalid Username or Password. Please try again.");
      //       }
      //   }
		try {
			const response = await fetch(
				"https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: userName,
						password: password,
					}),
				}
			);

			const data = await response.json();
			console.log("LOGIN data:", data)

			if (!response.ok) {
				setError(data.detail || "Invalid Username or Password.");
				return;
			}

			localStorage.setItem("token", data.access_token);
			localStorage.setItem("user", JSON.stringify(data.user));
			navigate("/menu");

		} catch (err) {
			console.log("LOGIN error:", err);
			setError("Server error. Please try again.");
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
            type="submit"
          >
            Login
          </button>
        </form>
        </div>
    )
}