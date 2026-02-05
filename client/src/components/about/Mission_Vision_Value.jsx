import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import Texture from "../../assets/images/green-texture.jpg";
import Accessibility from "../../assets/images/accessibility.webp";
import Professionalism from "../../assets/images/professionalism.png";
import Innovation from "../../assets/images/innovation.png";
import Impact from "../../assets/images/impact.png";
import Quality from "../../assets/images/quality.png";
import Sustainability from "../../assets/images/sustainability.png";
import Farm_Centered from "../../assets/images/farm-centered.png";
import Digital_Inclusion from "../../assets/images/digital-inclusion.png";
import Accountability from "../../assets/images/accontability.png";

const values = [
  {
    image: Accessibility,
    title: "Accessibility",
    text: "We believe every farmer deserves access to quality services.",
  },
  {
    image: Professionalism,
    title: "Professionalism",
    text: "All service providers on our platform are trained and certified.",
  },
  {
    image: Innovation,
    title: "Innovation",
    text: "We use modern technology to solve real agricultural challenges.",
  },
  {
    image: Impact,
    title: "Impact",
    text: "Our work aims to strengthen communities and improve the livestock sector.",
  },
  {
    image: Quality,
    title: "Quality",
    text: "We prioritize excellence in every service delivered to farmers.",
  },
  {
    image: Sustainability,
    title: "Sustainability",
    text: "We promote practices that protect the environment and ensure long-term growth.",
  },
  {
    image: Farm_Centered,
    title: "Farm-Centered",
    text: "Our solutions are designed with farmers’ needs at the core.",
  },
  {
    image: Digital_Inclusion,
    title: "Digital Inclusion",
    text: "We ensure even farmers with basic phones can access our services.",
  },
  {
    image: Accountability,
    title: "Accountability",
    text: "We uphold transparency and responsibility in all our operations.",
  },
];

const Mission_Vision_Value = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background image */}
      <img
        src={Texture}
        alt="texture"
        className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
      />

      {/* Mission & Vision */}
      <div className="relative z-10 my-10 md:mx-20 mx-4 flex flex-col gap-4 p-4 md:p-6 rounded-xl ">
        <h2 className="font-bold text-4xl text-center">Mission & Vision</h2>
        <p className="text-gray-800 md:text-xl">
          <span className="font-bold">Our Mission</span> is to empower farmers
          with quick and dependable access to animal health and breeding
          services by leveraging digital tools, skilled professionals, and smart
          agricultural systems.
        </p>
        <p className="text-gray-800 md:text-xl">
          <span className="font-bold">Our Vision</span> is to build Ethiopia’s
          leading digital livestock service ecosystem—one that increases
          productivity, supports sustainable farming, and improves the
          livelihoods of millions of farmers across the country.
        </p>
      </div>

      {/* Values Carousel */}
      <div className="relative z-10 my-10 md:mx-20 mx-4">
        <h2 className="text-4xl font-bold text-center mb-6">Our Values</h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 }, // mobile
            768: { slidesPerView: 3, spaceBetween: 20 }, // tablet
            1024: { slidesPerView: 5, spaceBetween: 20 }, // desktop
          }}
        >
          {values.map((val, index) => (
            <SwiperSlide key={index}>
              <div className="border border-green-700 rounded-2xl p-6 flex flex-col gap-4 justify-center items-center text-center bg-white/80 shadow-md">
                <img
                  src={val.image}
                  alt={val.title}
                  className="rounded-full w-24 h-24 object-contain"
                />
                <h3 className="font-bold text-2xl text-green-700">
                  {val.title}
                </h3>
                <p className="text-gray-700">{val.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Mission_Vision_Value;