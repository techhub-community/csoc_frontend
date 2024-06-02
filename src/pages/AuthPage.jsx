import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineUser, AiOutlineIdcard, AiOutlineLock } from 'react-icons/ai';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { RadioGroup, Radio } from '@headlessui/react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Transition, TransitionChild } from '@headlessui/react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const AuthPage = () => {
  const [loginRole, setLoginRole] = useState('mentee');
  const [selectedForm, setSelectedForm] = useState('login');
  const [isOpen, setIsForgotPasswordOpen] = useState(false);
  const [registerRole, setRegisterRole] = useState('mentee');

  function close() {
    setIsForgotPasswordOpen(false);
    return true;
  }

  return (
    <>
      <NavBar />
      <div className="py-20 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg mx-auto p-6">
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setSelectedForm('login')}
              className={`py-2 px-4 ${selectedForm === 'login' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'} rounded-l-lg border border-gray-300 focus:outline-none`}
            >
              Login
            </button>
            <button
              onClick={() => setSelectedForm('register')}
              className={`py-2 px-4 ${selectedForm === 'register' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'} rounded-r-lg border border-gray-300 focus:outline-none`}
            >
              Register
            </button>
          </div>

          <div className={`bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 ${selectedForm === 'login' ? 'scale-105' : 'scale-95'}`}>
            <div className="text-center mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Your Role?</label>
              <RadioGroup value={selectedForm === 'login' ? loginRole : registerRole} onChange={selectedForm === 'login' ? setLoginRole : setRegisterRole} className="flex justify-center space-x-4">
                <Radio value="mentor">
                  {({ checked }) => (
                    <div className={`py-2 px-4 border ${checked ? 'border-orange-500 bg-orange-100' : 'border-gray-300'} rounded-md cursor-pointer flex items-center space-x-2`}>
                      <FaChalkboardTeacher className="w-5 h-5" />
                      <span>Mentor</span>
                    </div>
                  )}
                </Radio>
                <Radio value="mentee">
                  {({ checked }) => (
                    <div className={`py-2 px-4 border ${checked ? 'border-orange-500 bg-orange-100' : 'border-gray-300'} rounded-md cursor-pointer flex items-center space-x-2`}>
                      <FaUserGraduate className="w-5 h-5" />
                      <span>Mentee</span>
                    </div>
                  )}
                </Radio>
              </RadioGroup>
            </div>
            {selectedForm === 'login' ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your email</label>
                  <div className="flex items-center">
                    <AiOutlineMail className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your password</label>
                  <div className="flex items-center">
                    <AiOutlineLock className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                >
                  Login
                </button>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your name</label>
                  <div className="flex items-center">
                    <AiOutlineUser className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your email</label>
                  <div className="flex items-center">
                    <AiOutlineMail className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your USN</label>
                  <div className="flex items-center">
                    <AiOutlineIdcard className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="USN"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your password</label>
                  <div className="flex items-center">
                    <AiOutlineLock className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Confirm your password</label>
                  <div className="flex items-center">
                    <AiOutlineLock className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
        <Transition appear show={isOpen}>
          <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
                  <DialogPanel className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 backdrop-blur-2xl">
                    <DialogTitle as="h2" className="text-lg font-medium leading-6 text-gray-900">
                      Forgot your password?
                    </DialogTitle>
                    <div className="mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Enter your email address</label>
                      <div className="flex items-center mb-4">
                        <AiOutlineMail className="w-6 h-6 text-gray-500 mr-2" />
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                        onClick={() => close() && alert('Password reset instructions will be sent to the provided email address.')}
                      >
                        Send Instructions
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
