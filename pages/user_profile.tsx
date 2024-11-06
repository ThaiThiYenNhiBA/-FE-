import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css";
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
  email: string;
  phoneNumber: string;
  avatar: string; // Add avatar to the FormData interface
}

export default function UserProfile() {
  const router = useRouter();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    status: '',
    userName: '',
    email: '',
    phoneNumber: '',
    avatar: '', // Initialize avatar
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = "31489ed3-ddca-43d7-84bc-16be8144a31b"; // Replace with the actual user ID
        const response = await fetch(`http://localhost:8082/api/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setFormData({
          firstName: data.firstname, // Match with the API response
          lastName: data.lastname,
          dateOfBirth: data.dateofbirth.split('T')[0], // Format date
          gender: data.gender === 1 ? 'Male' : 'Female',
          location: data.location,
          status: data.status === 1 ? 'Active' : 'Inactive',
          userName: data.username,
          email: data.email,
          phoneNumber: data.phonenumber,
          avatar: data.avatar,
        });
        // Set profile image path dynamically
        setProfileImage(data.avatar ? `/images/${data.avatar}` : "/images/profile.JPG");
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    }
    fetchUserData();
  }, []);

  return (

    <div className="profile-page container d-flex justify-content-start align-items-start mt-5">
      <div className="d-flex justify-content-between">
        <button onClick={toggleTheme} className="btn btn-custom border bg-white mb-3">
          {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        </button>
      </div>

      <div className="profile-sidebar mt-2 p-3 col-md-3 text-center">
        <div className="d-flex justify-content-center position-relative mb-3">
          <img
            src={profileImage || "/images/profile.JPG"}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />

        </div>
        <p className="fw-bold">{formData.userName || "User Name"}</p>
      </div>

      <div className="profile-settings col-md-9">
        <h2 className="mb-4">User Profile</h2>
        <form className="p-3 border">
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" value={formData.firstName} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" value={formData.lastName} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="text" className="form-control" value={formData.dateOfBirth} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <input type="text" className="form-control" value={formData.gender} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input type="text" className="form-control" value={formData.location} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <input
                type={showEmail ? "text" : "password"}
                className="form-control"
                value={formData.email}
                disabled
              />
              <i
                className={`bi ${showEmail ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                onClick={() => setShowEmail(prev => !prev)}
                style={{ fontSize: "1.25rem", zIndex: 10 }}
              ></i>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <div className="input-group">
              <input
                type={showPhoneNumber ? "text" : "password"}
                className="form-control"
                value={formData.phoneNumber}
                disabled
              />
              <i
                className={`bi ${showPhoneNumber ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                onClick={() => setShowPhoneNumber(prev => !prev)}
                style={{ fontSize: "1.25rem", zIndex: 10 }}
              ></i>
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-start mt-4">
          <button
            type="button"
            className="btn btn-danger w-auto me-2"
            onClick={() => router.push('/edit_user_profile')}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-dark w-auto"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
