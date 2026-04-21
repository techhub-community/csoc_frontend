import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const MentorAssignmentSubmissions = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`${baseUrl}/assignment/${assignmentId}/submissions?token=${token}`);
        if (!res.ok) throw new Error("Failed to load submissions");
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [assignmentId, token]);

  const handleGradeSubmit = (e, submissionId) => {
    e.preventDefault();
    alert(`Grade submitted for submission ${submissionId}. Requires backend API update to persist.`);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <Link to="/mentor/assignments" className="flex items-center text-zinc-400 hover:text-white mb-6 w-fit transition-colors">
            <IoArrowBack className="mr-2" /> Back to Assignments
          </Link>

          <div className="mb-8 items-center flex justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Assignment Submissions</h1>
              <p className="text-zinc-400">ID: {assignmentId}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <p className="text-zinc-300">
                <strong className="text-neon">{submissions.length}</strong> Total Submissions
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-zinc-500 animate-pulse">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
              <p className="text-zinc-400">No submissions received yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((sub) => (
                <div key={sub.submission_id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{sub.user_name}</h3>
                        <p className="text-sm text-zinc-400">{sub.user_email}</p>
                      </div>
                      <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                        {new Date(sub.submitted_at).toLocaleDateString()} {new Date(sub.submitted_at).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="space-y-4 mb-6">
                      {sub.github_link && (
                        <div>
                          <p className="text-sm text-zinc-400 font-semibold mb-1">Submission Link:</p>
                          <a href={sub.github_link} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 break-all text-sm">
                            {sub.github_link}
                          </a>
                        </div>
                      )}
                      
                      {sub.text_answer && (
                        <div>
                          <p className="text-sm text-zinc-400 font-semibold mb-1">Text Response:</p>
                          <div className="bg-zinc-950 border border-zinc-800 p-3 rounded text-sm text-zinc-300 whitespace-pre-wrap">
                            {sub.text_answer}
                          </div>
                        </div>
                      )}
                    </div>

                    <form className="border-t border-zinc-800 pt-4" onSubmit={(e) => handleGradeSubmit(e, sub.submission_id)}>
                      <h4 className="text-sm font-bold text-white mb-3">Grade & Feedback</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                          <input 
                            type="text" 
                            placeholder="Grade (e.g., A, 95/100)" 
                            className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input 
                            type="text" 
                            placeholder="Remarks / Feedback..." 
                            className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <button 
                            type="submit" 
                            className="w-full bg-neon text-zinc-950 font-bold py-2 rounded hover:bg-green-400 transition-colors"
                          >
                            Save Grade
                          </button>
                        </div>
                      </div>
                    </form>
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

export default MentorAssignmentSubmissions;
