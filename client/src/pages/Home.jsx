import React from "react";
import Hero from "../components/home/Hero";
import What_We_Do from "../components/home/What_We_Do"
import Why_ILSD from "../components/home/Why_ILSD";
import How_It_Works from "../components/home/How_It_Works";
import Impact from "../components/home/Impact";
import Latest_News from "../components/home/Latest_News";
import Contact from "../components/home/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageMotion from "../components/motion/PageMotion";
import Reveal from "../components/motion/Reveal";


const Home = () => {
    return (
      <div>
        <Navbar />
        <PageMotion>
            
            <section id="hero">
                <Reveal>
                  <Hero />
                </Reveal>
            </section>
            <section id="what_we_do">
                <Reveal>
                  <What_We_Do />
                </Reveal>
            </section>
            <section id="why_ilsd">
                <Reveal>
                  <Why_ILSD />
                </Reveal>
            </section>
            <section id="how_it_works">
                <Reveal>
                  <How_It_Works />
                </Reveal>
            </section>
            <section id="impact">
                <Reveal>
                  <Impact />
                </Reveal>
            </section>
            <section id="lates_news">
                <Reveal>
                  <Latest_News />
                </Reveal>
            </section>
            <section id="contact">
                <Reveal>
                  <Contact />
                </Reveal>
            </section>
            
            <Footer />
            
        </PageMotion>
      </div>
        
    )
}

export default Home;