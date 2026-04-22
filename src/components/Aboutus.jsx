import { LiaCubeSolid } from "react-icons/lia";
import { RiFileList3Line } from "react-icons/ri";

function Aboutus() {
  return (
    <div id="about" className="bg-black flex flex-wrap md:flex-row gap-8 flex-col md:p-20 p-6 md:items-center items-center justify-center">
      <img
        src="about-img.svg"
        alt="Hero Image"
        className="md:w-[45%]"
      />
      <div className="pl-0 md:pl-2 md:max-w-[45%] md:min-w-[500px]">
        <h1 className="text-4xl font-semibold mb-4 text-white">
          What is CodeShack Summer of Code ?
        </h1>
        <p className="text-lg text-balance text-zinc-400">
          CodeShack Summer of Code is an impactful program organized by CodeShack, the parent community of TechHub and Glug MVIT, the technical communities of Sir M. Visvesvaraya Institute of Technology, Bengaluru.
          The program consists of two phases: a mentorship program and a hackathon.
          During the mentorship phase, participants are paired with experienced mentors who guide them across various tech domains, such as Web Development, App Development, and DSA.
          In the hackathon, teams collaborate to create innovative projects.
          This program fuels personal growth, fosters innovation, and empowers aspiring developers.
        </p>

        <div className="flex md:flex-row flex-col mt-8 gap-12">
          <div className="gap-y-3">
            <RiFileList3Line className="text-5xl text-neon mb-2" />
            <h1 className="text-2xl font-semibold text-neon">
              Mentorship Phase
            </h1>
            <p className="text-zinc-400 mt-2">
              {" "}
              <span className="font-bold text-white">Phase 1:</span> Knowledge Acquisition
              and Conceptual Development
            </p>
          </div>
          <div className="gap-y-3">
            <LiaCubeSolid className="text-6xl md:text-5xl text-neon mb-2" />
            <h1 className="text-2xl font-semibold text-neon">Hackathon</h1>
            <p className="text-zinc-400 mt-2">
              {" "}
              <span className="font-bold text-white">Phase 2:</span> Project Creation and
              Network Building
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
