import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { useParams, useNavigate } from 'react-router-dom';

const MenteeQuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [token] = useLocalStorage("token", null);
  
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${baseUrl}/quiz/${quizId}/questions?token=${token}`);
        if (!res.ok) throw new Error("Failed to load quiz questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchQuestions();
  }, [quizId, token]);

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      if (!window.confirm("You have unanswered questions. Are you sure you want to submit?")) {
        return;
      }
    }

    setSubmitting(true);
    setError("");

    try {
      // API expects questions: [{question_id, selected_option}]
      const payload = {
        token,
        answers: Object.entries(answers).map(([qId, opt]) => ({
          question_id: parseInt(qId),
          selected_option: opt
        }))
      };

      const res = await fetch(`${baseUrl}/quiz/${quizId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit quiz");

      navigate(`/mentee/quizzes/${quizId}/result`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center items-center">
          <p className="text-zinc-500 animate-pulse text-xl">Loading Quiz...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-4xl p-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
              Quiz Attempt
            </h1>
            <p className="text-zinc-400 mt-2">Answer all questions before submitting.</p>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          <div className="space-y-8 mb-8">
            {questions.map((q, index) => (
              <div key={q.question_id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold text-white mb-4">
                  <span className="text-zinc-500 mr-2">{index + 1}.</span> 
                  {q.question_text}
                </h3>
                <div className="space-y-3 pl-6">
                  {['a', 'b', 'c', 'd'].map(opt => (
                    <label 
                      key={opt} 
                      className={`block p-3 rounded-lg border cursor-pointer transition-colors ${
                        answers[q.question_id] === opt 
                          ? 'bg-green-900/20 border-green-500 text-white' 
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`question-${q.question_id}`}
                          value={opt}
                          checked={answers[q.question_id] === opt}
                          onChange={() => handleOptionSelect(q.question_id, opt)}
                          className="w-4 h-4 text-green-500 bg-zinc-800 border-zinc-700 focus:ring-green-500 focus:ring-2"
                        />
                        <span className="font-semibold uppercase w-6 text-zinc-500">{opt})</span>
                        <span>{q[`option_${opt}`]}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-zinc-800 pt-6">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`py-3 px-8 bg-green-500 hover:bg-green-400 text-zinc-950 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(57,255,20,0.3)] ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Submitting...' : 'Submit Final Answers'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenteeQuizAttempt;
