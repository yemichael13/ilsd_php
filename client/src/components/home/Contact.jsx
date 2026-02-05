import React from "react";
import Call from "../../assets/images/call.png";
import Mail from "../../assets/images/email.webp";
import Location from "../../assets/images/location.png";

const Contact = () => {
  return (
    <div className="py-12 px-6 bg-white text-center">
      <h1 className="md:text-8xl text-5xl font-bold text-gray-800 mb-10">Get In Touch</h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-30">
        {/* Phone */}
        <div className="flex items-center gap-4">
          <img src={Call} alt="Phone" className="w-8 h-8 object-contain" />
          <span className="text-lg font-medium text-gray-700">251-XXX-XXX-XXX</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <img src={Mail} alt="Email" className="w-8 h-8 object-contain" />
          <span className="text-lg font-medium text-gray-700">info@livestock.org</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <img src={Location} alt="Location" className="w-8 h-8 object-contain" />
          <span className="text-lg font-medium text-gray-700">123, street, Addis Ababa</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;