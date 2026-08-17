import React, { useState, useEffect } from "react";
import Livestock from "../../assets/images/livesock.jpg";
import Livestock2 from "../../assets/images/livestock2.png";
import Livestock3 from "../../assets/images/livestock3.jpg";
import Livestock4 from "../../assets/images/livestock4.png";
import SplitText from "../animations/SplitText";
import ShinyText from "../animations/ShinyText";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Reveal from "../../components/motion/Reveal";
import PageMotion from "../../components/motion/PageMotion";

const images = [Livestock, Livestock2, Livestock3, Livestock4];

const Hero = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section id="hero" className="relative h-screen overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        <div className="absolute inset-0 bg-black/35"></div>

        <div className="hero-content relative z-10 flex flex-col w-full md:w-2/3 h-full justify-center items-center md:items-start pt-24 px-4 md:px-10">
          <PageMotion>
            <Reveal>
              <SplitText
                text={t('home.hero.title')}
                className="md:text-6xl text-4xl font-extrabold text-white pb-4 leading-tight"
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
                text={t('home.hero.subtitle')}
                speed={2}
                delay={0}
                className="md:text-2xl text-xl"
                color="#C9A24D"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
              />

            

              <div className="flex flex-wrap gap-3 py-6 text-sm font-semibold text-white">
                <span className="bg-white/15 border border-white/40 px-3 py-2 rounded-full backdrop-blur-sm">{t('home.hero.serviceTags.vet')}</span>
                <span className="bg-white/15 border border-white/40 px-3 py-2 rounded-full backdrop-blur-sm">{t('home.hero.serviceTags.ai')}</span>
                <span className="bg-white/15 border border-white/40 px-3 py-2 rounded-full backdrop-blur-sm">{t('home.hero.serviceTags.consultation')}</span>
              </div>

              <div className="flex md:flex-row flex-col gap-5 md:gap-10 py-6">
                <Link to="/services" className="bg-green-700 border border-green-700 font-semibold text-lg hover:bg-white hover:text-green-700 text-white px-5 py-3 rounded-sm transition-colors duration-300 shadow cursor-pointer text-center">
                  {t('home.hero.buttons.ourServices')}
                </Link>
                <Link to="/contact" className="bg-white border border-green-700 font-semibold text-lg hover:bg-green-700 hover:text-white text-green-700 px-5 py-3 rounded-sm transition-colors duration-300 shadow cursor-pointer text-center">
                  {t('home.hero.buttons.contactUs')}
                </Link>
              </div>
            </Reveal>
          </PageMotion>
        </div>
      </section>
    </div>
  );
};

export default Hero;