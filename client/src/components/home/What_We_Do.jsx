import React from "react";
import AI from "../../assets/images/artificial_ins.avif";
import Vet_Services from "../../assets/images/vet_services.jpg";
import Advisory from "../../assets/images/advisory_nutrition.webp";
import { useTranslation } from "react-i18next";

const What_We_Do = () => {
  const { t } = useTranslation();
  const services = t("home.currentServices.items", { returnObjects: true }) || [];
  const images = [Vet_Services, AI, Advisory];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700 mb-3">{t('home.currentServices.label')}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-green-900">{t('home.currentServices.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:-translate-y-1 transition-transform duration-300"
            >
              <img
                src={images[index]}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-3">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-green-700">
                  {service.highlights.map((item) => (
                    <span key={item} className="bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default What_We_Do;