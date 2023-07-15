import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" });
  let navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success){
      // Save the auth token and redirect
      
      localStorage.setItem('token', json.token); 
      navigate("/");
      props.showAlert("Account Created Successfully","success")

  }
  else{
      props.showAlert("Invalid Credentials","danger")
  }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div >
      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            aria-describedby="emailHelp"
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"

            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={handleSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
