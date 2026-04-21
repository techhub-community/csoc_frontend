import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const MenteeAssignmentSubmit = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [token] = useLocalStorage("token", null);
  
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (calling) return;

    if (!submissionLink.trim() && !submissionText.trim()) {
      setError("Please provide either a submission link or a text response.");
      return;
    }

    setCalling(true);
    setError("");

    try {
      const payload = {
        token,
        github_link: submissionLink.trim() || undefined,
        text_answer: submissionText.trim() || undefined
      };

      const res = await fetch(`${baseUrl}/assignment/${assignmentId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit assignment");

      alert("Assignment submitted successfully!");
      navigate('/mentee/assignments');
    } catch (err) {
      setError(err.message);
      setCalling(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-3xl p-4">
          <Link to="/mentee/assignments" className="flex items-center text-zinc-400 hover:text-white mb-6 w-fit transition-colors">
            <IoArrowBack className="mr-2" /> Back to Assignments
          </Link>

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500 mb-2">
            Submit Assignment
          </h1>
          <p className="text-zinc-400 mb-8">Assignment ID: {assignmentId}</p>
          
          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-lg">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-400 mb-6">
              <span className="text-neon font-bold">Instructions:</span> Provide a link to your work (e.g. GitHub repository, Google Doc) OR write your response directly in the text box below. You can also provide both.
            </div>

            <div>
              <label className="block text-zinc-100 text-sm font-bold mb-2">Submission Link (Optional)</label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-zinc-100 text-sm font-bold mb-2">Text Response (Optional)</label>
              <textarea
                placeholder="Write your explanation or code here..."
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                rows="6"
                className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-y transition-colors font-mono text-sm"
              ></textarea>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex justify-end">
              <button
                type="submit"
                disabled={calling}
                className={`py-3 px-8 bg-green-500 hover:bg-green-400 text-zinc-950 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] ${calling ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {calling ? 'Submitting...' : 'Submit Work'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenteeAssignmentSubmit;
