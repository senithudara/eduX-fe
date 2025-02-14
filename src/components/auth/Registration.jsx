import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaExclamationCircle, FaSpinner, FaSignInAlt } from "react-icons/fa";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nic: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const nicRegex = /^(\d{9}[VvXx]|\d{12})$/;
    const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;

    // check if the are passwords matching
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    if (!nicRegex.test(formData.nic)) {
      setError(
        "Invalid NIC format. Use 9 digits followed by 'V' or 'X', or a 12-digit format."
      );
      return false;
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Invalid phone number format.");
      return false;
    }

    return true;
  };
  //error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/students/register",
        formData
      );
      if (response.status === 201) {
        setSuccessMessage(
          "Registration successful! Redirecting to login page..."
        );
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-slate-100 w-full items-center justify-center">
      <div className="flex w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-3/5 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Create a new Account
            </h2>
            <p className="text-gray-600 mb-6">
              Please fill in your details to create a new account.
            </p>

            {error && (
              <div
                className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-600 mb-4"
                role="alert"
              >
                <FaExclamationCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {successMessage && (
              <div
                className="flex items-center gap-2 p-4 rounded-lg bg-green-50 text-green-600 mb-4"
                role="alert"
              >
                <FaExclamationCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{successMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "name", placeholder: "Name" },
                { id: "email", placeholder: "Email" },
                { id: "nic", placeholder: "NIC" },
                { id: "phoneNumber", placeholder: "Phone Number" },
                { id: "password", placeholder: "Password", type: "password" },
                {
                  id: "confirmPassword",
                  placeholder: "Confirm Password",
                  type: "password",
                },
              ].map(({ id, placeholder, type = "text" }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {placeholder}
                  </label>
                  <div className="relative">
                    <input
                      id={id}
                      name={id}
                      type={type}
                      required
                      className="w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder={placeholder}
                      value={formData[id]}
                      onChange={(e) =>
                        setFormData({ ...formData, [id]: e.target.value })
                      }
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5  bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                {isLoading ? (
                  <FaSpinner className="h-5 w-5 animate-spin" />
                ) : (
                  <FaSignInAlt className="h-5 w-5" />
                )}
                <span>{isLoading ? "Registering..." : "Register"}</span>
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-500">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex items-center justify-center">
          <img
            src="/study.png"
            alt="registration page image"
            className="w-screen h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
