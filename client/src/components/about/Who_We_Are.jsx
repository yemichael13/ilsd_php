import React, { useState } from "react";
import On_Work from "../../assets/images/on-work3.png";

const Who_We_Are = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="px-6 py-30">
      <h1 className="text-5xl font-bold text-center mb-4">Who We Are</h1>
      <p className="text-lg text-gray-700">
        ILSD is a digital livestock service delivery platform connecting farmers
        with certified AI technicians, veterinarians, and livestock experts
        across North Shewa.{" "}
        <span
          onClick={() => setShowMore(!showMore)}
          className="text-green-700 font-semibold cursor-pointer hover:underline"
        >
          {showMore ? "show less" : "read more"}
        </span>
      </p>

      {/* Smooth fade for second paragraph */}
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          showMore ? "opacity-100 mt-4" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <p className="text-lg text-gray-700">
          We are a digital AgTech startup dedicated to transforming livestock
          management through technology. Our platform connects farmers with
          certified animal health and breeding professionals, providing fast,
          reliable, and affordable services.
        </p>
      </div>

      {/* Image with text overlay on right side */}
      <div className="relative mt-10 rounded-2xl overflow-hidden">
        <img
          src={On_Work}
          alt="on_work"
          className="w-full md:h-auto h-[400px] object-cover rounded-2xl"
        />
        <div className="absolute inset-y-0 right-0 md:w-1/2 bg-black/40 text-white flex items-center p-6 transition-opacity duration-700 ease-in-out">
          <p className="text-lg leading-relaxed">
            We focus on bridging the gap between rural communities and
            experienced veterinarians using mobile, web, and call-center-based
            solutions. Starting in the Addis Ababa–Debrebirhan corridor, our
            goal is to make essential livestock services easily accessible to
            every farmer, anytime they need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Who_We_Are;