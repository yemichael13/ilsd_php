import React from "react";
import Help from "../../assets/images/Help.png";
import Nearby from "../../assets/images/nearby.png";
import On_Work from "../../assets/images/on-work.jpg";
import Finished from "../../assets/images/finished.jpg";
import { useTranslation } from 'react-i18next';

const images = [Help, Nearby, On_Work, Finished];

const stepsKey = 'services_how.steps';

const How_It_Works = () => {
  const { t } = useTranslation();
  const steps = t(stepsKey, { returnObjects: true }) || [];

  return (
    <div className="px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">{t('services_how.title')}</h2>
      <div className="flex flex-col gap-10 max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute h-125 left-10 md:left-15 top-0 bottom-0 w-1 bg-green-600 rounded-full"></div>

        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6 relative z-10">
            {/* Step icon */}
            <div className="shrink-0 w-20 md:w-30 md:h-30 h-20 rounded-full overflow-hidden border-4 border-green-600 bg-white shadow-md">
              <img
                src={images[index]}
                alt={step.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Step content */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-green-700">{step.title}</h3>
              <p className="text-gray-700 text-sm mt-2">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default How_It_Works;