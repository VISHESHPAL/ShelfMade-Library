import React from 'react';
import vishesh from '../assets/vishesh.jpg';

const Testimonials = () => {
  const testimonialData = [
    {
      name: "Vishesh Pal",
      role: "SDE 1 @ TCS",
      image: vishesh,
      feedback:
        "The structured content and mentorship support helped me crack my first job as an SDE. Highly recommend this platform.",
    },
    {
      name: "Vikash Pal",
      role: "SI @ UPP",
      image: vishesh,
      feedback:
        "Coming from a non-tech background, I found the platform super easy to understand. It gave me the confidence to clear competitive exams.",
    },
    {
      name: "Jitendra Pal",
      role: "DSP @ DP",
      image: vishesh,
      feedback:
        "From zero to landing a government post, this journey was made smooth by these courses. Best decision ever.",
    },
  ];

  return (
    <section className="bg-[#f7f9f4] py-16 px-6 md:px-20 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#3e3e3e]">
        What Our Students Say
      </h1>
      <p className="mt-4 text-lg text-[#5b5b5b]">
        Join thousands of learners who transformed their careers with us.
      </p>

      <div className="mt-16 flex flex-wrap justify-center gap-10 md:gap-24">
        {testimonialData.map((user, i) => (
          <div
            key={i}
            className="w-80 bg-white rounded-2xl p-6 text-left shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex mt-3 gap-1">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <svg
                    key={idx}
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z"
                      fill="#FF532E"
                    />
                  </svg>
                ))}
            </div>

            {/* Feedback */}
            <p className="mt-3 text-sm text-[#5b5b5b] leading-relaxed">
              {user.feedback}
            </p>

            {/* User Info */}
            <div className="flex items-center gap-3 mt-5">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-[#3e3e3e]">
                  {user.name}
                </h2>
                <p className="text-sm text-[#5b5b5b]">{user.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
