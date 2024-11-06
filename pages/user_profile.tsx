import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css";
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
  email: string;
  phoneNumber: string;
  avatar: string;
}

export default function UserProfile() {
  const router = useRouter();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
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
    avatar: '',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = "f035f873-5a78-4b5e-9a41-8ae2a443d842";
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setFormData({
          firstName: data.firstname,
          lastName: data.lastname,
          dateOfBirth: data.dateofbirth.split('T')[0],
          gender: data.gender === 1 ? 'Male' : 'Female',
          location: data.location,
          status: data.status === 1 ? 'Active' : 'Inactive',
          userName: data.username,
          email: data.email,
          phoneNumber: data.phonenumber,
          avatar: data.avatar,
        });
        setProfileImage(data.avatar ? `/images/${data.avatar}` : "/images/profile.JPG");
      } catch (error) {
        console.error("Error loading user data:", error);
        // Consider setting an error message for the user here
      }
    }
    fetchUserData();
  }, []);

  return (
    <div className="profile-page container d-flex justify-content-start align-items-start mt-5">
      <div className="d-flex justify-content-between">
        <button onClick={toggleTheme} className="btn btn-custom border border-black bg-white w-fit">
          <i className={`bi ${isDarkTheme ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
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
          {[
            { label: "First Name", value: formData.firstName },
            { label: "Last Name", value: formData.lastName },
            { label: "Date of Birth", value: formData.dateOfBirth },
            { label: "Gender", value: formData.gender },
            { label: "Location", value: formData.location },
          ].map(({ label, value }, idx) => (
            <div key={idx} className="mb-3">
              <label className="form-label">{label}</label>
              <input type="text" className="form-control" value={value} disabled />
            </div>
          ))}

          {[
            { label: "Email", value: formData.email, show: showEmail, toggle: setShowEmail },
            { label: "Phone Number", value: formData.phoneNumber, show: showPhoneNumber, toggle: setShowPhoneNumber },
          ].map(({ label, value, show, toggle }, idx) => (
            <div key={idx} className="mb-3">
              <label className="form-label">{label}</label>
              <div className="input-group">
                <input type={show ? "text" : "password"} className="form-control" value={value} disabled />
                <i
                  className={`bi ${show ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                  aria-label={`Toggle ${label}`}
                  onClick={() => toggle(prev => !prev)}
                  style={{ fontSize: "1.25rem", zIndex: 10 }}
                ></i>
              </div>
            </div>
          ))}
        </form> 
      
        <div className="d-flex justify-content-start mt-4">
          <button type="button" className="btn btn-danger w-auto me-2" onClick={() => router.push('/edit_user_profile')}>
            Edit
          </button>
          <button type="button" className="btn btn-dark w-auto" onClick={() => router.back()}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
