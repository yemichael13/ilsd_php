import React from "react";
import Sheep_Cow from "../../assets/images/sheep_cow.png";
import Texture from "../../assets/images/green-effect.png";
import Checklist from "../../assets/images/checklist.png";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Quality = () => {
  const { t } = useTranslation();
  const qualityItems = t('quality.items', { returnObjects: true }) || [];

  return (
    <div className="pt-10 ">
      <h2 className="text-4xl font-bold text-center mb-10">{t('quality.title')}</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full flex">
          <img
            src={Sheep_Cow}
            alt="sheep_cow"
            className="w-full h-auto object-contain max-w-md"
          />
        </div>

        <div className="relative md:w-2/3 w-full flex justify-center items-center">
          <img
            src={Texture}
            alt="texture"
            className="absolute inset-0 w-full h-full object-cover opacity-80 z-0 rounded-2xl"
          />

          <img
            src={Checklist}
            alt="checklist"
            className="relative z-10 w-3/4 object-contain"
          />

          <div className="absolute z-20 top-1/4 left-1/2 md:-translate-x-1/5 -translate-x-1/3 flex flex-col gap-4 text-green-900 font-semibold text-sm md:text-base w-3/4 pr-4">
            {qualityItems.map((item, index) => (
              <p key={index} className="flex items-center gap-2">
                <FaCheck className="text-green-700" /> {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;