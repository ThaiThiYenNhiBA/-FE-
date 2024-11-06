"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {  // Loại bỏ chú thích kiểu TypeScript
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email/Password is required!");
      return;
    }

    try {
      const res = await loginApi(email, password);
      if (res && res.toke) {
        localStorage.setItem("token", res.token);
      }
      console.log(">>>check login:  ", res);
      if (res.success) {
        toast.success("Login successful!");
      } else {
        toast.error(res.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Image src="/Images/OIP.png" alt="LLT Logo" width={100} height={100} />
      </div>
      <h2>LOGIN</h2>
      <p>Welcome!</p>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123z@#"
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              cursor: 'pointer',
              position: "absolute",
              right: '10px',
              top: '50%'
            }}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>
        <Link href="/Authentication" className="forgot-password">
          Forgot password?
        </Link>
        <button
          type="submit"
          className={email && password ? "active" : "inactive"}
          disabled={!email || !password}
        >
          Sign in
        </button>
      </form>
      <p>
        <br />
        No account?{' '}
        <Link href="/Register">
          Sign up
        </Link>
      </p>
    </div >
  );
};

export default Login;

async function loginApi(email, password) { // Loại bỏ chú thích kiểu TypeScript
  const response = await fetch('http://BackEnd/Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(response);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}
