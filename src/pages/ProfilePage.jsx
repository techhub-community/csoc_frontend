import React from 'react';
import { AiOutlineWarning, AiOutlineLock, AiOutlineCheck, AiOutlineClose, AiOutlineUser, AiOutlineTeam } from 'react-icons/ai';
import NavBar from "../components/NavBar";
import { FaEnvelope } from 'react-icons/fa';
import Footer from "../components/Footer";

const ProfileSection = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 py-10 space-y-4">
        <div className="w-full max-w-lg">
          <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <AiOutlineWarning className="w-5 h-5 mr-3" />
            <div>
              <span className="font-medium">Verify your account by confirming the email sent to your inbox.</span>
              <p className="mt-1 opacity-75 italic">Check your spam folder also.</p>
            </div>
          </div>
          <div className="flex items-center p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg" role="alert">
            <AiOutlineTeam className="w-5 h-5 mr-3" />
            <div className="flex flex-col w-full">
              <span className="font-medium">[User] has invited you to join their team</span>
              <div className="flex justify-end space-x-2 mt-2">
                <button className="flex items-center px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white">
                  <AiOutlineCheck className="w-4 h-4 mr-1" /> Accept
                </button>
                <button className="flex items-center px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white">
                  <AiOutlineClose className="w-4 h-4 mr-1" /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg space-y-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Build your team</h2>
            <p className="text-gray-600 mb-4">Team can have max three members</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="email"
                  value={"readonly@my-email.in"}
                  placeholder="Enter member email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  readOnly
                />
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Enter member email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Enter member email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
            >
              Send Request
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Update your profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Update Your Name</label>
              <div className="flex items-center">
                <AiOutlineUser className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="ml-2 px-3 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
                  Update
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Specify your skills and techstacks</label>
              <textarea
                placeholder="Enter your skills and techstacks"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                rows="3"
              ></textarea>
              <button className="mt-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
                Update
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
              <div className="flex items-center">
                <AiOutlineLock className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
              <div className="flex items-center">
                <AiOutlineLock className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="ml-2 px-3 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
