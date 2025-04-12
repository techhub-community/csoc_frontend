import React from 'react';
import NavBar from "../components/NavBar";
import { FaEnvelope } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineWarning, AiOutlineLock, AiOutlineCheck, AiOutlineClose, AiOutlineUser, AiOutlineTeam } from 'react-icons/ai';

import useAuthStore from "../hooks/useAuthStore";
import useLocalStorage from "../hooks/useLocalStorage";
import { baseUrl } from '../data/consts';
import { useState } from 'react';
import AutoSuggest from '../components/AutoSuggest';

const ProfileSection = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [calling, setCalling] = useState(false);
  const [token, ] = useLocalStorage("token", null);
  const [memberTeam, setMemberTeam] = useState({ a: "", b: "" });
  const { name, setName, about, setAbout, type, invite, team, pendings, email, verified, program, suggestions } = useAuthStore();

  const progDetailed = program === "web"
    ? "Web Development" : program === "app"
      ? "App Development" : "Data Structures & Algorithm";
  
  let t1, t2, p1, p2;

  if (team) {
    if (email === team.l) {
      t1 = team.m1;
      t2 = team.m2;
    }
    else {
      t1 = team.l;
      t2 = team.m1 === email
        ? team.m2 : team.m1;
    }
  }

  if (pendings.length > 0) {
    p1 = pendings[0]?.receiver;
    p2 = pendings[1]?.receiver;
  }

  // Priority based assignment: team > pendings
  const { f1, f2 } = assignValues([
    t1 ? { email: t1 } : null,
    t2 ? { email: t2 } : null,
    p1 ? { email: p1, pending: true } : null,
    p2 ? { email: p2, pending: true } : null,
  ]);

  const blockInvites = (f1 && f2) || (type === "member");

  function assignValues(args) {
    const data = new Set(args);
    const values = [];
    
    for (let i = 0; i < 2; i++) {
      for (const val of data) {
        data.delete(val);
        if (!val) continue;
        
        values[i] = val;
        break;
      }
    }
  
    return { f1: values[0], f2: values[1] };
  }

  async function teamRequestAction(accepted = false) {
    if (calling) return;
    setCalling(true);

    try {
      const req = await fetch(`${baseUrl}/process-invite`, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",

        body: JSON.stringify({
          token, accepted
        })
      });

      const data = await req.json();
      setCalling(false);

      if (!req.ok) {
        alert(data.error);
        return;
      }

      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error sending team request:", error);
    } finally {
      setCalling(false);
    }
  }

  async function sendInvitation() {
    if (calling) return;
    const emails = [];

    try {
      for (const email of Object.values(memberTeam)) 
        if (email) emails.push(email);
      if (!emails.length) return;
      setCalling(true);

      const req = await fetch(`${baseUrl}/send-invite`, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",

        body: JSON.stringify({
          receiverEmails: emails,
          token
        })
      });

      setCalling(false);
      const data = await req.json();

      if (!req.ok) {
        alert(data.error);
        return;
      }

      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error sending team request:", error);
    } finally {
      setCalling(false);
    }
  }

  async function updateName() {
    if (calling) return;

    try {  
      if (!name) {
        alert("Name cannot be empty");
        return;
      }
      
      setCalling(true);

      const req = await fetch(`${baseUrl}/update-name`, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",

        body: JSON.stringify({
          token, name
        })
      });

      const data = await req.json();
      setCalling(false);

      if (!req.ok) {
        alert(data.error);
        return;
      }

      alert("Name updated successfully");
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      setCalling(false);
    }
  }

  async function updateAbout() {
    if (calling) return;

    if (!about) {
      alert("About cannot be empty");
      return;
    }
    try {  
      setCalling(true);

      const req = await fetch(`${baseUrl}/update-about`, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",

        body: JSON.stringify({
          token, about
        })
      });

      const data = await req.json();
      setCalling(false);

      if (!req.ok) {
        alert(data.error);
        return;
      }

      alert("About info updated successfully");
    } catch (error) {
      console.error("Error updating about:", error);
    } finally {
      setCalling(false);
    }
  }

  async function updatePass() {
    if (calling) return;

    if (!oldPass || !newPass) {
      alert("Old password and new password cannot be empty");
      return;
    }
     
    try {
      setCalling(true);

      const req = await fetch(`${baseUrl}/update-password`, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",

        body: JSON.stringify({
          token, oldPass, newPass
        })
      });

      const data = await req.json();
      setCalling(false);

      if (!req.ok) {
        alert(data.error);
        return;
      }

      alert("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      setCalling(false);
    }
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
            invite && <div className="flex items-center p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg" role="alert">
              <AiOutlineTeam className="w-5 h-5 mr-3" />
              <div className="flex flex-col w-full">
                <span className="font-medium">{invite.name} ({invite.email}) has invited you to join their team</span>
                <div className="flex justify-end space-x-2 mt-2">
                  <button disabled={calling} onClick={() => teamRequestAction(true)} className="flex items-center px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white">
                    <AiOutlineCheck className="w-4 h-4 mr-1" /> Accept
                  </button>
                  <button disabled={calling} onClick={() => teamRequestAction(false)} className="flex items-center px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white">
                    <AiOutlineClose className="w-4 h-4 mr-1" /> Reject
                  </button>
                </div>
              </div>
            </div>
          }
          {
            <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg flex items-center space-x-4 transform transition-transform duration-300 ease-out">
              <FaCheckCircle className="w-6 h-6 text-green-400 text-center" />
              <div className="flex-1">
                <p className="text-sm">
                  You are enrolled in&nbsp;
                  <span className="inline-block font-bold bg-orange-800 text-white rounded-full px-2 py-1 my-1">
                    {progDetailed}
                  </span>
                </p>
              </div>
            </div>
          }
        </div>

        <div className="w-full max-w-lg space-y-4">
          {
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Build your team</h2>
              <p className="text-gray-600 mb-4">Team can have max three members</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    readOnly
                    type="email"
                    defaultValue={email}
                    placeholder="Enter member email"
                    className="bg-sky-200 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex items-center justify-center" key={"mem-a"}>
                  <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                  <AutoSuggest
                    suggestions={suggestions}
                    placeholder="Enter member email"
                    value={f1 ? f1.email : memberTeam.a}
                    readOnly={Boolean(f1) || blockInvites}
                    color={f1 ? (f1.pending ? "bg-amber-300" : "bg-green-300") : ""}
                    onChange={(e) => setMemberTeam({ ...memberTeam, a: e.target.value })}
                  />
                </div>
                <div className="flex items-center" key={"mem-b"}>
                  <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                  <AutoSuggest
                    suggestions={suggestions}
                    placeholder="Enter member email"
                    value={f2 ? f2.email : memberTeam.b}
                    readOnly={Boolean(f2) || blockInvites}
                    color={f2 ? (f2.pending ? "bg-amber-300" : "bg-green-300") : ""}
                    onChange={(e) => setMemberTeam({ ...memberTeam, b: e.target.value })}
                  />
                </div>
              </div>
              { 
                (!blockInvites) && <button
                  type="button"
                  disabled={calling}
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
                <button disabled={calling} onClick={updateName} className="ml-2 px-3 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
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
              <button disabled={calling} onClick={updateAbout} className="mt-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
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
                <button disabled={calling} onClick={updatePass} className="ml-2 px-3 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
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
