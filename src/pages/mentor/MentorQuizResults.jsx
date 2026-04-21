import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const MentorQuizResults = () => {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [quizDetails, setQuizDetails] = useState({ title: 'Loading...', total_questions: 0 });

  useEffect(() => {
    // Simulate an API call to fetch quiz results since backend endpoint is pending
    const loadDummyData = () => {
      setTimeout(() => {
        setQuizDetails({
          title: 'Advanced Web Development Quiz',
          total_questions: 10
        });
        
        setResults([
          { attempt_id: 1, mentee_name: 'Alice Smith', mentee_email: 'alice@example.com', total_score: 8, submitted_at: new Date().toISOString() },
          { attempt_id: 2, mentee_name: 'Bob Jones', mentee_email: 'bob@example.com', total_score: 10, submitted_at: new Date().toISOString() },
          { attempt_id: 3, mentee_name: 'Charlie Doe', mentee_email: 'charlie@example.com', total_score: 4, submitted_at: new Date().toISOString() },
        ]);
        setLoading(false);
      }, 1000);
    };

    loadDummyData();
  }, [quizId]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <Link to="/mentor/quizzes" className="flex items-center text-zinc-400 hover:text-white mb-6 w-fit transition-colors">
            <IoArrowBack className="mr-2" /> Back to Quizzes
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">{quizDetails.title}</h1>
            <p className="text-zinc-400 mt-2">ID: {quizId} • {quizDetails.total_questions} Questions</p>
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
                    <th className="p-4 font-semibold text-zinc-300">Mentee Name</th>
                    <th className="p-4 font-semibold text-zinc-300">Email</th>
                    <th className="p-4 font-semibold text-zinc-300">Score</th>
                    <th className="p-4 font-semibold text-zinc-300">Submitted At</th>
                    <th className="p-4 font-semibold text-zinc-300">Actions</th>
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
                        <td className="p-4 font-medium text-white">{result.mentee_name}</td>
                        <td className="p-4 text-zinc-400 text-sm">{result.mentee_email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            result.total_score >= quizDetails.total_questions / 2 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                          }`}>
                            {result.total_score} / {quizDetails.total_questions}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-400 text-sm">
                          {new Date(result.submitted_at).toLocaleDateString()} {new Date(result.submitted_at).toLocaleTimeString()}
                        </td>
                        <td className="p-4">
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
