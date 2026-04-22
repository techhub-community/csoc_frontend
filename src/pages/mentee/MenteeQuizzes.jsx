import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { Link } from 'react-router-dom';

const MenteeQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useLocalStorage("token", null);
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    if (!token) return;
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(`${baseUrl}/quiz/list?token=${token}`);
        if (!res.ok) throw new Error("Failed to load quizzes");
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [token]);

  const displayedQuizzes = quizzes.filter(q => activeTab === 'available' ? !q.attempted : q.attempted);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
              Quizzes
            </h1>
          </div>

          <div className="flex gap-4 mb-8 border-b border-zinc-800">
            <button 
              className={`pb-2 font-bold transition-colors ${activeTab === 'available' ? 'text-neon border-b-2 border-neon' : 'text-zinc-500 hover:text-zinc-300'}`}
              onClick={() => setActiveTab('available')}
            >
              Available 
              <span className="ml-2 bg-zinc-800 text-xs px-2 py-0.5 rounded-full">{quizzes.filter(q => !q.attempted).length}</span>
            </button>
            <button 
              className={`pb-2 font-bold transition-colors ${activeTab === 'completed' ? 'text-neon border-b-2 border-neon' : 'text-zinc-500 hover:text-zinc-300'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
              <span className="ml-2 bg-zinc-800 text-xs px-2 py-0.5 rounded-full">{quizzes.filter(q => q.attempted).length}</span>
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-zinc-500 animate-pulse">Loading quizzes...</p>
          ) : displayedQuizzes.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
              <p className="text-zinc-400">{activeTab === 'available' ? "You have no pending quizzes. Great job!" : "You haven't completed any quizzes yet."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedQuizzes.map(quiz => (
                <div key={quiz.quiz_id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white line-clamp-2">{quiz.title}</h3>
                  </div>
                  <div className="text-sm text-zinc-400 mb-4 flex-grow">
                    <p>{quiz.question_count} questions</p>
                    {activeTab === 'completed' && <p className="mt-2 text-neon text-xs font-bold">Status: Submitted</p>}
                  </div>
                  <div className="flex justify-end border-t border-zinc-800 pt-4">
                    {activeTab === 'available' ? (
                      <Link 
                        to={`/mentee/quizzes/${quiz.quiz_id}/attempt`}
                        className="bg-neon text-zinc-950 font-bold text-sm px-4 py-2 rounded hover:bg-green-400 transition-colors"
                      >
                        Start Quiz
                      </Link>
                    ) : (
                      <Link 
                        to={`/mentee/quizzes/${quiz.quiz_id}/result`}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm px-4 py-2 rounded transition-colors"
                      >
                        View Score
                      </Link>
                    )}
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

export default MenteeQuizzes;
