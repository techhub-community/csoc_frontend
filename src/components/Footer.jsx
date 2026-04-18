import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import useSmoothScroll from "../hooks/useSmoothScroll";

const Footer = () => {
  const scroll = useSmoothScroll();

  return (
    <footer>
      <div className="bg-black text-white py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
          <div className="company-name w-fit text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {"<CODESHACK>"}
            </h2>
            <p className="text-neon">
              <a href="mailto:codeshackcommunity@gmail.com">
                codeshackcommunity@gmail.com
              </a>
            </p>
          </div>
          <div>
            <div className="useful-links w-fit">
              <h2 className="text-xl font-bold mb-2">Useful Links</h2>
              <ul>
                <li className="mb-1">
                  <a onClick={() => scroll("/", "hero")} className="cursor-pointer hover:text-neon">
                    <b className="text-neon">{"> "}</b>Home
                  </a>
                </li>
                <li className="mb-1">
                  <a onClick={() => scroll("/", "about")} className="cursor-pointer hover:text-neon">
                    <b className="text-neon">{"> "}</b>About Us
                  </a>
                </li>
                <li className="mb-1">
                  <a onClick={() => scroll("/", "timeline")} className="cursor-pointer hover:text-neon">
                    <b className="text-neon">{"> "}</b>Timeline
                  </a>
                </li>
                <li className="mb-1">
                  <a onClick={() => scroll("/", "faq")} className="cursor-pointer hover:text-neon">
                    <b className="text-neon">{"> "}</b>FAQ
                  </a>
                </li>
                <li className="mb-1">
                  <a onClick={() => scroll("/", "contact")} className="cursor-pointer hover:text-neon">
                    <b className="text-neon">{"> "}</b>Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="social-networks w-fit flex flex-col md:items-start">
            <h2 className="text-xl font-bold mb-2 mx-auto">Our Social Networks</h2>
            <div className="flex gap-5 mt-1">
              <ul>
                <a target="_blank" href="https://techhub.org.in">
                  <img className="mx-auto" src="/techhub.png" alt="TechHub Logo" width={60} />
                </a>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://x.com/_techhub"
                    className="hover:text-neon flex items-center gap-1"
                  >
                    <FaTwitter /> Twitter
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://www.instagram.com/techhub_community/"
                    className="hover:text-neon flex items-center gap-1"
                  >
                    <RiInstagramFill /> Instagram
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://www.linkedin.com/company/techhub-community/"
                    className="hover:text-neon flex items-center gap-1"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://github.com/techhub-community"
                    className="hover:text-neon flex items-center gap-1"
                  >
                    <FaGithub /> GitHub
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://discord.com/invite/yZt7uuqA"
                    className="hover:text-neon flex items-center gap-1"
                  >
                    <FaDiscord /> Discord
                  </a>
                </li>
              </ul>
              <ul>
                <a target="_blank" href="https://www.glugmvit.com/">
                  <img className="mx-auto" src="/glug.png" alt="Glug Logo" width={60} />
                </a>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://x.com/glugmvit"
                    className="hover:text-neon flex items-center gap-1 flex-row-reverse"
                  >
                    <FaTwitter /> Twitter
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://www.instagram.com/glugmvit"
                    className="hover:text-neon flex items-center gap-1 flex-row-reverse"
                  >
                    <RiInstagramFill /> Instagram
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://in.linkedin.com/company/glugmvit"
                    className="hover:text-neon flex items-center gap-1 flex-row-reverse"
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://github.com/glugmvit"
                    className="hover:text-neon flex items-center gap-1 flex-row-reverse"
                  >
                    <FaGithub /> GitHub
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    target="_blank" href="https://discord.com/invite/ugh3bhGd"
                    className="hover:text-neon flex items-center gap-1 flex-row-reverse"
                  >
                    <FaDiscord /> Discord
                  </a>
                </li>
              </ul>
            </div>
            <a
              target="_blank" href="https://linktr.ee/CodeShack"
              className="hover:text-neon border-b-2 border-neon rounded flex items-center font-bold gap-1 mx-auto w-fit mt-3"
            >
              <SiLinktree /> CodeShack LinkTree
            </a>
          </div>
        </div>
      </div>
      <div className="h-6">
        <p className="p-6 ml-6">© Copyright CodeShack. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
