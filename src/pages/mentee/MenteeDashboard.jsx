import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useAuthStore from '../../hooks/useAuthStore';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import UpcomingSessions from '../../components/UpcomingSessions';

const MenteeDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useLocalStorage("token", null);
  const { role } = useAuthStore();

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

    if (token) fetchDashboardData();
  }, [token]);

  const pendingQuizzes = quizzes.filter(q => !q.attempted);
  const completedQuizzes = quizzes.filter(q => q.attempted);
  const pendingAssignments = assignments; // Assuming all are pending since backend lacks 'submitted' flag for list

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 sm:pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
              Mentee Dashboard
            </h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base">Track your progress and learning path</p>
          </div>
          
          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AiOutlineClockCircle size={80} className="text-yellow-500" />
              </div>
              <h2 className="text-zinc-400 text-xl font-semibold mb-2">Pending Tasks</h2>
              <div className="flex gap-4">
                <div>
                  <p className="text-4xl font-black text-white">{loading ? "-" : pendingQuizzes.length}</p>
                  <p className="text-xs text-zinc-500 mt-1 uppercase">Quizzes</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-white">{loading ? "-" : pendingAssignments.length}</p>
                  <p className="text-xs text-zinc-500 mt-1 uppercase">Assignments</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AiOutlineCheckCircle size={80} className="text-neon" />
              </div>
              <h2 className="text-zinc-400 text-xl font-semibold mb-2">Completed Quizzes</h2>
              <p className="text-4xl font-black text-white">
                {loading ? "-" : completedQuizzes.length}
              </p>
              <div className="mt-4">
                <Link to="/mentee/quizzes" className="text-green-500 hover:text-green-400 text-sm font-semibold flex items-center gap-1">
                  View results →
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <UpcomingSessions />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Actions</h3>
              <div className="space-y-4">
                <Link to="/mentee/quizzes" className="block w-full bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg border border-zinc-700 transition-colors">
                  <h4 className="font-bold text-white text-lg">Browse Quizzes</h4>
                  <p className="text-sm text-zinc-400 mt-1">Take active quizzes and test your knowledge</p>
                </Link>
                <Link to="/mentee/assignments" className="block w-full bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg border border-zinc-700 transition-colors">
                  <h4 className="font-bold text-white text-lg">My Assignments</h4>
                  <p className="text-sm text-zinc-400 mt-1">Submit your work and view grades</p>
                </Link>
              </div>
            </div>

            {/* Upcoming / Pending List */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Upcoming Quizzes</h3>
              {loading ? (
                <p className="text-zinc-500 animate-pulse text-sm">Loading...</p>
              ) : pendingQuizzes.length === 0 ? (
                <p className="text-zinc-500 text-sm italic">You are all caught up!</p>
              ) : (
                <ul className="space-y-3">
                  {pendingQuizzes.slice(0, 4).map((q) => (
                    <li key={q.quiz_id} className="flex justify-between items-center bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                      <div>
                        <p className="font-semibold text-zinc-200">{q.title}</p>
                        <p className="text-xs text-zinc-500 mt-1">{q.question_count} questions</p>
                      </div>
                      <Link to={`/mentee/quizzes/${q.quiz_id}/attempt`} className="text-green-500 hover:text-green-400 text-sm border border-green-500/30 px-3 py-1 rounded">
                        Start
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenteeDashboard;
