import React from "react";
import Sheep_Cow from "../../assets/images/sheep_cow.png";
import Texture from "../../assets/images/green-effect.png";
import Checklist from "../../assets/images/checklist.png";
import { FaCheck } from "react-icons/fa";

const Quality = () => {
  return (
    <div className="pt-10 ">
      <h2 className="text-4xl font-bold text-center mb-10">Quality Assurance</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Animals */}
        <div className="md:w-1/2 w-full flex">
          <img
            src={Sheep_Cow}
            alt="sheep_cow"
            className="w-full h-auto object-contain max-w-md"
          />
        </div>

        {/* Right: Checklist over texture */}
        <div className="relative md:w-2/3 w-full flex justify-center items-center">
          {/* Background texture */}
          <img
            src={Texture}
            alt="texture"
            className="absolute inset-0 w-full h-full object-cover opacity-80 z-0 rounded-2xl"
          />

          {/* Checklist image */}
          <img
            src={Checklist}
            alt="checklist"
            className="relative z-10 w-3/4 object-contain"
          />

          {/* Checklist items overlay */}
          <div className="absolute z-20 top-1/4 left-1/2 md:-translate-x-1/5 -translate-x-1/3 flex flex-col gap-4 text-green-900 font-semibold text-sm md:text-base w-3/4 px-4">
            <p className="flex items-center gap-2">
              <FaCheck className="text-green-700" /> Certified Professionals
            </p>
            <p className="flex items-center gap-2">
              <FaCheck className="text-green-700" /> Cold-Chain Management
            </p>
            <p className="flex items-center gap-2">
              <FaCheck className="text-green-700" /> Standard Protocols
            </p>
            <p className="flex items-center gap-2">
              <FaCheck className="text-green-700" /> Monitoring & Feedback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quality;