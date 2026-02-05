import React from "react";
import Goat from "../../assets/images/goat.jpg";
import CountUp from "../animations/CountUp";
import Reveal from "../motion/Reveal";

const Impact = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image */}
      <img
        src={Goat}
        alt="Goat"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-start h-full">
        {/* Heading */}
        <div className="bg-white rounded-br-4xl px-4 md:px-10 py-8 w-full md:w-2/5 mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-green-700">Impact Numbers</h3>
        </div>

        {/* Description Box */}
        <Reveal>
        <div className="bg-white rounded-xl px-4 md:px-10 py-6 w-[90%] max-w-full md:w-2/5 mt-30 md:mt-6 md:ml-20 mx-auto md:mx-0 shadow-md">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
           
            <CountUp
              from={0}
              to={20000}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text text-green-700"
              startCounting
            />
            <span className="text-green-700">+</span> Farmers Targeted <br />
            North Shewa Coverage <br />
            Certified Professionals <br />
            Scalable National Model
          </p>
        </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Impact;