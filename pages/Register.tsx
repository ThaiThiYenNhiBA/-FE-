'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import '../app/globals.css';

const Register: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !userName) {
      setError('Email và tên không được để trống');
      toast.error('Email và tên không được để trống');
      return;
    }

    try {
      const res = await registerApi(email, userName);
      if (res && res.success) {
        toast.success('Đăng ký thành công!');
        router.push('/confirm');
      } else {
        toast.error(res.message || "Đăng ký không thành công!");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Đã xảy ra lỗi trong quá trình đăng ký.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Image
          alt="Logo with the text 'LLT' in the center"
          src="https://storage.googleapis.com/a1aa/image/6FaPxxyIUt5CAhevJRTtYlxgyZZzDV0sMyKPxY3VqeMExqoTA.jpg"
          width={100}
          height={100}
        />
      </div>
      <h2>REGISTER</h2>
      <p>Welcome!</p>
      <form className="login-form" onSubmit={handleRegister}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          type="submit"
          className={email && userName ? "active" : "inactive"}
          disabled={!email || !userName}
        >
          Register
        </button>
      </form>
      <p>
        <br />
        Have an account?{' '}
        <Link href="/">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;

// Hàm gọi API đăng ký
async function registerApi(email: string, userName: string) {
  console.log(email, userName)
  try {
    const response = await fetch('http://localhost:8082/api/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, userName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đăng ký không thành công');
    }

    return await response.json();
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}
