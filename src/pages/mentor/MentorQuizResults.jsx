import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const MentorQuizResults = () => {
  const { quizId } = useParams();
  const [token] = useLocalStorage("token", null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  // Backend doesn't return quiz details in standard attempts endpoint, so we fetch quiz list to get max score and title
  const [quizDetails, setQuizDetails] = useState({ title: 'Loading...', total_questions: 0 });

  useEffect(() => {
    const fetchAttemptsAndQuiz = async () => {
      try {
        const [attemptsRes, quizzesRes] = await Promise.all([
          fetch(`${baseUrl}/quiz/${quizId}/attempts?token=${token}`),
          fetch(`${baseUrl}/quiz/list?token=${token}`)
        ]);

        if (!attemptsRes.ok) throw new Error("Failed to load attempts");
        const attemptsData = await attemptsRes.json();
        setResults(attemptsData);

        if (quizzesRes.ok) {
          const quizzes = await quizzesRes.json();
          const targetQuiz = quizzes.find(q => q.quiz_id === Number(quizId));
          if (targetQuiz) {
            setQuizDetails({
              title: targetQuiz.title,
              total_questions: targetQuiz.question_count // which maps to max_score roughly if marks=1
            });
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAttemptsAndQuiz();
  }, [quizId, token]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 sm:pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <Link to="/mentor/quizzes" className="flex items-center text-zinc-400 hover:text-white mb-6 w-fit transition-colors">
            <IoArrowBack className="mr-2" /> Back to Quizzes
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{quizDetails.title}</h1>
            <p className="text-zinc-400 mt-2 text-sm">ID: {quizId} • {quizDetails.total_questions} Questions</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <p className="text-zinc-300">
              <strong className="text-neon">{results.length}</strong> mentees attempted this quiz
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-800 border-b border-zinc-700">
                    <th className="p-3 sm:p-4 font-semibold text-zinc-300 text-sm">Mentee Name</th>
                    <th className="p-3 sm:p-4 font-semibold text-zinc-300 text-sm hidden sm:table-cell">Email</th>
                    <th className="p-3 sm:p-4 font-semibold text-zinc-300 text-sm">Score</th>
                    <th className="p-3 sm:p-4 font-semibold text-zinc-300 text-sm hidden md:table-cell">Submitted At</th>
                    <th className="p-3 sm:p-4 font-semibold text-zinc-300 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-zinc-500 animate-pulse">Loading attempts...</td>
                    </tr>
                  ) : results.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-zinc-500">No attempts found for this quiz.</td>
                    </tr>
                  ) : (
                    results.map((result) => (
                      <tr key={result.attempt_id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                        <td className="p-3 sm:p-4 font-medium text-white text-sm">{result.mentee_name}</td>
                        <td className="p-3 sm:p-4 text-zinc-400 text-sm hidden sm:table-cell">{result.mentee_email}</td>
                        <td className="p-3 sm:p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            result.total_score >= quizDetails.total_questions / 2 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                          }`}>
                            {result.total_score} / {quizDetails.total_questions}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-zinc-400 text-sm hidden md:table-cell">
                          {new Date(result.submitted_at * 1000).toLocaleDateString()} {new Date(result.submitted_at * 1000).toLocaleTimeString()}
                        </td>
                        <td className="p-3 sm:p-4">
                          <button 
                            className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            onClick={() => alert(`View details for ${result.mentee_name} - Requires backend API detail endpoint`)}
                          >
                            View Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorQuizResults;
