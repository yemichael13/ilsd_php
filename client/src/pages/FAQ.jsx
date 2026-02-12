import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageMotion from "../components/motion/PageMotion";
import Reveal from "../components/motion/Reveal";

import { useTranslation } from 'react-i18next';

const faqKey = 'faq.items';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = t(faqKey, { returnObjects: true }) || [];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <PageMotion>
        <div className="px-6 py-10 mt-16 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-10">
              {t('faq.title')}
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 0.03}>
                <div className="border border-green-700 rounded-xl p-4 bg-white shadow-md">
                  {/* Question + Icon */}
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="font-semibold text-green-800">
                      {faq.question}
                    </h3>
                    {activeIndex === index ? (
                      <FaTimes className="text-green-700 transition-transform duration-300 rotate-180" />
                    ) : (
                      <FaPlus className="text-green-700 transition-transform duration-300 rotate-0" />
                    )}
                  </div>

                  {/* Animated Answer */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      activeIndex === index
                        ? "max-h-40 opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Footer />
      </PageMotion>
    </div>
  );
};

export default FAQ;