
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import "../app/globals.css";
import "../app/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface FormData {
  firstname: string;
  lastname: string;
  dateofbirth: string;
  gender: string;
  location: string;
  status: string;
  username: string;
  passwordhash: string;
  email: string;
  phonenumber: string;
  avatar?: string;
}


export default function Profile() {
  const router = useRouter();
  const userId = '31489ed3-ddca-43d7-84bc-16be8144a31b';
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    fetchProfileData();
  }, [isDarkTheme]);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    dateofbirth: '',
    gender: '',
    location: '',
    status: '',
    username: '',
    passwordhash: '',
    email: '',
    phonenumber: '',
  });

  const [showpasswordhash, setShowpasswordhash] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showphonenumber, setShowphonenumber] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Fetch user profile data from the backend
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/user/${userId}`);
      if (response.ok) {
        const profileData = await response.json();
        setFormData(prevData => ({ ...prevData, ...profileData }));
        setProfileImage(profileData.avatar || null);
      } else {
        console.error('Failed to fetch profile data');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;
  
    // Chỉ chuyển đổi nếu có giá trị
    const date = value ? new Date(value).toISOString() : "";
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: date, // Lưu chuỗi ngày ở định dạng ISO
    }));
  };
  
  
  const handleSelectChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(reader.result as string); // Set the base64 image data
        };
        reader.readAsDataURL(e.target.files[0]); // Read the file as a data URL
    }
};

// Update user profile data in the backend
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8082/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ...formData, 
                avatar: profileImage // Chuyển avatar đã cập nhật
            }),
        });
        if (response.ok) {
            alert('Profile updated successfully!');
        } else {
            console.error('Failed to update profile');
            alert('Failed to update profile. Please try again.');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
};


  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <button onClick={toggleTheme} className="btn btn-custom border border-black bg-white mb-3">
          {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        </button>
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className="profile-sidebar col-md-3 text-center p-3">
          <div className="d-flex justify-content-center position-relative mb-3">
            <img
              src={profileImage || "~/images/avatar10.png"}
              alt="Profile"
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
          <p className="fw-bold">{formData.username || "User Name"}</p>
          <button className="btn btn-dark w-auto">Become an Author</button>
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
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateofbirth"
                value={formData.dateofbirth ? formData.dateofbirth.substring(0, 10) : ""} // Hiển thị ngày ở định dạng YYYY-MM-DD
                onChange={handleDateChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleSelectChange}
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
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
              />
            </div>

            <div className="mb-3">
              <label className="form-label">passwordhash</label>
              <div className="input-group">
                <input
                  type={showpasswordhash ? "text" : "password"}
                  className="form-control"
                  name="passwordhash"
                  value={formData.passwordhash}
                  onChange={handleChange}
                />
                <i
                  className={`bi ${showpasswordhash ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                  onClick={() => setShowpasswordhash(!showpasswordhash)}
                  style={{ fontSize: "1.25rem", zIndex: 10 }}
                ></i>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <input
                  type={showEmail ? "text" : "passwordhash"}
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
            
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <input
                  type={showphonenumber ? "text" : "passwordhash"}
                  className="form-control"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                />
                <i
                  className={`bi ${showphonenumber ? "bi-eye" : "bi-eye-slash"} position-absolute top-50 end-0 translate-middle-y px-3 cursor-pointer`}
                  onClick={() => setShowphonenumber(!showphonenumber)}
                  style={{ fontSize: "1.25rem", zIndex: 10 }}
                ></i>
              </div>
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