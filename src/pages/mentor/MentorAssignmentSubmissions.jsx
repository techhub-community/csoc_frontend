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

  useEffect(() => {
    if (token) fetchSubmissions();
  }, [assignmentId, token]);

  const handleGradeSubmit = async (e, submissionId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const grade = formData.get('grade');
    const remarks = formData.get('remarks');

    if (!grade && !remarks) {
      alert("Please provide a grade or remark");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/assignment/${assignmentId}/submissions/${submissionId}/grade`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, grade, remarks })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit grade");

      alert("Grade saved successfully!");
      // Refresh submissions to show new grades
      fetchSubmissions();
      e.target.reset();
    } catch (err) {
      alert("Error saving grade: " + err.message);
    }
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

                    <div className="space-y-4 mb-6 text-sm bg-zinc-950 border border-zinc-800 p-4 rounded-lg">
                      <div className="flex gap-4">
                        <div className="font-bold text-zinc-300 w-24">Link:</div>
                        <div className="flex-1">
                          {sub.github_link ? (
                            <a href={sub.github_link} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 break-all">
                              {sub.github_link}
                            </a>
                          ) : <span className="text-zinc-600 italic">None provided</span>}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="font-bold text-zinc-300 w-24">Text:</div>
                        <div className="flex-1 text-zinc-400 whitespace-pre-wrap">
                          {sub.text_answer ? sub.text_answer : <span className="text-zinc-600 italic">None provided</span>}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="font-bold text-zinc-300 w-24 text-green-500">Cur. Grade:</div>
                        <div className="flex-1 text-zinc-300 font-bold">
                          {sub.grade ? <span className="text-neon">{sub.grade}</span> : <span className="text-zinc-600 italic">Not graded</span>}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="font-bold text-zinc-300 w-24 text-green-500">Remarks:</div>
                        <div className="flex-1 text-zinc-400">
                          {sub.remarks ? sub.remarks : <span className="text-zinc-600 italic">None</span>}
                        </div>
                      </div>
                    </div>

                    <form className="border-t border-zinc-800 pt-4" onSubmit={(e) => handleGradeSubmit(e, sub.submission_id)}>
                      <h4 className="text-sm font-bold text-white mb-3">Update Grade & Feedback</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                          <input 
                            name="grade"
                            type="text" 
                            defaultValue={sub.grade || ""}
                            placeholder="Grade (e.g., A, 95/100)" 
                            className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input 
                            name="remarks"
                            type="text" 
                            defaultValue={sub.remarks || ""}
                            placeholder="Remarks / Feedback..." 
                            className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <button 
                            type="submit" 
                            className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold py-2 rounded transition-colors"
                          >
                            Save Updates
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
