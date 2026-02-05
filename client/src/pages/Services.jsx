import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import What_We_Provide from "../components/services/What_We_Provide";
import How_It_Works from "../components/services/How_It_Works";
import Quality from "../components/services/Quality_Assurance";
import PageMotion from "../components/motion/PageMotion";
import Reveal from "../components/motion/Reveal";

const Services = () => {
    return (
      <div>
        <Navbar />
        <PageMotion>
            
            <section id="what_we_provide">
                <Reveal>
                  <What_We_Provide />
                </Reveal>
            </section>
            <section id="how_it_works">
                <Reveal>
                  <How_It_Works />
                </Reveal>
            </section>
            <section id="quality_assuarance">
                <Reveal>
                  <Quality />
                </Reveal>
            </section>
            <Footer />
        </PageMotion>
      </div>
        
    )
}

export default Services;