import React, { useState } from "react";
import Cow from "../assets/images/cow2.jpg";
import Logo from "../assets/images/logo_live.png";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';



const Footer = () => {
  const { t } = useTranslation();

  return (
    <section>
      <div className="relative overflow-hidden w-full">
        <img
          src={Cow}
          alt="Cow"
          className="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
        />
        <div className="relative z-10 h-full flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-1/2 md:mb-0 mb-4 items-center ">
            <a href="/" className="cursor-pointer object-contain rounded-full">
              <img
                src={Logo}
                alt="logo"
                className="md:w-50 w-20 md:h-50 h-20 rounded-full mt-10"
              />
            </a>

            <h3 className="text-green-700 font-bold md:font-black tedt-xl md:text-3xl text-center">{t('footer.brandName')}</h3>
            <form
              
              className="md:flex md:justify-center md:items-center md:my-10 hidden"
            >
              <input
                type="email"
                name="email"
                
                
                placeholder={t('footer.placeholder')}
                className="rounded-l-2xl bg-white border border-green-700 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                
                className="bg-green-700 text-white font-semibold rounded-r-2xl py-2 px-4 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer border border-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('footer.subscribeButton')}
              </button>
            </form>
            
          </div>
                <div className="w-full md:w-1/2 flex md:gap-20 gap-5 justify-center items-center px-4">
                    <div className=" border-r-2 border-r-white md:px-6 px-3 py-1 md:py-3">
                        <h3 className="md:text-3xl text-2xl text-white font-bold mb-4">{t('footer.quickLinks')}</h3>
                            <ul className="flex flex-col gap-2 font-semibold text-sm text-white">
                            <li ><Link to="/news" className="cursor-pointer hover:text-green-700 transition-colors duration-300">{t('nav.news')}</Link></li>
                            <li ><Link to="/" className="cursor-pointer hover:text-green-700 transition-colors duration-300">{t('nav.home')}</Link></li>
                            <li ><Link to="/about" className="cursor-pointer hover:text-green-700 transition-colors duration-300">{t('nav.about')}</Link></li>
                            <li ><Link to="/services" className="cursor-pointer hover:text-green-700 transition-colors duration-300">{t('nav.services')}</Link></li>
                            <li ><Link to="/faq" className="cursor-pointer hover:text-green-700 transition-colors duration-300">{t('nav.faq')}</Link></li>
                            <li ><Link to="/contact" className="cursor-pointer hover:text-green-700 transition-colors duration-300">{t('nav.contact')}</Link></li>
                            </ul>
                    </div>
                    <div className="">
                        <h3 className="text-white font-bold md:text-3xl text-2xl mb-4">{t('footer.findUs')}</h3>
                        <ul className="flex flex-col text-sm gap-2">
                            
                            <a href="" target="_blank" rel="noopener noreferrer" className="cursor-pointer items-baseline transition-transform duration-300 hover:-translate-y-2 flex gap-2 text-white font-semibold"><FaFacebook />Facebook</a>
                            <a href="" target="_blank" rel="noopener noreferrer" className="cursor-pointer items-baseline transition-transform duration-300 hover:-translate-y-2 flex gap-2 text-white font-semibold"><FaInstagram />Instagram</a>
                            <a href="" target="_blank" rel="noopener noreferrer" className="cursor-pointer items-baseline transition-transform duration-300 hover:-translate-y-2 flex gap-2 text-white font-semibold"><FaLinkedin />LinkedIn</a>
                            <a href="" target="_blank" rel="noopener noreferrer" className="cursor-pointer items-baseline transition-transform duration-300 hover:-translate-y-2 flex gap-2 text-white font-semibold"><FaXTwitter />X</a>
                            <a href="" target="_blank" rel="noopener noreferrer" className="cursor-pointer items-baseline transition-transform duration-300 hover:-translate-y-2 flex gap-2 text-white font-semibold"><FaTiktok />Tiktok</a>
                        </ul>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
          <form
            
            className="flex justify-center items-center my-10 md:hidden px-4"
          >
            <input
              type="email"
              name="email"
              
              
              placeholder={t('footer.placeholder')}
              className="rounded-l-2xl bg-white border border-green-700 py-2 px-4 max-w-[200px] flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              
              className="bg-green-700 text-white font-semibold rounded-r-2xl py-2 px-4 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer border border-green-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('footer.subscribeButton')}
            </button>
          </form>
          
        <div className="bg-white w-full p-2 flex justify-around">
          <p className="font-light text-center">&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
        </section>
        
    )
}

export default Footer;