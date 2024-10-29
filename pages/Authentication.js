import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../app/globals.css';

export default function Authentication() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-reset-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage('Reset link sent to your email');
        // Thêm alert khi thành công
        window.alert('Reset link has been sent to your email!');
      } else {
        setMessage(data.error || 'Error sending email');
      }
    } catch (error) {
      setMessage('Error sending email');
    }
  };

  return (
    <div className="login-container">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Image src="/Images/email1.jpg" alt="LLT Logo" width={150} height={150} />
      </div>
      <h2>Reset Password</h2>
      <p>Please enter your email to reset your password</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@test.com"
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Remembered your password? <Link href="/">Sign in</Link>
      </p>

    </div>
  );
}
