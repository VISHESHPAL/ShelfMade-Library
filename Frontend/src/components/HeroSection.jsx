    import React from 'react';
    import homeImage from '../assets/homeimage.webp';

    const HeroSection = () => {
    return (
        <section className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 py-12 bg-[#f7f9f4] h-screen gap-10">
        {/* Left Text Content */}
        <div className="text-center md:text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#3e3e3e] leading-tight tracking-tight">
            What goes into the mind,<br /> comes out in a life.
            </h1>
            <p className="mt-6 text-lg text-[#5b5b5b] leading-relaxed">
            Dive into the world of books and unlock endless possibilities. Every page you turn builds the story of your success.
            </p>

            <a href="#books">
                <button className="mt-8 bg-[#bdc1b0] text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-[#a8ae95] transition-all duration-300" >
            Explore Books
            </button>
            </a>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center md:justify-end w-full">
            <img
            src={homeImage}
            alt="Person reading book"
            className="w-[90%] max-w-[480px] md:w-[100%] md:max-w-[520px] drop-shadow-xl rounded-xl"
            />
        </div>
        </section>
    );
    };

    export default HeroSection;
