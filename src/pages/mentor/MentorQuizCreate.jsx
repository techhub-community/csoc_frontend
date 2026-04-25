import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

const MentorQuizCreate = () => {
  const [token] = useLocalStorage("token", null);
  const navigate = useNavigate();
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_option: 'a',
      marks: 1
    }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_option: 'a',
      marks: 1
    }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (calling) return;
    setCalling(true);
    setError('');

    // Form basic validation
    if (!title.trim()) {
      setError('Quiz title is required.');
      setCalling(false);
      return;
    }

    try {
      const payload = {
        token,
        title,
        description,
        questions
      };

      const res = await fetch(`${baseUrl}/quiz/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create quiz');

      // Success
      alert('Quiz created successfully!');
      navigate(`/mentor/quizzes/${data.quiz_id}/results`);
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
        <div className="w-full max-w-4xl p-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500 mb-8">
            Create New Quiz
          </h1>
          
          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg space-y-4">
              <div>
                <label className="block text-zinc-100 text-sm font-bold mb-2">Quiz Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Intro to Data Structures"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-zinc-100 text-sm font-bold mb-2">Description (Optional)</label>
                <textarea
                  placeholder="Instructions for mentees..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                ></textarea>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold border-b border-zinc-800 pb-2">Questions</h2>
              {questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg relative">
                  <div className="absolute top-4 right-4 text-zinc-500 text-sm font-bold">
                    Q{qIndex + 1}
                  </div>
                  <div className="mb-4 pr-8">
                    <label className="block text-zinc-300 text-sm font-bold mb-2">Question Text</label>
                    <textarea
                      required
                      placeholder="Enter question text here..."
                      value={q.question_text}
                      onChange={(e) => updateQuestion(qIndex, 'question_text', e.target.value)}
                      rows="2"
                      className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {['a', 'b', 'c', 'd'].map((opt) => (
                      <div key={opt}>
                        <label className="block text-zinc-400 text-xs font-bold mb-1 uppercase">Option {opt}</label>
                        <input
                          type="text"
                          required
                          placeholder={`Option ${opt.toUpperCase()} text`}
                          value={q[`option_${opt}`]}
                          onChange={(e) => updateQuestion(qIndex, `option_${opt}`, e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-2">
                      <label className="text-zinc-300 text-sm font-bold">Correct Option:</label>
                      <select
                        value={q.correct_option}
                        onChange={(e) => updateQuestion(qIndex, 'correct_option', e.target.value)}
                        className="bg-zinc-800 text-white border border-zinc-700 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                      >
                        <option value="a">Option A</option>
                        <option value="b">Option B</option>
                        <option value="c">Option C</option>
                        <option value="d">Option D</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-zinc-300 text-sm font-bold">Marks:</label>
                      <input
                        type="number"
                        min="1"
                        value={q.marks}
                        onChange={(e) => updateQuestion(qIndex, 'marks', e.target.value)}
                        className="w-20 bg-zinc-800 text-white border border-zinc-700 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="flex items-center gap-1 text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded transition-colors text-sm"
                      >
                        <AiOutlineDelete /> Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-lg font-bold transition-all w-full justify-center border border-zinc-700"
              >
                <AiOutlinePlus /> Add Question
              </button>
            </div>

            <button
              type="submit"
              disabled={calling}
              className={`w-full py-3 px-4 bg-green-500 hover:bg-green-400 text-zinc-950 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] ${calling ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {calling ? 'Creating Quiz...' : 'Publish Quiz'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorQuizCreate;
