import { LiaCubeSolid } from "react-icons/lia";
import { RiFileList3Line } from "react-icons/ri";

function Aboutus() {
  return (
    <div id="about" className="flex md:flex-row flex-col md:p-20 p-6 md:items-center items-start">
      <img
        src="about-img.svg"
        alt="Hero Image"
        className="h-[500px] w-[500px] "
      />

      <div className="pl-0 md:pl-16">
        <h1 className="text-4xl font-semibold mb-4">
          What is Codeshack Summer of Code ?
        </h1>
        <p className="text-lg text-justify">
          CodeShack Summer of Code is an impactful program organized by
          CodeShack, the technical community of Sir M. Visvesvaraya Institute of
          Technology, Bengaluru. It consists of two phases: a mentorship program
          and a hackathon. During the mentorship phase, participants are paired
          with experienced mentors who guide them across various tech domains
          like Web Development, App Development, DSA and UI/UX Designing . In
          the hackathon, teams collaborate to create innovative projects. This
          program fuels personal growth, fosters innovation, and empowers
          aspiring developers.
        </p>

        <div className="flex md:flex-row flex-col mt-4 gap-6">
          <div className="gap-y-3">
            <RiFileList3Line className="text-5xl text-orange-400" />
            <h1 className="text-2xl font-semibold text-semidark">
              Mentorship Phase
            </h1>
            <p>
              {" "}
              <span className="font-bold">Phase 1:</span> Knowledge Acquisition
              and Conceptual Development
            </p>
          </div>
          <div className="gap-y-3">
            <LiaCubeSolid className="text-6xl md:text-5xl text-orange-400 " />
            <h1 className="text-2xl font-semibold text-semidark">Hackathon</h1>
            <p>
              {" "}
              <span className="font-bold">Phase 2:</span> KProject Creation and
              Network Building
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
