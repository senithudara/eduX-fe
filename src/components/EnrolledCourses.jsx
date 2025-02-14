import React, { useEffect, useState, useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import axios from "axios";
import {
  FaBookOpen,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";

const EnrolledCourses = () => {
  const { student, fetchStudentDetails } = useContext(StudentContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unrollingCourseId, setUnrollingCourseId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!student?.student?.id) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/enrollments/enrolledCourses/${student.student.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch enrolled courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [student?.student?.id]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUnroll = async (courseId) => {
    setUnrollingCourseId(courseId);
    try {
      const response = await axios.delete(
        `http://localhost:5000/enrollments/unroll/${student.student.id}/${courseId}`
      );

      if (response.status === 200) {
        setCourses(courses.filter((course) => course.id !== courseId));
        showNotification("Successfully unrolled from the course");
      }
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Failed to unroll from the course",
        "error"
      );
    } finally {
      setUnrollingCourseId(null);
    }
  };

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
        role="status"
      >
        <FaSpinner className="h-8 w-8 animate-spin text-green-500 mb-4" />
        <p className="text-gray-600 font-medium">
          Loading your enrolled courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <FaExclamationCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to Load Courses
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md animate-fade-in ${
            notification.type === "error"
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
          }`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            {notification.type === "error" ? (
              <FaExclamationCircle className="h-5 w-5" />
            ) : (
              <FaCheckCircle className="h-5 w-5" />
            )}
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Enrolled Courses
        </h1>
        <p className="text-gray-600 mb-8">
          See and manage your enrolled courses
        </p>

        {courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    Course Name
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    Enrolled Date
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="py-6 px-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-green-100 text-green-500 p-2 rounded-full mr-2">
                          <FaBookOpen className="h-5 w-5" />
                        </div>
                        <span className="text-gray-900">{course.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <span className="text-gray-600">
                        {course.description}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <span className="text-gray-600">
                        {new Date(
                          course.enrollmentDate || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => handleUnroll(course.id)}
                        disabled={unrollingCourseId === course.id}
                        className={`py-1 px-3 rounded-lg font-medium transition-colors ${
                          unrollingCourseId === course.id
                            ? "bg-red-100 text-red-600 cursor-wait"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {unrollingCourseId === course.id ? (
                          <div className="flex items-center justify-center gap-2">
                            <FaSpinner className="h-4 w-4 animate-spin" />
                            <span>Unrolling...</span>
                          </div>
                        ) : (
                          "Unroll"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-left py-12 bg-white rounded-lg shadow-sm">
            <FaBookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Enrolled Courses
            </h3>
            <p className="text-gray-500">
              You haven't enrolled in any courses yet. Browse our course catalog
              to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
