import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} EduX. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
