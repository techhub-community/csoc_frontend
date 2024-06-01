import Aboutus from "./components/Aboutus"
import ContactUs from "./components/ContactUs"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import NavBar from "./components/NavBar"
import Testimonial from "./components/Testimonial"
import Timeline from "./components/Timeline"

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Aboutus/>
        <Timeline />
        <Testimonial />
        <FAQ />
        <ContactUs />
      </main>
      <Footer />
    </>
  )
}

export default App
