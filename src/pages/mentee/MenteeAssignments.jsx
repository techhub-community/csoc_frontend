import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { Link } from 'react-router-dom';

const MenteeAssignments = () => {
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
    if (token) fetchAssignments();
  }, [token]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
              Your Assignments
            </h1>
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
              <p className="text-zinc-400">You have no active assignments.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map(assign => (
                <div key={assign.assignment_id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white line-clamp-2">{assign.title}</h3>
                  </div>
                  <div className="text-sm text-zinc-400 mb-4 flex-grow space-y-2">
                    <p className="line-clamp-3">{assign.description}</p>
                    <div className="mt-4 p-2 bg-zinc-950 rounded border border-zinc-800 text-xs">
                      <span className="text-zinc-500">Mentee API doesn't return submitted state yet. Assuming Pending.</span>
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 border-t border-zinc-800 pt-4">
                    <span className="text-xs text-zinc-500 self-end">Due: Not set</span>
                    <Link 
                      to={`/mentee/assignments/${assign.assignment_id}/submit`}
                      className="bg-neon text-zinc-950 font-bold text-sm px-4 py-2 rounded hover:bg-green-400 transition-colors"
                    >
                      Submit Work
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

export default MenteeAssignments;
