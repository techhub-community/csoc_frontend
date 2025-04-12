import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
        { name: "MDN HTML Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
        { name: "CSS Grid Tutorial", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
        { name: "GitHub Pages Docs", url: "https://docs.github.com/en/pages" },
      ],
    },
    {
      week: 2,
      title: "JavaScript & DOM Manipulation",
      project: "To-Do List App",
      topics: [
        "JavaScript Basics (Variables, Functions, Loops)",
        "DOM Manipulation (Event Listeners, getElementById, querySelector)",
        "Local Storage (Saving Data in Browser)",
      ],
      task: "Build a To-Do list where users can add, delete, and mark tasks as completed.",
      links: [
        { name: "JavaScript.info", url: "https://javascript.info/" },
        { name: "DOM Manipulation Guide", url: "https://www.w3schools.com/js/js_htmldom.asp" },
        { name: "Local Storage Tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
      ],
    },
    {
      week: 3,
      title: "Frontend Framework (React.js)",
      project: "Weather App",
      topics: [
        "Introduction to React (Components, Props, State)",
        "Fetching API Data (Using fetch() or axios)",
        "JSX & Conditional Rendering",
      ],
      task: "Build a Weather App that fetches weather data based on user input (city name) using a weather API.",
      links: [
        { name: "React Official Docs", url: "https://react.dev/" },
        { name: "OpenWeather API", url: "https://openweathermap.org/api" },
        { name: "Axios Guide", url: "https://axios-http.com/docs/intro" },
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
        { name: "Node.js Docs", url: "https://nodejs.org/en/docs/" },
        { name: "Express.js Guide", url: "https://expressjs.com/" },
        { name: "MongoDB Tutorial", url: "https://www.mongodb.com/docs/" },
        { name: "MERN Stack Tutorial", url: "https://www.mongodb.com/languages/mern-stack-tutorial" },
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
        { name: "Flutter Setup Guide", url: "https://flutter.dev/docs/get-started/install" },
        { name: "Dart Language Tour", url: "https://dart.dev/guides/language/language-tour" },
        { name: "Flutter Basics Codelab", url: "https://codelabs.developers.google.com/codelabs/flutter-codelab-first" },
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
        { name: "Flutter Widgets Catalog", url: "https://flutter.dev/docs/development/ui/widgets" },
        { name: "Responsive Design in Flutter", url: "https://flutter.dev/docs/development/ui/layout/responsive" },
        { name: "Flutter Codelabs", url: "https://flutter.dev/docs/codelabs" },
      ],
    },
    {
      week: 3,
      title: "Navigation & State Management",
      project: "Meals App, Shop App",
      topics: [
        "Widgets & Flutter Internals (Deep Dive)",
        "Navigation & Multiple Screens",
        "State Management (MVP)",
        "Working with User Input & Forms",
        "Sending HTTP Requests",
      ],
      task: "Develop a meals app and start a shop app with navigation and forms.",
      links: [
        { name: "Flutter Navigation Guide", url: "https://flutter.dev/docs/cookbook/navigation" },
        { name: "State Management in Flutter", url: "https://flutter.dev/docs/development/data-and-backend/state-mgmt" },
        { name: "Flutter HTTP Requests", url: "https://flutter.dev/docs/cookbook/networking/fetch-data" },
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
        { name: "Firebase Authentication", url: "https://firebase.google.com/docs/auth/flutter/start" },
        { name: "Flutter Animations Guide", url: "https://flutter.dev/docs/development/ui/animations" },
        { name: "Flutter Shop App Tutorial", url: "https://www.youtube.com/watch?v=3z1J3aAFW8g" },
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
        { name: "C++ Tutorial", url: "https://www.geeksforgeeks.org/c-plus-plus/" },
        { name: "STL Guide", url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/" },
        { name: "Complexity Analysis", url: "https://www.programiz.com/dsa/time-complexity" },
        { name: "LeetCode Problems", url: "https://leetcode.com/problemset/all/" },
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
        { name: "String Problems", url: "https://leetcode.com/tag/string/" },
        { name: "Recursion Tutorial", url: "https://www.geeksforgeeks.org/introduction-to-recursion-data-structure-and-algorithm-tutorials/" },
        { name: "Array Operations", url: "https://www.geeksforgeeks.org/array-data-structure/" },
        { name: "Stack Applications", url: "https://www.programiz.com/dsa/stack" },
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
        { name: "Linked List Guide", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
        { name: "Sorting Algorithms", url: "https://www.geeksforgeeks.org/sorting-algorithms/" },
        { name: "Hash Map Tutorial", url: "https://www.geeksforgeeks.org/hash-maps-in-cpp/" },
        { name: "LeetCode Sorting", url: "https://leetcode.com/tag/sorting/" },
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
        { name: "Binary Search Guide", url: "https://www.geeksforgeeks.org/binary-search/" },
        { name: "Two Pointer Technique", url: "https://www.geeksforgeeks.org/two-pointer-technique/" },
        { name: "Sliding Window Tutorial", url: "https://www.geeksforgeeks.org/window-sliding-technique/" },
        { name: "Tree Problems", url: "https://leetcode.com/tag/tree/" },
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
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-700 font-medium group-hover:underline decoration-orange-300 decoration-2 underline-offset-4 transition-all duration-300"
                  >
                    {link.name}
                  </a>
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