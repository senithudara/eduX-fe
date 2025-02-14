import React from "react";
import Courses from "../components/Courses";
import EnrolledCourses from "../components/EnrolledCourses";
import Navbar from "../components/Header";
import Footer from "../components/Footer";

const CoursesPage = () => {
  return (
    <div>
      <Navbar />
      <Courses />
      <EnrolledCourses />
      <Footer />
    </div>
  );
};

export default CoursesPage;
