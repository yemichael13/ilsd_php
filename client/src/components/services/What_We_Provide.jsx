import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Advice from "../../assets/images/advice.jpg";
import Artificial from "../../assets/images/artificial_insemation.jpg";
import Treatment from "../../assets/images/treatment.jpg";
import Digital from "../../assets/images/digital-record.webp";
import Disease from "../../assets/images/disease-preventionf.png";
import Vaccination from "../../assets/images/vaccination.jpg";
import { useTranslation } from 'react-i18next';

// Images aligned with translation index order
const images = [Artificial, Treatment, Advice, Disease, Vaccination, Digital];

const What_We_Provide = () => {
  const { t } = useTranslation();
  const services = t('services.list', { returnObjects: true }) || [];

  return (
    <div className="px-6 py-10 mt-16">
      <h1 className="md:text-6xl text-4xl font-black text-center mb-6">
        {t('services.title')}
      </h1>
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
        {t('services.description')}
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
        }}
        className="max-w-6xl mx-auto services-provide-swiper pt-10"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={images[index]}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700 text-sm">{service.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default What_We_Provide;