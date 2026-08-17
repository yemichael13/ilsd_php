import React from "react";
import Goat from "../../assets/images/goat.jpg";
import Reveal from "../motion/Reveal";
import { useTranslation } from "react-i18next";

const Impact = () => {
  const { t } = useTranslation();
  const futureItems = t('home.future.items', { returnObjects: true }) || [];

  return (
    <div className="relative w-full overflow-hidden py-20 bg-[#F0FFDD]">
      <div className="absolute inset-0 opacity-20">
        <img src={Goat} alt="Livestock background" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-green-100">
            <p className="text-sm uppercase tracking-[0.2em] text-green-700 font-semibold mb-3">{t('home.future.label')}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-8">{t('home.future.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {futureItems.map((item) => (
                <div key={item} className="rounded-2xl bg-[#F0FFDD] border border-green-200 p-5 text-gray-800 font-medium">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg text-gray-700 leading-relaxed">{t('home.future.description')}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Impact;