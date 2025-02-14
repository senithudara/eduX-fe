import React from "react";
import Navbar from "../components/Header";
import StudentDetails from "../components/StudentProfiel";
import EnrolledCorses from "../components/EnrolledCourses";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <StudentDetails />
      <EnrolledCorses />
      <Footer />
    </div>
  );
};

export default Home;
