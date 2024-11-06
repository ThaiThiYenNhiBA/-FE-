// pages/_app.js hoặc pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import '../styles/styles.scss'; // Import CSS của bạn (nếu có)
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux'; // Nhập Provider từ react-redux
import store from '../redux/store'; // Nhập store từ file store của bạn

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}> {/* Bọc component trong Provider */}
      <Component {...pageProps} />
    </Provider>
  );
}
