import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';

const MentorQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
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

  const toggleActive = (id) => {
    // Placeholder to toggle active state
    alert("Active toggle triggered for quiz " + id + ". Requires backend API update.");
  };

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) {
      return;
    }

    try {
      // Trying standard delete endpoint based on list endpoint
      const res = await fetch(`${baseUrl}/quiz/${quizId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to delete quiz");
      }
      
      setQuizzes(quizzes.filter((quiz) => quiz.quiz_id !== quizId));
      alert("Quiz deleted successfully");
    } catch (err) {
      alert("Error deleting quiz: " + err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
                Your Quizzes
              </h1>
            </div>
            <Link 
              to="/mentor/quizzes/create"
              className="flex items-center gap-2 bg-neon hover:bg-green-400 text-zinc-950 px-4 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)]"
            >
              <CiCirclePlus size={20} className="font-bold"/> Create Quiz
            </Link>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-zinc-500 animate-pulse">Loading quizzes...</p>
          ) : quizzes.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
              <p className="text-zinc-400 mb-4">You haven't created any quizzes yet.</p>
              <Link to="/mentor/quizzes/create" className="text-neon hover:underline">Create your first quiz</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map(quiz => (
                <div key={quiz.quiz_id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white line-clamp-2">{quiz.title}</h3>
                    <span className="bg-green-900/30 text-green-400 border border-green-500/30 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      Active
                    </span>
                  </div>
                  <div className="text-sm text-zinc-400 mb-4 flex-grow">
                    <p>Created: {new Date(quiz.created_at).toLocaleDateString()}</p>
                    <p>{quiz.question_count} questions</p>
                    <p className="mt-2 text-neon text-xs">Mentees attempted: ?</p>
                  </div>
                  <div className="flex justify-between gap-2 border-t border-zinc-800 pt-4">
                    <button 
                      onClick={() => toggleActive(quiz.quiz_id)}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Toggle Active
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteQuiz(quiz.quiz_id)}
                        className="bg-red-900/30 text-red-500 hover:bg-red-900/60 text-sm px-4 py-2 rounded transition-colors"
                      >
                        Delete
                      </button>
                      <Link 
                        to={`/mentor/quizzes/${quiz.quiz_id}/results`}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm px-4 py-2 rounded transition-colors"
                      >
                        View Results
                      </Link>
                    </div>
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

export default MentorQuizzes;
