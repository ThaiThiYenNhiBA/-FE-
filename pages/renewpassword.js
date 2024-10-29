import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function RenewPassword() {
  const router = useRouter();
  const { email } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Thêm state cho Confirm Password

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp nhau
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Xử lý logic đặt lại mật khẩu ở đây
    console.log(`New password for ${email}: ${password}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Image src="/Images/email.jpg" alt="LLT Logo" width={150} height={150} />
      </div>

      <h2>Reset Password</h2>
      <p>Please enter your new password</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', textAlign: 'left' }}>New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            required
            style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '10px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirm-password" style={{ display: 'block', textAlign: 'left' }}>Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Sử dụng state riêng cho Confirm Password
            placeholder="••••••••••"
            required
            style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '10px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
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

      {/* Footer */}
      <p style={{ marginTop: '20px' }}>
        Remembered your password?{' '}
        <Link href="/">
          Sign in
        </Link>
      </p>
    </div>
  );
}
