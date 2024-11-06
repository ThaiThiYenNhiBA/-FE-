// components/Footer.tsx
import React from 'react';
import { FaChevronLeft, FaChevronRight, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="text-center mt-10">
        <h1 className="text-4xl text-black">HoT</h1> {/* Đặt màu chữ đen */}
      </div>
      <div className="flex justify-center items-center mt-10">
        <button className="text-2xl mx-4">
          <FaChevronLeft />
        </button>
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div className="text-center" key={index}>
              <div className="border p-4">
                <img
                  alt={`Placeholder image ${index + 1}`}
                  height={200}
                  src={`https://storage.googleapis.com/a1aa/image/placeholder${index + 1}.jpg`} // Thay đổi theo đường dẫn hình ảnh của bạn
                  width={150}
                />
              </div>
              <p className="text-black">Name</p> {/* Đặt màu chữ đen */}
            </div>
          ))}
        </div>
        <button className="text-2xl mx-4">
          <FaChevronRight />
        </button>
      </div>
      <footer className="bg-white mt-10 p-10">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <h2 className="text-xl text-black">Web Name</h2> {/* Đặt màu chữ đen */}
            <p className="text-black">
              Discover endless adventures, laughter, and our world of comics. Join us today and immerse yourself in a world of boundless imagination!
            </p>
          </div>
          <div>
            <h2 className="text-xl text-black">Legal Information</h2> {/* Đặt màu chữ đen */}
            <p className="text-black">Terms of Service</p> {/* Đặt màu chữ đen */}
            <p className="text-black">Privacy Policy</p> {/* Đặt màu chữ đen */}
            <p className="text-black">Disclaimer</p> {/* Đặt màu chữ đen */}
          </div>
          <div>
            <h2 className="text-xl text-black">Contact us</h2> {/* Đặt màu chữ đen */}
            <p className="text-black flex items-center">
              <FaPhone className="mr-1" /> 0xxxxxxxxx {/* Cách biểu tượng với văn bản */}
            </p>
            <p className="text-black flex items-center">
              <FaMapMarkerAlt className="mr-1" /> 8C Tong Huu Dinh, HCM City {/* Cách biểu tượng với văn bản */}
            </p>
            <p className="text-black flex items-center">
              <FaClock className="mr-1" /> 9 a.m - 6 p.m {/* Cách biểu tượng với văn bản */}
            </p>
          </div>
          <div>
            <h2 className="text-xl text-black">Follow us</h2> {/* Đặt màu chữ đen */}
            <div className="flex justify-center space-x-4">
              <a href="#">
                <FaFacebook className="fa-2x" />
              </a>
              <a href="#">
                <FaInstagram className="fa-2x" />
              </a>
              <a href="#">
                <FaTwitter className="fa-2x" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
