import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Comp from "../assets/images/comp.png";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import PageMotion from "../components/motion/PageMotion";
import Reveal from "../components/motion/Reveal";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <PageMotion className="relative overflow-hidden min-h-screen">
      {/* Background image */}
      <img
        src={Comp}
        alt="bg"
        className="absolute inset-0 w-full h-screen object-cover z-0 blur-sm"
      />
      
        
      

      {/* Contact content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-white text-center px-6 py-20">
        <Reveal>
          <h2 className="text-2xl md:text-4xl font-medium mb-2">
            Become a partner or want any information?
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">Get In Touch</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4 text-lg">
            <span className="flex items-center gap-3 justify-center">
              <IoCall className="" /> +251-XXX-XXX-XXX
            </span>
            <a
              href=""
              target="blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center cursor-pointer transition-transform duration-300 hover:-translate-x-2"
            >
              <IoMdMail className="" /> info@livestock.org
            </a>
            <a
              href=""
              target="blank"
              rel="nooper noreferrer"
              className="flex items-center gap-3 justify-center cursor-pointer transition-transform duration-300 hover:-translate-x-2"
            >
              <FaLocationDot className="" /> 123 Street, Addis Ababa
            </a>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      
        <Footer />
      
    </PageMotion>
    </div>
    
  );
};

export default Contact;