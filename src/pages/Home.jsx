import React from "react";
import Navbar from "../components/Navbar";
import StudentDetails from "../components/StudentDetails";
import EnrolledCorses from "../components/EnrolledCorses";
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
