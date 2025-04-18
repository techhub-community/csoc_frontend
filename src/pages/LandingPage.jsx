import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Aboutus from "../components/Aboutus";
import Timeline from "../components/Timeline";
import Programs from "../components/Programs";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Team from "../components/Team";
import Resources from "../components/Resources";
import Gallery from "../components/Gallery";

export default function LandingPage() {
  useEffect(() => {
    const scrollId = window.location.hash.substring(1);
    const scrollEl = document.getElementById(scrollId);

    if (scrollEl) {
      scrollEl.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <NavBar />
      <Hero />
      <Aboutus />
      <Timeline />
      <Programs />
      <Resources />
      <Testimonial />
      <Gallery />
      <Team />
      <FAQ />
      <ContactUs />
      <Footer />
    </>
  );
}
