import React from "react";
import {
  FaMailBulk,
  FaPhone,
  FaQuestionCircle,
  FaChevronRight,
} from "react-icons/fa";

const Help = () => {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Go to the Courses page, find your desired course, and click 'Enroll Now'.",
    },
    {
      question: "Where can I see my enrolled courses?",
      answer: "Navigate to your profile page to see your enrolled courses.",
    },
    {
      question: "Can I unroll from a course?",
      answer:
        "Yes, you can unroll from a course by viewing the course on your profile page and clicking 'Unroll'.",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-gray-50 p-6">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Help & Support
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaQuestionCircle className="h-5 w-5 text-green-500 mr-2" />{" "}
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium text-gray-900">{faq.question}</p>
                <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Need More Help?
          </h2>
          <p className="text-gray-600 mb-4">Reach out to our support team.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <FaMailBulk className="h-5 w-5 text-green-500" /> support@edux.com
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhone className="h-5 w-5 text-green-500" /> +123 456 7890
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center text-green-500 hover:underline cursor-pointer">
              <FaChevronRight className="h-4 w-4 mr-2" /> View Courses
            </li>
            <li className="flex items-center text-green-500 hover:underline cursor-pointer">
              <FaChevronRight className="h-4 w-4 mr-2" /> My Profile
            </li>
            <li className="flex items-center text-green-500 hover:underline cursor-pointer">
              <FaChevronRight className="h-4 w-4 mr-2" /> Contact Support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;
