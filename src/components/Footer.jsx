import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer>
      <div className="bg-warm text-black py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          <div className="company-name w-fit text-center">
            <h2 className="text-3xl font-bold text-black mb-2">
              {"<CodeShack>"}
            </h2>
            <p className="text-orange-800">
              <a href="mailto:codeshackcommunity@gmail.com">
                codeshackcommunity@gmail.com
              </a>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="useful-links w-fit">
              <h2 className="text-xl font-bold mb-2">Useful Links</h2>
              <ul className="">
                <li className="mb-1">
                  <a href="#home" className="hover:text-orange-400">
                    <b className="text-orange-500">{"> "}</b>Home
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#about" className="hover:text-orange-400">
                    <b className="text-orange-500">{"> "}</b>About Us
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#services" className="hover:text-orange-400">
                    <b className="text-orange-500">{"> "}</b>Services
                  </a>
                </li>
                <li className="mb-1">
                  <a href="#contact" className="hover:text-orange-400">
                    <b className="text-orange-500">{"> "}</b>Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="social-networks w-fit flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-2">Our Social Networks</h2>
            <ul>
              <li className="mb-1">
                <a
                  href="#twitter"
                  className="hover:text-orange-400 flex items-center gap-1"
                >
                  <FaTwitter /> Twitter
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="#instagram"
                  className="hover:text-orange-400 flex items-center gap-1"
                >
                  <RiInstagramFill /> Instagram
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="#linkedin"
                  className="hover:text-orange-400 flex items-center gap-1"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li className="mb-1">
                <a
                  href="#linkedin"
                  className="hover:text-orange-400 flex items-center gap-1"
                >
                  <FaGithub /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-6">
        <p className="p-6 ml-6">© Copyright CodeShack . All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
