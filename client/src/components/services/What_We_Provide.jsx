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

const services = [
  {
    title: "Artificial Insemination & Reproductive Health",
    image: Artificial,
    description:
      "Enhancing livestock genetics and fertility through expert AI procedures and reproductive monitoring.",
  },
  {
    title: "Veterinary Diagnosis, Treatment & Vaccination",
    image: Treatment,
    description:
      "Providing accurate diagnosis, effective treatment, and preventive vaccinations for healthier herds.",
  },
  {
    title: "Nutrition & Breeding Advisory",
    image: Advice,
    description:
      "Guiding farmers on optimal feeding and breeding strategies to boost livestock productivity.",
  },
  {
    title: "Disease Prevention & Herd Health Planning",
    image: Disease,
    description:
      "Implementing proactive health plans to reduce disease outbreaks and improve herd resilience.",
  },
  {
    title: "Pregnancy Diagnosis & Monitoring",
    image: Vaccination,
    description:
      "Using reliable techniques to detect pregnancy early and monitor reproductive progress.",
  },
  {
    title: "Digital Record Keeping & Traceability",
    image: Digital,
    description:
      "Empowering farmers with digital tools to track livestock history, health, and movement.",
  },
];

const What_We_Provide = () => {
  return (
    <div className="px-6 py-10 mt-16">
      <h1 className="md:text-6xl text-4xl font-black text-center mb-6">
        What We Provide
      </h1>
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
        Our platform delivers essential livestock services tailored for Ethiopian farmers — combining expert care, modern tools, and practical solutions to improve productivity and animal well-being.
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
                src={service.image}
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