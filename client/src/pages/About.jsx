import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Who_We_Are from "../components/about/Who_We_Are";
import Mission_Vision_Value from "../components/about/Mission_Vision_Value";
import Service_Area from "../components/about/Service_Area";
import Our_Team from "../components/about/Our_Team";
import PageMotion from "../components/motion/PageMotion";
import Reveal from "../components/motion/Reveal";

const About = () => {
    return (
      <div>
        <Navbar />
          <PageMotion>
            
            <section id="who_we_are">
                <Reveal>
                  <Who_We_Are />
                </Reveal>
            </section>
            <section id="mission">
                <Reveal>
                  <Mission_Vision_Value />
                </Reveal>
            </section>
            <section id="service-area">
                <Reveal>
                  <Service_Area />
                </Reveal>
            </section>
            <section id="our-team">
                <Reveal>
                  <Our_Team />
                </Reveal>
            </section>
            <Footer />
        </PageMotion>
      </div>
        
    )
}

export default About;