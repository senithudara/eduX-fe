import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

// StudentContext
export const StudentContext = createContext();

// creating a provider for the StudentContext
export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // fetch student details
  const fetchStudentDetails = useCallback(async () => {
    if (student) return;

    setError("");

    const token = localStorage.getItem("token");

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/students/studentdetails",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudent(response.data);
    } catch (err) {
      setError("Failed to fetch student details");
    } finally {
      setIsLoading(false);
    }
  }, [student]);

  return (
    <StudentContext.Provider
      value={{ student, setStudent, error, isLoading, fetchStudentDetails }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// to access the StudentContext
export const useStudent = () => useContext(StudentContext);
