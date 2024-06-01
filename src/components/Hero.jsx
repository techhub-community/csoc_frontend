function Hero() {
  return (
    <div className="bg-warm h-screen p-20 pt-20 flex md:flex-row flex-col items-center">
      <div className="p-4">
        <h1 className="font-bold text-5xl text-lightblack ">
          CodeShack Summer of Code 2024
          
        </h1>
        <p className=" text-xl mt-4 text-lightbrown">
          Unlock your coding potential at CodeShack Summer of Code: Igniting
          Brilliance, Fueling Innovation
        </p>
      </div>

      <div className="pl-10">
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
