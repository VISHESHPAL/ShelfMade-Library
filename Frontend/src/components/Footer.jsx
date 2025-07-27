import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#f7f9f4] text-[#5b5b5b] pt-12 pb-6 px-6 ">
      <div className="flex flex-col md:flex-row justify-evenly items-start gap-12">
        {/* Brand Section */}
        <div className="md:max-w-md">
          <h1 className="text-2xl font-bold text-[#3e3e3e] mb-4">Shelf Made</h1>
          <p className="text-sm leading-relaxed">
            Empowering modern libraries with seamless digital experiences.
            Manage admissions, track borrowings, and handle fees all in one
            place — simplified for everyone.
          </p>
        </div>

        {/* Navigation and Contact Sections */}
        <div className="flex flex-col sm:flex-row gap-12">
          {/* Social Links */}
          <div>
            <h2 className="text-[#3e3e3e] font-semibold mb-4">
              Connect with Me
            </h2>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/the_vishesh_001/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black cursor-pointer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/vishesh-pal-88831a2a6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black cursor-pointer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/Visheshpal001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black cursor-pointer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919628810149"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black cursor-pointer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-[#3e3e3e] font-semibold mb-4">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <button onClick={scrollToTop} className="hover:text-black cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={scrollToTop} className="hover:text-black cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={scrollToTop} className="hover:text-black cursor-pointer">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={scrollToTop} className="hover:text-black cursor-pointer">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-[#3e3e3e] font-semibold mb-4">Get in Touch</h2>
            <ul className="text-sm space-y-2">
              <li>
                📞{" "}
                <a href="tel:+919628810149" className="hover:text-black ">
                  +91-96288-10149
                </a>
              </li>
              <li>
                📧{" "}
                <a
                  href="mailto:palvishesh613@gmail.com"
                  className="hover:text-black "
                >
                  palvishesh613@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <div className="text-right mt-6">
        <button
          onClick={scrollToTop}
          className="text-lg font-medium text-[#3e3e3e] hover:text-black underline cursor-pointer"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Copyright */}
      <p className="text-center text-xs md:text-sm">
        © {new Date().getFullYear()} <strong>Built by Vishesh</strong>. All
        rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
