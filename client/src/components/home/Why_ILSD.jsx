import React from "react";
import Cow from "../../assets/images/cow.png";

const Why_ILSD = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-green-100 rounded-xl shadow-md">
      {/* Left: Cow Image */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
        <img
          src={Cow}
          alt="Cow"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right: Benefits List */}
      <div className="w-full lg:w-1/2 lg:pl-10 px-4 lg:ml-10">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Why ILSD?</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            Faster access to certified professionals
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            Quality-assured services
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            Reduced delays & travel cost
          </li>
          <li className="flex items-start">
            <span className="text-green-600 font-bold mr-2">✓</span>
            Digital traceability
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Why_ILSD;