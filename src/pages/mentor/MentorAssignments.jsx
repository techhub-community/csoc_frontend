import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';

const MentorAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`${baseUrl}/assignment/list?token=${token}`);
        if (!res.ok) throw new Error("Failed to load assignments");
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [token]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
                Your Assignments
              </h1>
            </div>
            <Link 
              to="/mentor/assignments/create"
              className="flex items-center gap-2 bg-neon hover:bg-green-400 text-zinc-950 px-4 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)]"
            >
              <CiCirclePlus size={20} className="font-bold"/> Create Assignment
            </Link>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-zinc-500 animate-pulse">Loading assignments...</p>
          ) : assignments.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
              <p className="text-zinc-400 mb-4">You haven't created any assignments yet.</p>
              <Link to="/mentor/assignments/create" className="text-neon hover:underline">Create your first assignment</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map(assign => (
                <div key={assign.assignment_id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white line-clamp-2">{assign.title}</h3>
                  </div>
                  <div className="text-sm text-zinc-400 mb-4 flex-grow space-y-1">
                    <p className="line-clamp-2">{assign.description}</p>
                    <p className="mt-2 text-neon text-xs">Due Date: Not Set</p>
                    <p className="text-zinc-500 text-xs mt-2">Created: {new Date(assign.created_at * 1000).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-end border-t border-zinc-800 pt-4">
                    <Link 
                      to={`/mentor/assignments/${assign.assignment_id}/submissions`}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm px-4 py-2 rounded transition-colors"
                    >
                      View Submissions
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorAssignments;
