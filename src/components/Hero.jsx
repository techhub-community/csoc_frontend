function Hero() {
  return (
    <div id="hero" className="bg-warm max-h-screen md:mt-0 md:h-screen md:p-20 p-6 d:pt-20 pt-0 flex md:flex-row flex-col-reverse md:items-center items-start">
      <div className="md:p-4 pb-12">
        <h1 className="font-bold md:text-5xl text-4xl text-lightblack ">
          CodeShack Summer of Code 2024
        </h1>
        <p className=" md:text-xl text-lg mt-4 text-lightbrown">
          Unlock your coding potential at CodeShack Summer of Code: Igniting
          Brilliance, Fueling Innovation
        </p>
      </div>

      <div className="md:pl-10 pl-0 mt-14 ">
        <img
          src="/hero-img.svg"
          alt="Hero Image"
          className="h-[400px] w-[800px] animate-bounce-slow-low"
        />
      </div>
    </div>
  );
}

export default Hero;
