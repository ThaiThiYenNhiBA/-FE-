import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css";
import "../app/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../app/globals.css';

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
  const [profileImage, setProfileImage] = useState<string | null>("/profile.JPG");

  useEffect(() => {
    const fetchedData: FormData = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      location: 'New York',
      status: 'Active',
      userName: 'johndoe123',
      password: 'password123',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
    };
    setFormData(fetchedData);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="profile-sidebar col-md-3 text-center p-3">
          <div className="d-flex justify-content-center position-relative mb-3">
            <img
              src="/Images/OIP.png"
              alt="Profile"
              className="img-fluid rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          <p className="fw-bold">{formData.userName || "User Name"}</p>
          <button className="btn btn-dark w-auto mb-3">Become an Author</button>
          <button onClick={toggleTheme} className="btn btn-custom border border-black bg-white">
            {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          </button>
        </div>

        {/* Profile Settings */}
        <div className="profile-settings col-md-9">
          <h2 className="mb-4">User Profile</h2>
          <form className="p-3 border">
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                readOnly
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
                  readOnly
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
                  readOnly
                />
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
                    readOnly
                  />
                  <span className="input-group-text cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    <i
                      className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                      style={{ fontSize: "1.25rem" }}
                    ></i>
                  </span>
                </div>
              </div>

              <div className="col">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="d-flex justify-content-start mt-4">
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
