import React, { useState } from "react";
import Logo from "../assets/images/logo_live.png";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { t } = useTranslation();

  const navItems = [
    { key: 'news', path: '/news' },
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'faq', path: '/faq' },
    { key: 'contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 top-5 px-6 md:px-20 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full">
        <a href="/" className="cusror-pointer object-contain rounded-full">
          <img
            src={Logo}
            alt="ILDS"
            className="w-full h-full object-contain rounded-full"
          />
        </a>
        
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-6 bg-white rounded-2xl text-black text-lg justify-center px-6 items-center font-medium h-10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const activeClass = isActive
            ? 'text-white font-semibold bg-green-700 py-2 px-4 rounded-lg'
            : item.key === 'contact'
            ? 'text-white bg-yellow-600 px-4 font-semibold py-2 rounded-lg'
            : 'hover:text-green-700 transition py-2';

          return (
            <li key={item.path}>
              <Link to={item.path} className={activeClass}>
                {t(`nav.${item.key}`)}
              </Link>
            </li>
          );
        })}

        <li>
          <LanguageSwitcher />
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {/* Simple hamburger icon */}
        <div className="space-y-1 ">
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </div>
      </button>

      {/* Sidebar for Mobile */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-green-700">{t('menu.menu')}</h2>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="text-black text-2xl px-2"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
        </div>
        <ul className="flex flex-col gap-4 p-6 text-lg font-medium">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const activeClass = isActive
              ? "text-white font-semibold bg-green-700 py-2 px-4 rounded-lg"
              : item.key === 'contact'
              ? "text-white bg-yellow-600 px-4 font-semibold py-2 rounded-lg"
              : "hover:text-green-700 transition py-2";

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={activeClass}
                  onClick={() => setIsOpen(false)} // close sidebar on click
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;