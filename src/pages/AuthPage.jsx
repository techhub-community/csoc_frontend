import React, { useState } from 'react';
import { AiOutlineMail,AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Transition, TransitionChild } from '@headlessui/react';
import NavBar from "../components/NavBar";
import { CiMobile3 } from "react-icons/ci";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { CiViewList } from "react-icons/ci";
import useAuthStore from "../hooks/useAuthStore";
import useLocalStorage from "../hooks/useLocalStorage";
import { baseUrl } from '../data/consts';
import { useRef } from 'react';
import { useEffect } from 'react';

const AuthPage = () => {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const [opt, setOpt] = useState(undefined);
  const [confPass, setConfPass] = useState('');
  const [calling, setCalling] = useState(false);
  const [fixedEmail, setFixedEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState('');
  const [selectedForm, setSelectedForm] = useState('login');
  const [isOpen, setIsForgotPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage("token", null);
  const { setIsAuthenticated, setData, setInvite, setType, setTeam, setPendings, setProgram, setSuggestions } = useAuthStore();

  const [loginData, setLoginData] = useState({
    password: '',
    email: ''
  });

  const [registerData, setRegisterData] = useState({
    password: '',
    program: '',
    mobile: '',
    email: '',
    name: '',
    usn: ''
  });

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const prg = params.get("program");
    const optTok = params.get('opt');
    const em = params.get("email");
    
    if (optTok) setOpt(optTok);
    
    if (em) {
      setFixedEmail(em);
      setRegisterData(prevState => ({
        ...prevState,
        email: em
      }));
    }

    if (prg) {
      setRegisterData(prevState => ({
        ...prevState,
        program: prg
      }));
    }

    if (params.get("register") === "true")
      registerTab.current?.click();
  }, []);

  async function handleLoginSubmit() {
    if (calling) return;

    if (!loginData.email || !loginData.password) {
      alert('Please enter email and password');
      return;
    }

    try {
      setCalling(true);
      
      const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...loginData })
      });

      const data = await res.json();
      setCalling(false);

      if (!res.ok) {
        alert('Login failed: ' + data.error);
        return;
      }

      setLoginData({
        password: '',
        email: ''
      });

      const { name, props, about, verified, token, invite, type, team, pendings, program, suggestions, usn } = data;
      setData(name, loginData.email, about, props, verified, usn);
      setSuggestions(suggestions);
      setIsAuthenticated(true);
      setPendings(pendings);
      setProgram(program);
      setInvite(invite);
      setToken(token);
      setTeam(team);
      setType(type);

      navigate('/profile');
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setCalling(false);
    }
  }

  async function handleRegisterSubmit() {
    if (calling) return;

    if (registerData.password !== confPass) {
      alert('Passwords do not match');
      return;
    }

    try {
      setCalling(true);

      const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...registerData,
          opt
        })
      });

      const data = await res.json();
      setCalling(false);

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setConfPass('');
      navigate('/auth');
      setFixedEmail(null);

      setRegisterData({
        password: '',
        program: '',
        mobile: '',
        email: '',
        name: '',
        usn: ''
      });

      alert(data.message);
      loginTab.current?.click();
    } catch (error) {
      console.error("Error registering:", error);
    } finally {
      setCalling(false);
    }
  }

  async function handleForgotPWD() {
    if (calling) return;

    if (!forgotEmail) {
      alert('Please enter the email address linked to your account');
      return;
    }

    try {
      setCalling(true);

      const res = await fetch(`${baseUrl}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: forgotEmail })
      });

      setCalling(false);
      setForgotEmail("");
      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert(data.message);
      close();
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setCalling(false);
    }
  }

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
              ref={loginTab}
              disabled={calling}
              onClick={() => setSelectedForm('login')}
              className={`py-2 px-4 ${selectedForm === 'login' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'} rounded-l-lg border border-gray-300 focus:outline-none`}
            >
              Login
            </button>
            <button
              ref={registerTab}
              disabled={calling}
              onClick={() => setSelectedForm('register')}
              className={`py-2 px-4 ${selectedForm === 'register' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'} rounded-r-lg border border-gray-300 focus:outline-none`}
            >
              Register
            </button>
          </div>
          {
            selectedForm === 'register' && <div className="p-4 bg-yellow-200 text-black rounded-lg shadow-lg flex items-center space-x-4 transform transition-transform duration-300 ease-out">
              <div className="flex-1">
                <p className="text-sm">
                  Data Structures and Algorithms (DSA) is included for all participants registering for this program.
                </p>
              </div>
            </div>
          }
          <div className={`bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 ${selectedForm === 'login' ? 'scale-105' : 'scale-95'}`}>
            {selectedForm === 'login' ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  </div>
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={calling}
                  onClick={handleLoginSubmit}
                  className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                >
                  Login
                </button>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    disabled={calling}
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
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
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
                      readOnly={Boolean(fixedEmail)}
                      value={fixedEmail || registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your USN</label>
                  <div className="flex items-center">
                    <AiOutlineUser className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="text"
                      placeholder="1MV2XXXXXX"
                      value={registerData.usn}
                      onChange={(e) => setRegisterData({ ...registerData, usn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Select a program</label>
                  <div className="flex items-center">
                    <CiViewList className="w-6 h-6 text-gray-500 mr-2" />
                    <select
                      name="program"
                      disabled={Boolean(fixedEmail)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={registerData.program}
                      onChange={(e) => setRegisterData({ ...registerData, program: e.target.value })}
                    >
                      <option value="" disabled>Select a program</option>
                      <option value="web">Web Development</option>
                      <option value="app">App Development</option>
                      <option value="dsa">Data Structures & Algorithm</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Enter your WhatsApp contact</label>
                  <div className="flex items-center">
                    <CiMobile3 className="w-6 h-6 text-gray-500 mr-2" />
                    <input
                      type="tel"
                      value={registerData.mobile}
                      placeholder="Mobile number"
                      onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
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
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
                      value={confPass}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfPass(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  disabled={calling}
                  onClick={handleRegisterSubmit}
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
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={calling}
                        className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                        onClick={handleForgotPWD}
                      >
                        Send Reset Instructions
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