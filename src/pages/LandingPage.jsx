import React from 'react';
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Aboutus from "../components/Aboutus";
import Timeline from "../components/Timeline";
import Programs from "../components/Programs";
import Testimonial from "../components/Testimonial";
import FAQ from "../components/FAQ";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (  
    <>
      <NavBar />
      <Hero />
      <Aboutus />
      <Timeline />
      <Programs />
      <Testimonial />
      <FAQ />
      <ContactUs />
      <Footer />
    </>
  )
}
