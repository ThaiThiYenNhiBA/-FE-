// pages/_app.js hoặc pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import '../app/globals.css'; // Import CSS của bạn (nếu có)
import 'react-toastify/dist/ReactToastify.css';


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
