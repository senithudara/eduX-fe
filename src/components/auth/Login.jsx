import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  FaFacebook,
  FaGoogle,
  FaGithub,
  FaExclamationCircle,
  FaSpinner,
  FaSignInAlt,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/students/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/courses");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 w-full items-center justify-center">
      <div className="flex w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-3/5 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your credentials to sign in.
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    required
                    className="w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                {isLoading ? (
                  <FaSpinner className="h-5 w-5 animate-spin" />
                ) : (
                  <FaSignInAlt className="h-5 w-5" />
                )}
                <span>{isLoading ? "Signing in..." : "Sign in"}</span>
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                <FaFacebook className="h-5 w-5" />
                <span>Login with Facebook</span>
              </button>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <FaGoogle className="h-5 w-5" />
                <span>Login with Google</span>
              </button>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-800 border border-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
                <FaGithub className="h-5 w-5" />
                <span>Login with GitHub</span>
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/registration"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex items-center justify-center">
          <img
            src="/study.png"
            alt="login page image"
            className="w-screen h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
