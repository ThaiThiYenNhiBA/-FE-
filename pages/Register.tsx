'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
  const router = useRouter();

  // State để lưu trữ dữ liệu form và lỗi
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Reset lỗi trước khi xử lý

    // Kiểm tra hợp lệ
    if (!email || !name || !password) {
      setError('Email, tên và mật khẩu không được để trống');
      toast.error('Email, tên và mật khẩu không được để trống');
    } else {
      // Nếu hợp lệ, chuyển hướng sang trang confirm
      router.push('/confirm');
      toast.success('Đăng ký thành công!');
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>} {/* Hiển thị lỗi nếu có */}
        <button
          type="submit"
          className={email && name && password ? "active" : "inactive"}
          disabled={!email || !name || !password}
        >
          Register
        </button>
      </form>
      <p>
        <br />
        Have an account?{' '}
        <Link href="/Login">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
