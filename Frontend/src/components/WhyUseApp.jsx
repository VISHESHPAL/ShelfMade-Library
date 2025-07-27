import React from "react";
import { CheckCircle } from "lucide-react";

const features = [
  "Easy Admission Process",
  "Online Fee Management",
  "Real-time Book Borrowing System",
  "Full Admin Transparency",
];

const WhyUseApp = () => {
  return (
    <section className="bg-[#f7f9f4] py-16 px-6 md:px-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#3e3e3e] mb-4">
        Why Use This Library ?
      </h1>
      <p className="text-[#5b5b5b] text-lg max-w-3xl mx-auto">
        Experience the future of library management with modern features that streamline operations and offer a smooth experience for both students and admins.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <CheckCircle className="text-green-600 mt-1" size={24} />
            <p className="text-lg text-[#3e3e3e] font-medium">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUseApp;
