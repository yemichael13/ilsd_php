import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Comp from "../assets/images/i12.jpg";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import PageMotion from "../components/motion/PageMotion";
import Reveal from "../components/motion/Reveal";
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

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
            {t('contact.heading')}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">{t('contact.title')}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4 text-lg text-white">
            <span className="flex items-center gap-3 justify-center">
              <IoCall className="" /> {t('contact.phone')}
            </span>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=hulegebvet@gmail.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center cursor-pointer transition-transform duration-300 hover:-translate-x-2"
            >
              <IoMdMail className="" /> {t('contact.email')}
            </a>
            <a
              href="https://www.google.com/maps/place/Hulegeb+Agricultural+Supports+Service/@9.6576677,39.5052047,1262m/data=!3m1!1e3!4m6!3m5!1s0x1649bdeb073f71e9:0xa9562c5e4568688d!8m2!3d9.6618726!4d39.50974!16s%2Fg%2F11nvsc2g40?entry=ttu&g_ep=EgoyMDI2MDgzMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center cursor-pointer transition-transform duration-300 hover:-translate-x-2"
            >
              <FaLocationDot className="" /> {t('contact.address')}
            </a>
            <a
              href="https://maps.app.goo.gl/H7GJpNn8d6DQywsu8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center cursor-pointer transition-transform duration-300 hover:-translate-x-2"
            >
              <FaLocationDot className="" /> Working Place
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