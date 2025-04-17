import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaYoutube } from "react-icons/fa";

const resourcesData = {
  webDev: [
    {
      week: 1,
      title: "HTML, CSS & GitHub Pages",
      project: "Portfolio Website",
      topics: [
        "HTML Basics (Tags, Forms, Semantic Elements)",
        "CSS Basics (Selectors, Box Model, Flexbox, Grid)",
        "Responsive Design (Media Queries)",
        "Hosting with GitHub Pages",
      ],
      task: "Create a simple portfolio website with an 'About Me' section, projects, and contact info.",
      links: [
        { name: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", youtube: "https://youtu.be/qz0aGYrrlhU" },
        { name: "CSS Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", youtube: "https://www.youtube.com/watch?v=3_9znKVNe5g" },
        { name: "HTML Cheat Sheet", url: "https://www.geeksforgeeks.org/html-cheat-sheet", youtube: "https://youtu.be/HD13eq_Pmp8" },
        { name: "CSS Basics (MDN)", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics", youtube: "https://www.youtube.com/watch?v=EUtlj7xdO1o" },
      ],
    },{
      week: 2,
      title: "Frontend Framework (React.js)",
      project: "Weather App",
      topics: [
        "Introduction to React (Components, Props, State)",
        "Fetching API Data (Using fetch() or axios)",
        "JSX & Conditional Rendering",
      ],
      task: "Build a Weather App that fetches weather data based on user input (city name) using a weather API.",
      links: [
        { name: "React Official Docs", url: "https://react.dev/", youtube: "https://youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&si=AM4Zg0nawQQArNCd" },
        { name: "OpenWeather API", url: "https://openweathermap.org/api", youtube: "https://www.youtube.com/watch?v=MdIfZJ08g2I" },
        { name: "Axios Guide", url: "https://axios-http.com/docs/intro", youtube: "https://www.youtube.com/watch?v=fYTTUBa-lPc" },
      ],
    },
    {
      week: 3,
      title: "JavaScript & DOM Manipulation",
      project: "To-Do List App",
      topics: [
        "JavaScript Basics (Variables, Functions, Loops)",
        "DOM Manipulation (Event Listeners, getElementById, querySelector)",
        "Local Storage (Saving Data in Browser)",
      ],
      task: "Build a To-Do list where users can add, delete, and mark tasks as completed.",
      links: [
        { name: "JavaScript Tutorial (W3Schools)", url: "https://www.w3schools.com/js/js_intro.asp", youtube: "https://youtu.be/PkZNo7MFNFg?si=CMUH2pctHH3q8ztS" },
        { name: "DOM Manipulation Guide", url: "https://www.w3schools.com/js/js_htmldom.asp", youtube: "https://www.youtube.com/watch?v=5fb2aPlgoys" },
        { name: "Local Storage Tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage", youtube: "https://www.youtube.com/watch?v=Av6HTmH3FUc" },
        { name: "Advanced JS Concepts", url: "https://madasamy.medium.com/15-javascript-concepts-that-every-nodejs-programmer-must-to-know-6894f5157cb7"},
      ],
    },
    {
      week: 4,
      title: "Full-Stack Development (MERN)",
      project: "Notes App",
      topics: [
        "Node.js & Express.js (Backend Setup, REST API)",
        "MongoDB (CRUD Operations)",
        "Connecting Frontend with Backend (Axios, Fetch API)",
      ],
      task: "Create a Notes App where users can create, update, and delete notes with a simple backend.",
      links: [
        { name: "Node.js Docs", url: "https://nodejs.org/en/docs/", youtube: "https://youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&si=U_YO8RaMf3qHCQ6K" },
        { name: "Express.js Guide", url: "https://expressjs.com/", youtube: "https://www.youtube.com/watch?v=SccSCuHhOw0" },
        { name: "MongoDB Tutorial", url: "https://www.mongodb.com/docs/", youtube: "https://www.youtube.com/watch?v=ofme2o29ngU" },
        { name: "MERN Stack Tutorial", url: "https://www.mongodb.com/languages/mern-stack-tutorial", youtube: "https://www.youtube.com/watch?v=7CqJlxBYj-M" },
      ],
    },
  ],
  appDev: [
    {
      week: 1,
      title: "Flutter & Dart Basics",
      project: "Quiz App",
      topics: [
        "VS Code, Android Studio setup for Flutter",
        "Introduction to Flutter",
        "Basics of Dart Language",
        "Flutter Basics",
      ],
      task: "Build a basic quiz app.",
      links: [
        { name: "Flutter Setup Guide", url: "https://docs.flutter.dev/get-started/install", youtube: "https://www.youtube.com/watch?v=1ukSR1GRtMU" },
        { name: "Dart Language Tour", url: "https://dart.dev/guides/language/language-tour", youtube: "https://youtube.com/playlist?list=PL4cUxeGkcC9iVGY3ppchN9kIauln8IiEh&si=hntDZJaNC73px5Lq" },
        { name: "Flutter Basics Codelab", url: "https://codelabs.developers.google.com/codelabs/flutter-codelab-first", youtube: "https://www.youtube.com/watch?v=GLSG_Wh_YWc" },
      ],
    },
    {
      week: 2,
      title: "Widgets & Responsive Design",
      project: "Personal Expenses App",
      topics: [
        "Running App on Different Platforms (Android, iOS, Emulator)",
        "Widgets, Styling, Adding Logic",
        "Responsive & Adaptive User Interfaces",
      ],
      task: "Build a personal expenses app with responsive design.",
      links: [
        { name: "Flutter Widgets Catalog", url: "https://docs.flutter.dev/ui/widgets", youtube: "https://youtu.be/wE7khGHVkYY?si=NqJ3hANEMPdnG9xN" },
        { name: "Responsive Design in Flutter", url: "https://docs.flutter.dev/ui/layout/responsive", youtube: "https://youtu.be/MrPJBAOzKTQ?si=xPo2kHa5hqblOssr" },
        { name: "Flutter Layout Guide", url: "https://docs.flutter.dev/ui/layout", youtube: "https://youtu.be/RJEnTRBxaSg?si=HRYXNH8m1X-AUGOi" },
      ],
    },
    {
      week: 3,
      title: "Navigation & State Management",
      project: "Meals App, Shop App",
      topics: [
        "Widgets & Flutter Internals (Deep Dive)",
        "Navigation & Multiple Screens",
        "Working with User Input & Forms",
        "Sending HTTP Requests",
      ],
      task: "Develop a meals app and start a shop app with navigation and forms.",
      links: [
        { name: "Flutter Navigation Guide", url: "https://docs.flutter.dev/ui/navigation", youtube: "https://youtu.be/DlArCl8jvlo?si=mFzJNtg9T55OkRO2" },
        { name: "State Management in Flutter", url: "https://docs.flutter.dev/data-and-backend/state-mgmt", youtube: "https://youtu.be/3tm-R7ymwhc?si=yTRnq6sIQnePeI0S" },
        { name: "Flutter HTTP Requests", url: "https://docs.flutter.dev/cookbook/networking/fetch-data", youtube: "https://youtube.com/playlist?list=PL7zgwanvi8_OvGhdNt1pwvN2luynjiH1V&si=u7BXVZ1emTvnx-q9" },
      ],
    },
    {
      week: 4,
      title: "Authentication & Animations",
      project: "Shop App",
      topics: [
        "State Management (MVP)",
        "Adding User Authentication",
        "Adding Animations",
      ],
      task: "Enhance the shop app with authentication and animations.",
      links: [
        { name: "Firebase Authentication Docs", url: "https://firebase.google.com/docs/auth/flutter/start", youtube: "https://youtu.be/rWamixHIKmQ?si=C7eCuRl5qbdGx2Cc" },
        { name: "Flutter Animations Guide", url: "https://docs.flutter.dev/ui/animations", youtube: "https://youtube.com/playlist?list=PL4cUxeGkcC9gP1qg8yj-Jokef29VRCLt1&si=YBCV9v9H4oxd1C-F" },
      ],
    },
  ],
  dsa: [
    {
      week: 1,
      title: "C++ Basics & Complexity",
      project: "Problem Solving",
      topics: [
        "Basics of C++",
        "Standard Template Library (STL)",
        "Time and Space Complexity",
      ],
      task: "Solve 3-4 LeetCode problems on basic C++ and STL, analyze their complexity.",
      links: [
        { name: "C++ Tutorial", url: "https://www.geeksforgeeks.org/c-plus-plus/", youtube: "https://www.youtube.com/watch?v=Bn6lBj0DffE" },
        { name: "C++ STL Guide", url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/", youtube: "https://www.youtube.com/watch?v=mlseT4mj4c0" },
        { name: "Time and Space Complexity", url: "https://www.geeksforgeeks.org/time-complexity-and-space-complexity/", youtube: "https://www.youtube.com/watch?v=DEHsr4Xic9w" },
        { name: "C++ OOPS Concepts", url: "https://www.w3schools.com/cpp/cpp_oop.asp" },
      ],
    },
    {
      week: 2,
      title: "Strings, Arrays & Recursion",
      project: "Problem Solving",
      topics: [
        "Strings",
        "Recursion",
        "Arrays and Operations (Insert, Delete)",
        "Stacks and Applications (Tower of Hanoi)",
        "Queues",
      ],
      task: "Solve 3-4 LeetCode problems on strings, arrays, and stacks, implement Tower of Hanoi.",
      links: [
        { name: "Strings in C++", url: "https://www.geeksforgeeks.org/string-data-structure/", youtube: "https://youtu.be/ijIxcB9qjaU?si=zb_ay66PfPFi2oE3" },
        { name: "Recursion Tutorial", url: "https://www.geeksforgeeks.org/what-is-recursion/", youtube: "https://youtu.be/c7VjS7ZZVWM?si=yotRIh450aagTnbT" },
        { name: "Array Operations", url: "https://www.geeksforgeeks.org/array-data-structure/", youtube: "https://www.youtube.com/watch?v=Bnjbun-hiBk" },
        { name: "Stacks and Queues", url: "https://www.geeksforgeeks.org/stack-data-structure/", youtube: "https://www.youtube.com/watch?v=PPIdmeO8E-Q" },
      ],
    },
    {
      week: 3,
      title: "Linked Lists & Sorting",
      project: "Problem Solving",
      topics: [
        "Linked List and Operations",
        "Sorting (Quick, Insertion, Selection, Merge)",
        "Hash Maps and Sets",
      ],
      task: "Solve 3-4 LeetCode problems on linked lists and sorting, implement hash maps.",
      links: [
        { name: "Linked List Guide", url: "https://www.geeksforgeeks.org/data-structures/linked-list/", youtube: "https://www.youtube.com/watch?v=o5wJkJJpKtM" },
        { name: "Quick Sort Algorithm", url: "https://www.geeksforgeeks.org/quick-sort/", youtube: "https://www.youtube.com/watch?v=ogjf7ORKfd8" },
        { name: "Merge Sort Algorithm", url: "https://www.geeksforgeeks.org/merge-sort/", youtube: "https://www.youtube.com/watch?v=ogjf7ORKfd8" },
        { name: "Insertion Sort Algorithm", url: "https://www.geeksforgeeks.org/insertion-sort/", youtube: "https://www.youtube.com/watch?v=C46QfTjVCNU" },
      ],
    },
    {
      week: 4,
      title: "Searching & Trees",
      project: "Problem Solving",
      topics: [
        "Searching (Binary, Linear)",
        "Two Pointer Algorithm",
        "Sliding Window",
        "Trees",
      ],
      task: "Solve 3-4 LeetCode problems on searching, two pointers, and trees.",
      links: [
        { name: "Binary Search Guide", url: "https://www.geeksforgeeks.org/binary-search/", youtube: "https://www.youtube.com/watch?v=T2sFYY-fT5o" },
        { name: "Two Pointer Technique", url: "https://www.geeksforgeeks.org/two-pointer-technique/", youtube: "https://www.youtube.com/watch?v=syTs9_w-pwA" },
        { name: "Sliding Window Tutorial", url: "https://www.geeksforgeeks.org/window-sliding-technique/", youtube: "https://www.youtube.com/watch?v=EHCGAZBbB88&feature=youtu.be" },
        { name: "Tree Data Structures", url: "https://www.geeksforgeeks.org/introduction-to-tree-data-structure-and-algorithm-tutorials/", youtube: "https://www.youtube.com/watch?v=fnmisPM6cVo" },
        { name: "Dynamic Programming", url: "https://www.geeksforgeeks.org/dynamic-programming/", youtube: "https://www.youtube.com/watch?v=nqowUJzG-iM&feature=youtu.be" },
      ],
    },
  ],
};

const ResourceCard = ({ week, title, project, topics, task, links, isOpen, toggleOpen, index }) => {
  return (
    <div
      className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl mb-6 overflow-hidden transform hover:shadow-3xl transition-all duration-700 animate-card-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      <div
        className="relative flex justify-between items-center p-6 cursor-pointer group"
        onClick={toggleOpen}
      >
        <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Week {week}</span>
          {isOpen ? (
            <FaChevronUp className="text-orange-500 transform group-hover:scale-125 transition-transform duration-200" />
          ) : (
            <FaChevronDown className="text-orange-500 transform group-hover:scale-125 transition-transform duration-200" />
          )}
        </div>
      </div>
      <div
        className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? "max-h-[800px] p-6 sm:p-4" : "max-h-0"
        }`}
      >
        <div className="border-l-2 border-orange-400 pl-4">
          <p className="text-lg font-semibold text-gray-800 mb-3 tracking-tight">
            Project: {project}
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            <span className="font-medium">Task:</span> {task}
          </p>
          <div className="mb-5">
            <h4 className="text-base font-semibold text-gray-800 mb-2 tracking-wide">
              Topics Covered:
            </h4>
            <ul className="space-y-2">
              {topics.map((topic, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 transform hover:scale-150 transition-transform"></span>
                  <span className="text-gray-600">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-2 tracking-wide">
              Resources:
            </h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index} className="flex items-center group">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:animate-pulse"></span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-700 font-medium group-hover:underline decoration-orange-300 decoration-2 underline-offset-4 transition-all duration-300"
                    >
                      {link.name}
                    </a>
                    {link.youtube && (
                      <a
                        href={link.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-800 transition-colors duration-300"
                      >
                        <FaYoutube className="text-lg transform hover:scale-125 transition-transform" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState("webDev");
  const [openWeeks, setOpenWeeks] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setOpenWeeks({});
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div id="resources" className="bg-warm py-16 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(249,115,22,0.15),_transparent_70%)] opacity-50"></div>
      <div className="container mx-auto max-w-5xl relative z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-[#212529] mb-5 tracking-tighter animate-fade-in">
          Resources
        </h1>
        <p className="text-lg sm:text-xl text-center text-[#4E4039] mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Embark on a transformative learning journey with expertly curated resources for Web Dev, App Dev, and DSA.
        </p>
        <div className="sticky top-0 bg-warm pt-4 pb-3 z-20">
          <div className="flex justify-center space-x-2 sm:space-x-4">
            <button
              onClick={() => handleTabChange("webDev")}
              className={`relative flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "webDev"
                  ? "text-orange-500 sm:scale-110"
                  : "text-gray-700 sm:hover:scale-105 hover:text-orange-400"
              }`}
            >
              Web Development
              {activeTab === "webDev" && (
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-orange-500 rounded-full transform scale-x-100 transition-transform duration-300 animate-slide-in"></span>
              )}
            </button>
            <button
              onClick={() => handleTabChange("appDev")}
              className={`relative flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "appDev"
                  ? "text-orange-500 sm:scale-110"
                  : "text-gray-700 sm:hover:scale-105 hover:text-orange-400"
              }`}
            >
              App Development
              {activeTab === "appDev" && (
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-orange-500 rounded-full transform scale-x-100 transition-transform duration-300 animate-slide-in"></span>
              )}
            </button>
            <button
              onClick={() => handleTabChange("dsa")}
              className={`relative flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === "dsa"
                  ? "text-orange-500 sm:scale-110"
                  : "text-gray-700 sm:hover:scale-105 hover:text-orange-400"
              }`}
            >
              DSA
              {activeTab === "dsa" && (
                <span className="absolute bottom-0 left-0 w-full h-1.5 bg-orange-500 rounded-full transform scale-x-100 transition-transform duration-300 animate-slide-in"></span>
              )}
            </button>
          </div>
        </div>
        <div
          className={`mt-10 transition-all duration-300 ${
            isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          }`}
        >
          {resourcesData[activeTab].map((weekData, index) => (
            <div key={weekData.week} className="group">
              <ResourceCard
                {...weekData}
                isOpen={openWeeks[activeTab]?.[weekData.week] || false}
                toggleOpen={() =>
                  setOpenWeeks((prev) => ({
                    ...prev,
                    [activeTab]: {
                      ...prev[activeTab],
                      [weekData.week]: !prev[activeTab]?.[weekData.week],
                    },
                  }))
                }
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;