import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function RenewPassword() {
  const router = useRouter();
  const [code, setCode] = useState(''); // Thêm state cho mã xác thực
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/api/accounts/confirm', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, password }),
      });

      if (response.ok) {
        alert('Password has been reset successfully!');
        router.push('/'); // Chuyển hướng người dùng đến trang đăng nhập sau khi thành công
      } else {
        const data = await response.json();
        alert(data.message || 'Error resetting password');
      }
    } catch (error) {
      alert('Error resetting password');
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '100px',
        padding: '30px', // Thêm padding để tạo khoảng cách giữa nội dung và khung
        maxWidth: '500px', // Giới hạn chiều rộng của khung
        margin: '100px auto', // Căn giữa khung
        border: '1px solid #ccc', // Thêm khung viền màu xám
        borderRadius: '8px', // Bo tròn khung
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Tạo hiệu ứng đổ bóng nhẹ
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Image src="/Images/email.jpg" alt="LLT Logo" width={150} height={150} />
      </div>

      <h2>Reset Password</h2>
      <p>Please enter the code sent to your email and your new password</p>

      <form onSubmit={handleSubmit}>
        {/* Code Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="code" style={{ display: 'block', textAlign: 'left' }}>Verification Code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            required
            style={{ padding: '10px', width: '400px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '10px' }}
          />
        </div>

        {/* New Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', textAlign: 'left' }}>New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            required
            style={{ padding: '10px', width: '400px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '10px' }}
          />
        </div>

        {/* Confirm Password Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirm-password" style={{ display: 'block', textAlign: 'left' }}>Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••"
            required
            style={{ padding: '10px', width: '400px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '10px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            width: '400px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reset Password
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Remembered your password?{' '}
        <Link href="/">
          Sign in
        </Link>
      </p>
    </div>
  );
}
