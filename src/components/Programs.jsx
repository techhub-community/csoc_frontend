import { IoIosGlobe } from "react-icons/io";
import { TbDeviceMobileCode } from "react-icons/tb";
import { FaLaptopCode } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdDesignServices } from "react-icons/md";

const cardData = [
  {
    icon: <IoIosGlobe className=" text-orange-600 text-5xl mb-2" />,
    title: "WEB DEVELOPMENT",
    description:
      "Web development is the art of crafting functional and engaging online experiences that bring ideas to life on the world wide web.",
  },
  {
    icon: <TbDeviceMobileCode className=" text-orange-600 text-5xl mb-2" />,
    title: "APP DEVELOPMENT",
    description:
      "Transform your vision into a reality with the creation of immersive and user-friendly mobile applications that revolutionize the way we live and interact.",
  },
  {
    icon: <FaLaptopCode className=" text-orange-600 text-5xl mb-2" />,
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
    <div id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          CHOOSE YOUR DOMAIN
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          The CSOC mentorship program is spanned across 5 domains.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {card.icon}
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="mt-4 text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;