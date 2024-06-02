import AuthPage from "./AuthPage";
import Aboutus from "./components/Aboutus";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Programs from "./components/Programs";
import Testimonial from "./components/Testimonial";
import Timeline from "./components/Timeline";

function App() {
  return (
    <>
      <NavBar />
      <main>
        {/* <Hero />
        <Aboutus />
        <Timeline />
        <Programs />
        <Testimonial />
        <FAQ />
        <ContactUs /> */}
        <AuthPage />
      </main>
      <Footer />
    </>
  );
}

export default App;
