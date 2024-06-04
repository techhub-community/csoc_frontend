import React from 'react';
import { AiOutlineWarning, AiOutlineLock, AiOutlineCheck, AiOutlineClose, AiOutlineUser, AiOutlineTeam } from 'react-icons/ai';
import NavBar from "../components/NavBar";
import { FaEnvelope } from 'react-icons/fa';

import useAuthStore from "../hooks/useAuthStore";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState } from 'react';
import { baseUrl } from '../data/consts';

const ProfileSection = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [token, ] = useLocalStorage("token", null);
  const [memberTeam, setMemberTeam] = useState({ a: "", b: "" });
  const { name, setName, role, about, setAbout, email, verified, props, setProps } = useAuthStore();

  const teamReq = {
    available: Boolean(props.teamReq),
    requester: props.teamReq?.name,
    email: props.teamReq?.email
  }

  let teamA = props.team?.a;
  let teamB = props.team?.b;

  async function teamRequestAction(accepted = false) {
    const req = await fetch(`${baseUrl}/process-invite`, {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",

      body: JSON.stringify({
        token, accepted
      })
    });

    const data = await req.json();

    if (!req.ok) {
      alert(data.error);
      return;
    }

    alert(data.message);
    window.location.reload();
  }

  async function sendInvitation() {
    let i = 0;

    for (const email of Object.values(memberTeam)) {
      if (!email) continue;

      const req = await fetch(`${baseUrl}/send-invite`, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",

        body: JSON.stringify({
          token, reqEmail: email
        })
      });

      const data = await req.json();

      if (!req.ok) {
        alert(data.error);
        return;
      }

      if (i === 0) {
        setProps({ ...props, team: { ...props.team, a: { email, status: 1 } } });
        teamA = props.team?.a;
      }
      else {
        setProps({ ...props, team: { ...props.team, b: { email, status: 1 } } });
        teamB = props.team?.b;
      }

      i++;
    }

    window.location.reload();
  }

  async function updateName() {
    const req = await fetch(`${baseUrl}/update-name`, {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",

      body: JSON.stringify({
        token, name
      })
    });

    const data = await req.json();

    if (!req.ok) {
      alert(data.error);
      return;
    }

    alert("Name updated successfully");
  }

  async function updateAbout() {
    const req = await fetch(`${baseUrl}/update-about`, {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",

      body: JSON.stringify({
        token, about
      })
    });

    const data = await req.json();

    if (!req.ok) {
      alert(data.error);
      return;
    }

    alert("About info updated successfully");
  }

  async function updatePass() {
    const req = await fetch(`${baseUrl}/update-password`, {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",

      body: JSON.stringify({
        token, oldPass, newPass
      })
    });

    const data = await req.json();

    if (!req.ok) {
      alert(data.error);
      return;
    }

    alert("Password updated successfully");    
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 py-10 space-y-4">
        <div className="w-full max-w-lg">
          {
            verified === 0 && <div className="flex items-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              <AiOutlineWarning className="w-5 h-5 mr-3" />
              <div>
                <span className="font-medium">Verify your account by confirming the email sent to your inbox.</span>
                <p className="mt-1 opacity-75 italic">Check your spam folder also.</p>
              </div>
            </div>
          }
          {
            teamReq.available && <div className="flex items-center p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg" role="alert">
              <AiOutlineTeam className="w-5 h-5 mr-3" />
              <div className="flex flex-col w-full">
                <span className="font-medium">{teamReq.requester} [{teamReq.email}] has invited you to join their team</span>
                <div className="flex justify-end space-x-2 mt-2">
                  <button onClick={() => teamRequestAction(true)} className="flex items-center px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white">
                    <AiOutlineCheck className="w-4 h-4 mr-1" /> Accept
                  </button>
                  <button onClick={() => teamRequestAction(false)} className="flex items-center px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white">
                    <AiOutlineClose className="w-4 h-4 mr-1" /> Reject
                  </button>
                </div>
              </div>
            </div>
          }
        </div>

        <div className="w-full max-w-lg space-y-4">
          {
            role === "mentee" && <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Build your team</h2>
              <p className="text-gray-600 mb-4">Team can have max three members</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="email"
                    defaultValue={email}
                    placeholder="Enter member email"
                    className="bg-sky-200 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    readOnly
                  />
                </div>
                <div className="flex items-center" key={"mem-a"}>
                  <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="email"
                    placeholder="Enter member email"
                    value={teamA ? teamA.email : memberTeam.a}
                    readOnly={teamA ? true : false}
                    onChange={(e) => setMemberTeam({ ...memberTeam, a: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${teamA ? (teamA.status === 0 ? "bg-amber-300" : "bg-green-300") : "" }`}
                  />
                </div>
                <div className="flex items-center" key={"mem-b"}>
                  <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="email"
                    placeholder="Enter member email"
                    value={teamB ? teamB.email : memberTeam.b}
                    readOnly={teamB ? true : false}
                    onChange={(e) => setMemberTeam({ ...memberTeam, b: e.target.value })}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${teamB ? (teamB.status === 0 ? "bg-amber-300" : "bg-green-300") : "" }`}
                  />
                </div>
              </div>
              { 
                (!teamA || !teamB) && <button
                  type="button"
                  onClick={sendInvitation}
                  className="mt-4 w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                >
                  Send Invite
                </button>
              }
            </div>
          }

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Update your profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Update Your Name</label>
              <div className="flex items-center">
                <AiOutlineUser className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button onClick={updateName} className="ml-2 px-3 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
                  Update
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Specify your skills and techstacks</label>
              <textarea
                value={about}
                placeholder="Enter your skills and techstacks"
                onChange={(e) => setAbout(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                rows="5"
              ></textarea>
              <button onClick={updateAbout} className="mt-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
                Update
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
              <div className="flex items-center">
                <AiOutlineLock className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="password"
                  value={oldPass}
                  placeholder="Old Password"
                  onChange={(e) => setOldPass(e.target.value)}
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
                  value={newPass}
                  placeholder="New Password"
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button onClick={updatePass} className="ml-2 px-3 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
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
