import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css";
import "../app/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  status: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export default function Profile() {
  const router = useRouter();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    status: '',
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Profile saved:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="profile-sidebar col-md-3 text-center p-3">
          <div className="d-flex justify-content-center position-relative mb-3">
            <img
              src={profileImage || "/images/profile.JPG"}
              alt=""
              className="img-fluid rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <div className="file-input-icon position-absolute" style={{ bottom: '0', cursor: 'pointer' }}>
              <label htmlFor="imageUpload" className="position-relative" style={{ display: 'inline-block' }}>
                <i className="bi bi-camera-fill" style={{ fontSize: '1.5rem', color: 'white', backgroundColor: 'black', borderRadius: '50%', padding: '8px' }}></i>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="d-none"
                />
              </label>
            </div>
          </div>
          <p className="fw-bold">{formData.userName || "User Name"}</p>
          <button className="btn btn-dark w-auto mb-3">Become an Author</button>
          <button onClick={toggleTheme} className="btn btn-custom border border-black bg-white">
            {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          </button>
        </div>

        {/* Profile Settings */}
        <div className="profile-settings col-md-9">
          <h2 className="mb-4">Edit User Profile</h2>
          <form onSubmit={handleSubmit} className="p-3 border">
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="form-label">Gender</label>
                <select
                  className="form-control"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i
                    className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ fontSize: "1.25rem", zIndex: 10 }}
                  ></i>
                </div>
              </div>
              <div className="col">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <input
                    type={showEmail ? "text" : "password"}
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <i
                    className={`bi ${showEmail ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                    onClick={() => setShowEmail(!showEmail)}
                    style={{ fontSize: "1.25rem", zIndex: 10 }}
                  ></i>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <input
                  type={showPhoneNumber ? "text" : "password"}
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <i
                  className={`bi ${showPhoneNumber ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                  onClick={() => setShowPhoneNumber(!showPhoneNumber)}
                  style={{ fontSize: "1.25rem", zIndex: 10 }}
                ></i>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="d-flex justify-content-start mt-4">
              <button type="submit" className="btn btn-danger me-2">Save Profile</button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => router.push('/user_profile')}
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
