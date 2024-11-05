'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Confirm: React.FC = () => {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!code || !password || !confirmPassword) {
      setError('Mã xác nhận và mật khẩu không được để trống');
      toast.error('Mã xác nhận và mật khẩu không được để trống');
      return;
    } else if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      const res = await confirmApi(code, password); 
      if (res && res.success) {
        toast.success('Xác thực thành công!');
        router.push('/success'); 
      } else {
        toast.error(res.message || "Xác thực không thành công!");
      }
    } catch (error) {
      console.error("Confirm error:", error);
      toast.error("Đã xảy ra lỗi trong quá trình xác thực.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Image
          alt="Logo with the text 'LLT' in the center"
          src="https://storage.googleapis.com/a1aa/image/VfvBgKdef4LnSpe4oswIjawAoKEAevQKZReDevhoSlGOZiy0JA.jpg"
          width={100}
          height={100}
        />
      </div>
      <h2>CONFIRM</h2>
      <p>Welcome!</p>
      <form className="login-form" onSubmit={handleConfirm}>
        <div className="input-group">
          <label htmlFor="code">Verification Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Your verification code"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your new password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <button
          type="submit"
          className={code && password && confirmPassword ? "active" : "inactive"}
          disabled={!code || !password || !confirmPassword}
        >
          Confirm
        </button>
      </form>
      <p>
        <br />
        Already confirmed?{' '}
        <Link href="/">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Confirm;


async function confirmApi(code: string, password: string) {
  try {
    const response = await fetch('http://localhost:8082/api/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Xác thực không thành công');
    }

    return await response.json();
  } catch (error) {
    console.error("Error during API call:", error);
    throw error; 
  }
}
