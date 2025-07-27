import React from "react";
import aboutImg from "../assets/about-img.jpg";

const AboutUs = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 bg-[#f7f9f4] gap-10">
      {/* Left Image */}
      <div className="flex justify-center md:justify-start w-full md:w-1/2">
        <img
          src={aboutImg}
          alt="About us illustration"
          className="w-[90%] max-w-[460px] md:w-full md:max-w-[500px] drop-shadow-xl rounded-xl"
        />
      </div>

      {/* Right Text Content */}
      <div className="text-center md:text-left max-w-xl md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#3e3e3e] leading-tight tracking-tight mb-4">
          About Us
        </h2>
        <p className="text-[#5b5b5b] text-lg mb-4 leading-relaxed">
          “Books give a soul to the universe, wings to the mind, flight to the imagination, and life to everything.” – Plato
        </p>
        <p className="text-[#4b4b4b] text-base mb-6 leading-relaxed">
          InSight Books is a curated collection of children's books – Fiction, Non-Fiction, Literature, Classics, Academic and Competitive Exam titles – authored by both Indian and international writers. It's your go-to platform where every book search finds its destination.
        </p>
        <button className="bg-[#bdc1b0] hover:bg-[#a8ae95] text-white font-medium px-6 py-3 rounded-full text-base transition duration-300">
          Know More
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
