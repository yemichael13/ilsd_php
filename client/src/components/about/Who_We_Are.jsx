import React, { useState } from "react";
import On_Work from "../../assets/images/on-work3.png";
import { useTranslation } from 'react-i18next';

const Who_We_Are = () => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="px-6 py-30">
      <h1 className="text-5xl font-bold text-center mb-4">{t('about.who.title')}</h1>
      <p className="text-lg text-gray-700">
        {t('about.who.paragraphShort')}
        {" "}
        <span
          onClick={() => setShowMore(!showMore)}
          className="text-green-700 font-semibold cursor-pointer hover:underline"
        >
          {showMore ? t('about.who.showLess') : t('about.who.readMore')}
        </span>
      </p>

      {/* Smooth fade for second paragraph */}
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          showMore ? "opacity-100 mt-4" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <p className="text-lg text-gray-700">{t('about.who.moreParagraph')}</p>
      </div>

      {/* Image with text overlay on right side */}
      <div className="relative mt-10 rounded-2xl overflow-hidden">
        <img
          src={On_Work}
          alt="on_work"
          className="w-full md:h-auto h-[400px] object-cover rounded-2xl"
        />
        <div className="absolute inset-y-0 right-0 md:w-1/2 bg-black/40 text-white flex items-center p-6 transition-opacity duration-700 ease-in-out">
          <p className="text-lg leading-relaxed">{t('about.who.overlayText')}</p>
        </div>
      </div>
    </div>
  );
};

export default Who_We_Are;