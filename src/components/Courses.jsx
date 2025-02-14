import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StudentContext } from "../context/StudentContext";
import {
  FaBookOpen,
  FaSpinner,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { student, fetchStudentDetails } = useContext(StudentContext);

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/courses/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
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
  }, []);
  //check if the student already is enrolled in courses, fetch all enrolled courses
  useEffect(() => {
    if (student?.student?.id) {
      const fetchEnrolledCourses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/enrollments/${student.student.id}`
          );
          setEnrolledCourses(
            response.data.map((enrollment) => enrollment.courseId)
          );
        } catch (err) {
          console.error("Error fetching enrolled courses:", err);
        }
      };

      fetchEnrolledCourses();
    }
  }, [student]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEnroll = async (courseId) => {
    if (!student?.student?.id) {
      showNotification("Please log in to enroll in courses.", "error");
      return;
    }

    setEnrollingCourseId(courseId);

    try {
      const response = await axios.post("http://localhost:5000/enrollments/", {
        studentId: student.student.id,
        courseId,
      });

      if (response.status === 201) {
        showNotification("Successfully enrolled in the course!");
        setEnrolledCourses((prev) => [...prev, courseId]);
      }
    } catch (err) {
      showNotification(
        err.response?.data?.message || "Failed to enroll in the course.",
        "error"
      );
    } finally {
      setEnrollingCourseId(null);
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
          Loading available courses...
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
          Available Courses
        </h1>
        <p className="text-gray-600 mb-8">
          Explore our selection of courses and start learning today
        </p>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {course.name}
                      </h2>
                      <div className="bg-green-100 text-green-500 p-2 rounded-full">
                        <FaBookOpen className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">{course.description}</p>

                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        isEnrolled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : enrollingCourseId === course.id
                          ? "bg-green-100 text-green-600 cursor-wait"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                      onClick={() => handleEnroll(course.id)}
                      disabled={isEnrolled || enrollingCourseId === course.id}
                    >
                      {isEnrolled ? (
                        "Enrolled"
                      ) : enrollingCourseId === course.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <FaSpinner className="h-4 w-4 animate-spin" />
                          <span>Enrolling...</span>
                        </div>
                      ) : (
                        "Enroll Now"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-left py-12">
            <FaBookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No courses are currently available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
