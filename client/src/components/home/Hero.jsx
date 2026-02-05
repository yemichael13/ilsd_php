import React, { useState, useEffect } from "react";
import Hero_Pic from "../../assets/images/help_1.png";
import Livestock from "../../assets/images/livesock.jpg";
import Livestock2 from "../../assets/images/livestock2.png";
import Livestock3 from "../../assets/images/livestock3.jpg";
import Livestock4 from "../../assets/images/livestock4.png";
import SplitText from "../animations/SplitText";
import ShinyText from "../animations/ShinyText";

const images = [Hero_Pic, Livestock, Livestock2, Livestock3, Livestock4];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change background every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section id="hero" className="relative h-screen overflow-hidden">
        {/* Background slideshow */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Overlay tint */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content layer */}

        <div className="hero-content relative z-10 flex flex-col w-full md:w-2/3 h-full justify-center items-center md:items-start pt-20 px-4 md:px-10">
          
        <SplitText
            text="Integrated Livestock Service Delivery"
            className="text-7xl font-extrabold text-white pb-4" 
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="start"
            showCallback
          />
          <ShinyText
            text="Connecting Farmers to Quality Livestock Services- Anytime, Anywhere!"
            speed={2}
            delay={0}
            className="text-2xl"
            color="#16a303"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
          
          <p className="text-white font-medium pt-6">ILSD is a digital livestock service delivery platform connecting farmers with certified AI technicians, veterinarians, and livestock experts across North Shewa.</p>
          <div className="flex md:flex-row flex-col gap-5 md:gap-10 py-10">
            <button className="bg-green-700 border border-green-700 font-semibold text-lg hover:bg-white hover:text-green-700 text-white px-4 py-2 rounded-sm transition-colors duration-300 shadow cursor-pointer">
              Learn More
            </button>
            <button className="bg-white border border-green-700 font-semibold text-lg hover:bg-green-700 hover:text-white text-green-700 px-4 py-2 rounded-sm transition-colors duration-300 shadow cursor-pointer">
              View Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;