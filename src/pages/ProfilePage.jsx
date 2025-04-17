import React from 'react';
import NavBar from "../components/NavBar";
import { FaCheckCircle } from 'react-icons/fa';
import { AiOutlineWarning, AiOutlineLock, AiOutlineCheck, AiOutlineClose, AiOutlineUser, AiOutlineTeam, AiOutlineCopy } from 'react-icons/ai';
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
  const [isIndividual, setIsIndividual] = useState(false);
  const [teamOption, setTeamOption] = useState(null);
  const [teamName, setTeamName] = useState("team name");
  const [teamCode, setTeamCode] = useState("");
  const [joinTeamCode, setJoinTeamCode] = useState("");
  const [isTeamNameSet, setIsTeamNameSet] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { name, setName, about, setAbout, type, invite, team, pendings, email, verified, program, suggestions, usn, setUsn, setTeam } = useAuthStore(); 

  const progDetailed = program === "web"
    ? "Web Development" : program === "app"
      ? "App Development" : "Data Structures & Algorithm";
  
  let t1, t2, t3;

  if (team) {
    if (email === team.l) {
      t1 = team.m1;
      t2 = team.m2;
      t3 = team.m3;
    } else {
      t1 = team.l;
      t2 = team.m1 === email ? team.m2 : team.m1;
      t3 = team.m1 === email ? team.m3 : team.m2 === email ? team.m3 : team.m1;
    }
  }

  const members = [
    { email: email, isLeader: email === team?.l },
    t1 ? { email: t1 } : null,
    t2 ? { email: t2 } : null,
    t3 ? { email: t3 } : null,
  ].filter(Boolean);

  const blockInvites = members.length >= 4 || type === "member";

  function generateTeamCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return code;
  }

  // async function teamRequestAction(accepted = false) {
  //   if (calling) return;
  //   setCalling(true);

  //   try {
  //     const req = await fetch(`${baseUrl}/process-invite`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, accepted
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert(data.message);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error sending team request:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }

  // async function updateName() {
  //   if (calling) return;

  //   try {  
  //     if (!name) {
  //       alert("Name cannot be empty");
  //       return;
  //     }
      
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/update-name`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, name
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert("Name updated successfully");
  //   } catch (error) {
  //     console.error("Error updating name:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }

  // async function updateAbout() {
  //   if (calling) return;

  //   if (!about) {
  //     alert("About cannot be empty");
  //     return;
  //   }
  //   try {  
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/update-about`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, about
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert("About info updated successfully");
  //   } catch (error) {
  //     console.error("Error updating about:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }

  // async function updateUsn() { 
  //   if (calling) return;

  //   try {
  //     if (!usn) {
  //       alert("USN cannot be empty");
  //       return;
  //     }
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/update-usn`, { 
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, usn
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert("USN updated successfully");
  //   } catch (error) {
  //     console.error("Error updating USN:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }

  // async function updatePass() {
  //   if (calling) return;

  //   if (!oldPass || !newPass) {
  //     alert("Old password and new password cannot be empty");
  //     return;
  //   }
     
  //   try {
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/update-password`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, oldPass, newPass
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert("Password updated successfully");
  //   } catch (error) {
  //     console.error("Error updating password:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }

  // async function updateTeamName() {
  //   if (calling) return;

  //   if (!teamName) {
  //     alert("Team name cannot be empty");
  //     return;
  //   }

  //   try {
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/update-team-name`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, teamName
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert("Team name updated successfully");
  //   } catch (error) {
  //     console.error("Error updating team name:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }

  function updateTeamName() {
    if (!teamName) {
      alert("Team name cannot be empty");
      return;
    }
    setIsTeamNameSet(true);
  }

  // async function removeMember(memberEmail) {
  //   if (calling) return;

  //   try {
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/remove-member`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, memberEmail
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert("Member removed successfully");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error removing member:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }

  function removeMember(memberEmail) {
    if (memberEmail === team.m1) {
      setTeam({ ...team, m1: null });
    } else if (memberEmail === team.m2) {
      setTeam({ ...team, m2: null });
    } else if (memberEmail === team.m3) {
      setTeam({ ...team, m3: null });
    }
    alert("Member removed successfully");
  }

  // async function leaveTeam() {
  //   try {
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/leave-team`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     alert("You have left the team");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error leaving team:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }
  function leaveTeam() {
    setTeam(null);
    setTeamOption(null);
    alert("You have left the team");
  }

  // async function joinTeam() {
  //   if (calling) return;

  //   if (!joinTeamCode) {
  //     alert("Team code cannot be empty");
  //     return;
  //   }

  //   try {
  //     setCalling(true);

  //     const req = await fetch(`${baseUrl}/join-team`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: "POST",
  //       body: JSON.stringify({
  //         token, teamCode: joinTeamCode
  //       })
  //     });

  //     const data = await req.json();
  //     setCalling(false);

  //     if (!req.ok) {
  //       alert(data.error);
  //       return;
  //     }

  //     setTeam(data.team);
  //     setJoinTeamCode("");
  //     alert("You have joined the team");
  //   } catch (error) {
  //     console.error("Error joining team:", error);
  //   } finally {
  //     setCalling(false);
  //   }
  // }
  function joinTeam() {
    if (!joinTeamCode) {
      alert("Team code cannot be empty");
      return;
    }
    setTeam({ l: email, m1: "dummy@example.com" });
    setTeamCode(joinTeamCode);
    setJoinTeamCode("");
    setTeamOption(null);
    alert("You have joined the team");
  }

  function createTeam() {
    setTeam({ l: email, m1: "dummy@example.com" });
    setTeamOption('create');
    setTeamCode(generateTeamCode());
  }

  async function copyTeamCode() {
    try {
      await navigator.clipboard.writeText(teamCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy team code:", error);
    }
  }

  function handleTeamNameFocus() {
    setIsTeamNameSet(false);
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
                  <button disabled={calling} className="flex items-center px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white">
                    <AiOutlineCheck className="w-4 h-4 mr-1" /> Accept
                  </button>
                  <button disabled={calling} className="flex items-center px-3 py-1 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white">
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
                  You are enrolled in 
                  <span className="inline-block font-bold bg-orange-800 text-white rounded-full px-2 py-1 my-1">
                    {progDetailed}
                  </span>
                </p>
              </div>
            </div>
          }
        </div>

        <div className="w-full max-w-lg space-y-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isIndividual}
                onChange={(e) => setIsIndividual(e.target.checked)}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm font-bold">Participate as Individual</label>
            </div>
            <h2 className="text-xl font-bold mb-2">Team Settings</h2>
            <div className={`${isIndividual ? 'opacity-50 pointer-events-none' : ''}`}>
              {!teamOption && !team ? (
                <div className="space-y-4">
                  <button
                    type="button"
                    disabled={calling}
                    onClick={createTeam}
                    className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                  >
                    Create Team
                  </button>
                  <button
                    type="button"
                    disabled={calling}
                    onClick={() => setTeamOption('join')}
                    className="w-full py-2 px-4 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                  >
                    Join Team
                  </button>
                </div>
              ) : null}
              {(teamOption === 'create' || team) && (
                <div>
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        onFocus={handleTeamNameFocus}
                        className="border-b border-gray-300 focus:border-orange-500 outline-none text-gray-700 text-sm font-bold"
                        placeholder="team name"
                      />
                      {email === team?.l && (
                        <button
                          onClick={updateTeamName}
                          className={`ml-2 px-2 py-1 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-transform duration-300 ${isTeamNameSet ? 'scale-110' : ''}`}
                        >
                          {isTeamNameSet ? <AiOutlineCheck className="w-4 h-4" /> : 'Set'}
                        </button>
                      )}
                    </div>
                    {teamCode && (
                      <div className="flex items-center">
                        <span className="text-gray-700 text-sm font-bold mr-2">{teamCode}</span>
                        <button
                          onClick={copyTeamCode}
                          className={`p-1 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-transform duration-300 ${isCopied ? 'scale-110' : ''}`}
                        >
                          {isCopied ? <AiOutlineCheck className="w-4 h-4" /> : <AiOutlineCopy className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">Team can have max four members</p>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, index) => (
                      <div className="relative" key={`member-${index}`}>
                        {members[index] ? (
                          <>
                            <input
                              readOnly
                              type="email"
                              value={members[index].email}
                              placeholder="Enter member email"
                              className={`w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${members[index].isLeader ? 'bg-sky-200' : ''}`}
                            />
                            <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                            {members[index].isLeader && (
                              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">Leader</span>
                            )}
                            {email === team?.l && !members[index].isLeader && (
                              <button
                                disabled={calling}
                                onClick={() => removeMember(members[index].email)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white focus:outline-none"
                              >
                                Remove
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            <input
                              readOnly
                              type="text"
                              value=""
                              placeholder="Share team code to add members"
                              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100"
                            />
                            <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={calling}
                    onClick={leaveTeam}
                    className="mt-4 w-full py-2 px-4 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white focus:outline-none"
                  >
                    Leave Team
                  </button>
                </div>
              )}
              {teamOption === 'join' && (
                <div>
                  <p className="text-gray-600 mb-4">Enter the team code to join a team</p>
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={joinTeamCode}
                      onChange={(e) => setJoinTeamCode(e.target.value)}
                      placeholder="Enter team code"
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <AiOutlineTeam className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <button
                      disabled={calling}
                      onClick={joinTeam}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none"
                    >
                      Join
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={calling}
                    onClick={() => setTeamOption(null)}
                    className="w-full py-2 px-4 border border-gray-500 text-gray-500 rounded-md hover:bg-gray-500 hover:text-white focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Update your profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Update Your Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button disabled={calling} className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
                  Update
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Update Your USN</label>
              <div className="relative">
                <input
                  type="text"
                  value={usn}
                  placeholder="1MV2XXXXXX"
                  onChange={(e) => setUsn(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button disabled={calling} className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
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
              <button disabled={calling} className="mt-2 px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
                Update
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={oldPass}
                  placeholder="Old Password"
                  onChange={(e) => setOldPass(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={newPass}
                  placeholder="New Password"
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button disabled={calling} className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white focus:outline-none">
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