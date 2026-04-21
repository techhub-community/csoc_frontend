import React, { useState, useEffect } from 'react';
import useAuthStore from '../hooks/useAuthStore';
import useLocalStorage from '../hooks/useLocalStorage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { baseUrl } from '../data/consts';

export default function AssignmentsPage() {
  const { role } = useAuthStore();
  const [token] = useLocalStorage('token', null);
  const [calling, setCalling] = useState(false);
  
  const [assignments, setAssignments] = useState([]);
  
  // Mentor state
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Submissions viewing state for mentors
  const [viewingSubmissionsFor, setViewingSubmissionsFor] = useState(null); // assignment_id
  const [submissions, setSubmissions] = useState([]);

  // Mentee submit state
  const [submitForms, setSubmitForms] = useState({}); // { [assignment_id]: { github_link: '', text_answer: '' } }

  useEffect(() => {
    if (token) fetchAssignments();
  }, [token]);

  const fetchAssignments = async () => {
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/assignment/list?token=${token}`);
      const data = await res.json();
      if (res.ok) {
        setAssignments(data.assignments || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  // Mentor Actions
  const handleCreateSubmit = async () => {
    if (!title.trim() || !description.trim()) { alert("Title and description are required"); return; }
    
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/assignment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, title, description })
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); return; }
      
      setIsCreating(false);
      setTitle('');
      setDescription('');
      fetchAssignments();
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  const handleDeleteAssignment = async (assignment_id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/assignment/${assignment_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (res.ok) fetchAssignments();
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  const handleViewSubmissions = async (assignment_id) => {
    if (viewingSubmissionsFor === assignment_id) {
      setViewingSubmissionsFor(null);
      return;
    }
    
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/assignment/${assignment_id}/submissions?token=${token}`);
      const data = await res.json();
      if (res.ok) {
        setSubmissions(data.submissions || []);
        setViewingSubmissionsFor(assignment_id);
      } else {
        alert(data.error || "Failed to load submissions");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  // Mentee Actions
  const handleFormChange = (id, field, value) => {
    setSubmitForms({
      ...submitForms,
      [id]: { ...(submitForms[id] || { github_link: '', text_answer: '' }), [field]: value }
    });
  };

  const handleSubmitAssignment = async (assignment_id) => {
    const form = submitForms[assignment_id] || { github_link: '', text_answer: '' };
    if (!form.github_link.trim() && !form.text_answer.trim()) {
      alert("Please provide either a GitHub link or a text answer");
      return;
    }
    
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/assignment/${assignment_id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, github_link: form.github_link, text_answer: form.text_answer })
      });
      const data = await res.json();
      if (res.ok) {
        // Update local state instead of refetching everything to be smooth
        setAssignments(prev => prev.map(a => a.assignment_id === assignment_id ? { ...a, submitted: true } : a));
      } else {
        alert(data.error || "Failed to submit assignment");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <NavBar />
      <div className="flex-grow container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Assignments</h1>
          {role === 'mentor' && (
            <button 
              onClick={() => setIsCreating(!isCreating)} 
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 shadow-lg"
            >
              {isCreating ? 'Cancel' : 'Create Assignment'}
            </button>
          )}
        </div>

        {role === 'mentor' && isCreating && (
          <div className="bg-zinc-900 shadow-lg rounded-lg p-6 mb-8 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-4">Post New Assignment</h2>
            <div className="mb-4">
              <label className="block text-zinc-100 text-sm font-bold mb-2">Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
            </div>
            <div className="mb-6">
              <label className="block text-zinc-100 text-sm font-bold mb-2">Description / Task Details</label>
              <textarea 
                rows="6"
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm leading-relaxed whitespace-pre-wrap" 
              ></textarea>
            </div>
            <button disabled={calling} onClick={handleCreateSubmit} className="py-2 px-6 border border-green-500 text-green-500 rounded-md hover:bg-green-600 hover:text-white">
              Post Assignment
            </button>
          </div>
        )}

        <div className="space-y-6">
          {assignments.length === 0 && !calling && (
            <div className="text-center py-10 text-zinc-500">
              <p className="text-lg">No assignments available.</p>
            </div>
          )}
          {assignments.map(assg => (
            <div key={assg.assignment_id} className="bg-zinc-900 border border-zinc-800 shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{assg.title}</h3>
                  <span className="text-sm text-zinc-400">Posted on {new Date(assg.created_at).toLocaleDateString()}</span>
                </div>
                {role === 'mentor' && (
                  <button 
                    disabled={calling}
                    onClick={() => handleDeleteAssignment(assg.assignment_id)}
                    className="py-1 px-3 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-zinc-300 whitespace-pre-wrap line-clamp-3">{assg.description}</p>
              </div>

              {role === 'mentor' ? (
                <div>
                  <button 
                    disabled={calling}
                    onClick={() => handleViewSubmissions(assg.assignment_id)}
                    className="py-2 px-4 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 w-full md:w-auto"
                  >
                    {viewingSubmissionsFor === assg.assignment_id ? 'Hide Submissions' : 'View Submissions'}
                  </button>
                  
                  {viewingSubmissionsFor === assg.assignment_id && (
                    <div className="mt-4 bg-zinc-950 rounded-lg p-4 border border-zinc-800">
                      <h4 className="text-lg font-semibold text-white mb-3">Submissions ({submissions.length})</h4>
                      {submissions.length === 0 ? (
                        <p className="text-zinc-500">No submissions yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {submissions.map((sub, i) => (
                            <div key={i} className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
                              <div className="flex justify-between items-center mb-2">
                                <div>
                                  <span className="font-bold text-zinc-200">{sub.user_name}</span>
                                  <span className="text-sm text-zinc-500 ml-2">({sub.user_email})</span>
                                </div>
                                <span className="text-xs text-zinc-500">{new Date(sub.submitted_at).toLocaleString()}</span>
                              </div>
                              {sub.github_link && (
                                <div className="mb-2">
                                  <a href={sub.github_link} target="_blank" rel="noreferrer" className="text-green-400 hover:underline text-sm break-all">
                                    {sub.github_link}
                                  </a>
                                </div>
                              )}
                              {sub.text_answer && (
                                <div className="bg-zinc-950 p-3 rounded border border-zinc-800">
                                  <p className="text-sm text-zinc-300 whitespace-pre-wrap">{sub.text_answer}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  {assg.submitted ? (
                    <div className="inline-flex items-center px-4 py-2 bg-green-900/30 text-green-400 rounded-full font-medium border border-green-800">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Submitted
                    </div>
                  ) : (
                    <div className="space-y-4 bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                      <h4 className="text-white font-medium mb-2">Submit Assignment</h4>
                      <div>
                        <label className="block text-zinc-400 text-xs mb-1">GitHub Repository Link (Optional)</label>
                        <input 
                          type="url" 
                          placeholder="https://github.com/yourusername/repo"
                          value={(submitForms[assg.assignment_id] || {}).github_link || ''}
                          onChange={e => handleFormChange(assg.assignment_id, 'github_link', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-xs mb-1">Text Answer / Notes (Optional)</label>
                        <textarea 
                          rows="3"
                          placeholder="Any comments, deployed links, or explanations..."
                          value={(submitForms[assg.assignment_id] || {}).text_answer || ''}
                          onChange={e => handleFormChange(assg.assignment_id, 'text_answer', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                        ></textarea>
                      </div>
                      <button 
                        disabled={calling}
                        onClick={() => handleSubmitAssignment(assg.assignment_id)}
                        className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-500 font-semibold"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
