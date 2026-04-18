import { IoIosGlobe } from "react-icons/io";
import { FaLaptopCode } from "react-icons/fa";
import { TbDeviceMobileCode } from "react-icons/tb";

const cardData = [
  {
    icon: <IoIosGlobe className=" text-neon text-5xl mb-2" />,
    title: "WEB DEVELOPMENT",
    description:
      "Web development is the art of crafting functional and engaging online experiences that bring ideas to life on the world wide web.",
  },
  {
    icon: <TbDeviceMobileCode className=" text-neon text-5xl mb-2" />,
    title: "APP DEVELOPMENT",
    description:
      "Transform your vision into a reality with the creation of immersive and user-friendly mobile applications that revolutionize the way we live and interact.",
  },
  {
    icon: <FaLaptopCode className=" text-neon text-5xl mb-2" />,
    title: "DSA",
    description:
      "Master algorithms and data structures to conquer challenges with precision and confidence.",
  },
];

function Programs() {
  return (
    <section>
      <div className="min-h-[90vh] p-10 bg-zinc-900 flex flex-col text-center items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl font-bold text-white ">
            OUR PROGRAMS
          </h1>
          <p className="text-2xl mt-3 mb-6 text-zinc-300 text-center">
            Explore The Diverse Range Of Domains We Offer!
          </p>
        </div>
        {/* cards */}
        <div className="mt-10 flex md:flex-row flex-col justify-center items-center gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="block bg-black max-w-sm p-6 border-2 rounded-lg shadow-xl text-center h-[21rem] w-60 transform transition duration-300 hover:-translate-y-2 hover:shadow-neon/20"
            >
              <div className="flex justify-center">{card.icon}</div>
              <h5 className="mb-6 text-xl font-bold tracking-tight text-white">
                {card.title}
              </h5>
              <p className="font-normal text-white">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;
