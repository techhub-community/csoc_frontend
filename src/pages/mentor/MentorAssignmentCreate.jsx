import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { useNavigate } from 'react-router-dom';

const MentorAssignmentCreate = () => {
  const [token] = useLocalStorage("token", null);
  const navigate = useNavigate();
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [referenceLink, setReferenceLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (calling) return;
    setCalling(true);
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      setCalling(false);
      return;
    }

    try {
      const payload = {
        token,
        title,
        description,
        domain: 'general', // Backend default
        // Passing these to backend which will ignore them unless backend is updated as specified
        due_date: dueDate,
        reference_link: referenceLink
      };

      const res = await fetch(`${baseUrl}/assignment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create assignment');

      alert('Assignment created successfully!');
      navigate('/mentor/assignments');
    } catch (err) {
      setError(err.message);
    } finally {
      setCalling(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 sm:pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-3xl p-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500 mb-8">
            Create New Assignment
          </h1>
          
          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 border border-zinc-800 p-5 sm:p-8 rounded-xl shadow-lg">
            <div>
              <label className="block text-zinc-100 text-sm font-bold mb-2">Assignment Title *</label>
              <input
                type="text"
                required
                placeholder="E.g., Implement Authentication API"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-zinc-100 text-sm font-bold mb-2">Description / Instructions *</label>
              <textarea
                required
                placeholder="Provide detailed instructions for completion..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-y transition-colors"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-100 text-sm font-bold mb-2">Due Date (Optional)</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-zinc-100 text-sm font-bold mb-2">Reference Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://docs.example.com"
                  value={referenceLink}
                  onChange={(e) => setReferenceLink(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <button
                type="submit"
                disabled={calling}
                className={`w-full py-3 px-4 bg-green-500 hover:bg-green-400 text-zinc-950 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] ${calling ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {calling ? 'Creating Assignment...' : 'Publish Assignment'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorAssignmentCreate;
