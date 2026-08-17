import React from "react";
import Cow from "../../assets/images/cow.png";
import { useTranslation } from "react-i18next";

const Why_ILSD = () => {
  const { t } = useTranslation();
  const reasons = t('home.whyChoose.items', { returnObjects: true }) || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="bg-gradient-to-r from-[#F0FFDD] to-white rounded-3xl shadow-lg overflow-hidden flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <img src={Cow} alt="Livestock care" className="w-full h-full object-cover" />
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700 mb-3">{t('home.whyChoose.label')}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-8">{t('home.whyChoose.title')}</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-2xl leading-none">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Why_ILSD;