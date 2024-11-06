import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import '../app/globals.css';

export default function VerifyEmail() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // Thêm biến isSuccess để lưu trạng thái thành công

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8082/api/accounts/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Verification code sent to your email');
                setIsSuccess(true); // Đánh dấu là thành công
                alert('Verification code has been sent to your email!');
                router.push({
                    pathname: '/renewpassword',
                    query: { email },
                });
            } else {
                setMessage(data.message || 'Error sending verification code');
                setIsSuccess(false); // Đánh dấu là thất bại
            }
        } catch (error) {
            setMessage('Error sending verification code');
            setIsSuccess(false); // Đánh dấu là thất bại
            console.error('Error:', error);
        }
    };

    return (
        <div
            className="verify-email-container"
            style={{
                textAlign: 'center',
                marginTop: '100px',
                padding: '30px',  // Thêm padding để tạo khoảng cách giữa nội dung và khung
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

            <h2>Verify Email</h2>
            <p>Please enter your email to receive a verification code</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <label htmlFor="email" style={{ marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@example.com"
                        required
                        style={{
                            padding: '10px 20px',
                            width: '400px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginTop: '10px',
                        }}
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
                    Send Verification Code
                </button>
            </form>

            {message && <p style={{ marginTop: '20px', color: isSuccess ? 'green' : 'red' }}>{message}</p>}

            <p style={{ marginTop: '20px' }}>
                Remembered your password?{' '}
                <Link href="/">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
