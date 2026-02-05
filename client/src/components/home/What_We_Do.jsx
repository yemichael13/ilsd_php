import React from "react";
import AI from "../../assets/images/artificial_ins.avif";
import Advisory from "../../assets/images/advisory_nutrition.webp";
import Digital from "../../assets/images/digital.jpg";
import Vet_Services from "../../assets/images/vet_services.jpg";

const services = [
  {
    title: "Digital Livestock Management",
    image: Digital,
    description: "Streamlining farm operations with smart digital tools.",
  },
  {
    title: "Artificial Insemination",
    image: AI,
    description: "Improving genetics and productivity through AI techniques.",
  },
  {
    title: "Veterinary Services",
    image: Vet_Services,
    description: "Comprehensive animal health care and disease prevention.",
  },
  {
    title: "Advisory & Nutrition",
    image: Advisory,
    description: "Expert guidance on feeding, care, and farm efficiency.",
  },
];

const What_We_Do = () => {
  return (
    <div className="py-12 px-6 bg-gray-50">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">What We Do</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-t-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default What_We_Do;