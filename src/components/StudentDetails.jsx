import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaPhone,
  FaSave,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

const StudentDetails = () => {
  const { student, error, isLoading, fetchStudentDetails, setStudent } =
    useContext(StudentContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [editedStudent, setEditedStudent] = useState({
    name: "",
    email: "",
    nic: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  useEffect(() => {
    if (student?.student) {
      setEditedStudent({
        name: student.student.name,
        email: student.student.email,
        nic: student.student.nic,
        phoneNumber: student.student.phoneNumber,
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateInputs = () => {
    let newErrors = {};

    if (!editedStudent.name.trim() || editedStudent.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }
    if (
      !editedStudent.email.trim() ||
      !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(editedStudent.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }
    if (
      !editedStudent.nic.trim() ||
      !/^\d{9}[Vv]$|^\d{12}$/.test(editedStudent.nic)
    ) {
      newErrors.nic = "NIC must be 10 (ending with V/v) or 12 digits long.";
    }
    if (
      !editedStudent.phoneNumber.trim() ||
      !/^\d{10}$/.test(editedStudent.phoneNumber)
    ) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateInputs()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/students/update/${student.student.id}`,
        editedStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setUpdateSuccess("Student details updated successfully!");
        setUpdateError("");
        setIsEditing(false);

        setStudent({
          student: {
            ...student.student,
            ...editedStudent,
          },
        });

        setTimeout(() => {
          setUpdateSuccess("");
        }, 3000);
      }
    } catch (err) {
      setUpdateError(
        err.response?.data?.message || "Error updating student details"
      );
      setUpdateSuccess("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <FaSpinner className="h-8 w-8 animate-spin text-blue-500" />
        <span className="text-gray-600 font-medium">
          Loading student details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-medium">Error: {error}</p>
        <button
          onClick={fetchStudentDetails}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!student?.student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 font-medium">No student data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6 flex justify-center items-center">
      <div className="w-full bg-white rounded-2xl shadow-lg p-6 border border-green-200">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-green-950">My Details</h2>
        </div>

        {updateError && <p className="text-red-600 mt-4">{updateError}</p>}
        {updateSuccess && (
          <p className="text-green-600 mt-4">{updateSuccess}</p>
        )}

        <div className="mt-6 space-y-4">
          {["name", "email", "nic", "phoneNumber"].map((field, idx) => (
            <div
              key={idx}
              className="p-4 bg-green-50 rounded-xl border border-green-200"
            >
              <div className="flex items-center gap-3">
                {field === "name" && (
                  <FaUser className="h-5 w-5 text-green-500" />
                )}
                {field === "email" && (
                  <FaEnvelope className="h-5 w-5 text-green-500" />
                )}
                {field === "nic" && (
                  <FaIdCard className="h-5 w-5 text-green-500" />
                )}
                {field === "phoneNumber" && (
                  <FaPhone className="h-5 w-5 text-green-500" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </p>
                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={editedStudent[field]}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="text-lg text-green-900">
                      {student.student[field]}
                    </p>
                  )}
                  {errors[field] && (
                    <p className="text-red-600 text-sm">{errors[field]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 transition"
              >
                <FaSave className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2 transition"
              >
                <FaTimes className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 transition"
            >
              <FaEdit className="h-4 w-4" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
