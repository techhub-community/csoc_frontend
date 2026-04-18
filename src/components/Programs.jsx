import { IoIosGlobe } from "react-icons/io";
import { TbDeviceMobileCode } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";

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
  {
    icon: <GiArtificialIntelligence className=" text-orange-600 text-5xl mb-2" />,
    title: "AI / ML",
    description:
      "Leverage artificial intelligence and machine learning to build intelligent systems that learn, adapt, and solve real-world problems.",
  },
  {
    icon: <MdDesignServices className=" text-orange-600 text-5xl mb-2" />,
    title: "UI / UX",
    description:
      "Design intuitive and visually appealing user interfaces and experiences that enhance usability and create meaningful interactions.",
  },
];

const Programs = () => {
  return (
    <section id="programs" className="min-h-[90vh] py-20 bg-zinc-900">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            OUR PROGRAMS
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-zinc-300">
            Explore The Diverse Range Of Domains We Offer!
          </p>
          <p className="mt-4 text-lg text-zinc-400">
            The CSOC mentorship program is spanned across 5 domains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-black p-8 border border-zinc-800 rounded-2xl shadow-xl text-center h-[22rem] w-full max-w-sm transform transition duration-300 hover:-translate-y-2 hover:shadow-neon/20 flex flex-col items-center justify-center"
            >
              <div className="flex justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="mb-4 text-2xl font-bold tracking-tight text-white uppercase">
                {card.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed font-medium">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Programs;