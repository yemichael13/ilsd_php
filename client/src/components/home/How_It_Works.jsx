import React from "react";
import Rural from "../../assets/images/rural.png";
import Woman from "../../assets/images/woman.png";
import Youth from "../../assets/images/youth2.png";
import Phone from "../../assets/images/bt-phone.png";
import GreenEffect4 from "../../assets/images/green-effect4.jpg";

const How_It_Works = () => {
  return (
    <div className="relative py-12 px-6 overflow-hidden">
      {/* Background Image */}
      <img
        src={GreenEffect4}
        alt="Green Effect"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto text-gray-800">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 text-center bg-white/80 py-4 rounded-2xl ">
          {[
            "Farmer Requests Service",
            "Nearest Professional Assigned",
            "Service Delivered",
            "Payment & Feedback",
          ].map((step, index) => (
            <div
              key={index}
              className=""
            >
              <div className="text-4xl font-bold text-green-600 mb-2">
                {index + 1}
              </div>
              <p className="text-lg font-medium">{step}</p>
            </div>
          ))}
        </div>

        {/* Inclusion Focus */}
        <h3 className="text-4xl font-semibold text-center mb-6">
          Inclusion Focus
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Rural", image: Rural },
            { label: "Women", image: Woman },
            { label: "Youth", image: Youth },
            { label: "Basic Phone Support", image: Phone },
          ].map((item, index) => (
            <div
              key={index}
              className="mt-4 text-xl"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 object-contain"
              />
              <p className="text-md font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default How_It_Works;