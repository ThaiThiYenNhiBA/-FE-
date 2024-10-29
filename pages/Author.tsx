import React, { useState, useEffect } from "react";
import "../app/author.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface FormData {
  fullname: string;
  email: string;
  createdDate: string;
  userName: string;
  authorName: string;
  type: string;
}

export default function Author() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    createdDate: "",
    userName: "",
    authorName: "",
    type: "",
  });

  useEffect(() => {
    const fetchedData: FormData = {
      fullname: "Christenson",
      email: "Christenson@gmail.com",
      createdDate: "2023-01-01",
      userName: "Chris12",
      authorName: "ChrisHorror",
      type: "Horror",
    };
    setFormData(fetchedData);
  }, []);

  return (
    <div className="Author-page container d-flex justify-content-start align-items-start mt-5">
      <div className="Author-sidebar mt-2 p-3 col-md-3 text-center">
        <img
          src="/images/Author.jpg"
          alt="Profile"
          className="img-fluid rounded-circle mb-3"
          style={{ width: "150px", height: "150px" }}
        />
      </div>
      <div className="Author-settings col-md-9">
        <h1 className="mb-4">Author</h1>
        <div className="p-3" style={{ border: "1px solid #ccc" }}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <p className="border rounded p-2 w-full">{formData.fullname}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <p className="border rounded p-2 w-full">{formData.email}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Created Date</label>
            <p className="border rounded p-2 w-full">{formData.createdDate}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">User Name</label>
            <p className="border rounded p-2 w-full">{formData.userName}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Author Name</label>
            <p className="border rounded p-2 w-full">{formData.authorName}</p>
          </div>

          <div className="mb-3">
            <label className="form-label">Type</label>
            <p className="border rounded p-2 w-full">{formData.type}</p>
          </div>

          <button type="button" className="btn btn-primary">Go back</button>
        </div>
      </div>
    </div>
  );
}
