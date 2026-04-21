import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useAuthStore from '../../hooks/useAuthStore';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';
import { AiOutlineUnorderedList } from 'react-icons/ai';

const MentorDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [quizRes, assignRes] = await Promise.all([
          fetch(`${baseUrl}/quiz/list?token=${token}`),
          fetch(`${baseUrl}/assignment/list?token=${token}`)
        ]);
        
        if (quizRes.ok) {
          const quizData = await quizRes.json();
          setQuizzes(quizData);
        }
        
        if (assignRes.ok) {
          const assignData = await assignRes.json();
          setAssignments(assignData);
        }
      } catch (err) {
        setError("Failed to load dashboard data. Please check your connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
                Mentor Dashboard
              </h1>
              <p className="text-zinc-400 mt-2">Manage your quizzes and assignments</p>
            </div>
            <div className="flex gap-4">
              <Link 
                to="/mentor/quizzes/create"
                className="flex items-center gap-2 bg-neon hover:bg-green-400 text-zinc-950 px-4 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)]"
              >
                <CiCirclePlus size={20} className="font-bold"/> Create Quiz
              </Link>
              <Link 
                to="/mentor/assignments/create"
                className="flex items-center gap-2 bg-neon hover:bg-green-400 text-zinc-950 px-4 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)]"
              >
                <CiCirclePlus size={20} className="font-bold"/> Create Assignment
              </Link>
            </div>
          </div>
          
          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Overview Card 1 */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AiOutlineUnorderedList size={80} className="text-neon" />
              </div>
              <h2 className="text-zinc-400 text-xl font-semibold mb-2">Total Quizzes</h2>
              <p className="text-5xl font-black text-white">
                {loading ? "..." : quizzes.length}
              </p>
              <div className="mt-6">
                <Link to="/mentor/quizzes" className="text-green-500 hover:text-green-400 text-sm font-semibold flex items-center gap-1">
                  View all quizzes →
                </Link>
              </div>
            </div>

            {/* Overview Card 2 */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AiOutlineUnorderedList size={80} className="text-neon" />
              </div>
              <h2 className="text-zinc-400 text-xl font-semibold mb-2">Total Assignments</h2>
              <p className="text-5xl font-black text-white">
                {loading ? "..." : assignments.length}
              </p>
              <div className="mt-6">
                <Link to="/mentor/assignments" className="text-green-500 hover:text-green-400 text-sm font-semibold flex items-center gap-1">
                  View all assignments →
                </Link>
              </div>
            </div>
          </div>

          {!loading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Quizzes */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Recent Quizzes</h3>
                {quizzes.length === 0 ? (
                  <p className="text-zinc-500 text-sm italic">No quizzes created yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {quizzes.slice(0, 3).map((q) => (
                      <li key={q.quiz_id} className="flex justify-between items-center bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                        <div>
                          <p className="font-semibold text-zinc-200">{q.title}</p>
                          <p className="text-xs text-zinc-500 mt-1">{q.question_count} questions</p>
                        </div>
                        <Link to={`/mentor/quizzes/${q.quiz_id}/results`} className="text-green-500 hover:text-green-400 text-sm border border-green-500/30 px-3 py-1 rounded">
                          Results
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recent Assignments */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Recent Assignments</h3>
                {assignments.length === 0 ? (
                  <p className="text-zinc-500 text-sm italic">No assignments created yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {assignments.slice(0, 3).map((a) => (
                      <li key={a.assignment_id} className="flex justify-between items-center bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                        <div>
                          <p className="font-semibold text-zinc-200">{a.title}</p>
                          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{a.description}</p>
                        </div>
                        <Link to={`/mentor/assignments/${a.assignment_id}/submissions`} className="text-green-500 hover:text-green-400 text-sm border border-green-500/30 px-3 py-1 rounded whitespace-nowrap">
                          Submissions
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorDashboard;
