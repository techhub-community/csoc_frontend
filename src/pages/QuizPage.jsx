import React, { useState, useEffect } from 'react';
import useAuthStore from '../hooks/useAuthStore';
import useLocalStorage from '../hooks/useLocalStorage';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { baseUrl } from '../data/consts';

export default function QuizPage() {
  const { role } = useAuthStore();
  const [token] = useLocalStorage('token', null);
  const [calling, setCalling] = useState(false);
  
  // Mentor Form State
  const [isCreating, setIsCreating] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' }
  ]);

  // Shared List State
  const [quizzes, setQuizzes] = useState([]);

  // Mentee Attempt State
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    if (token) fetchQuizzes();
  }, [token]);

  const fetchQuizzes = async () => {
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/quiz/list?token=${token}`);
      const data = await res.json();
      if (res.ok) {
        setQuizzes(data.quizzes || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  // Mentor Actions
  const handleAddQuestion = () => {
    setQuestions([...questions, { question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' }]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleCreateSubmit = async () => {
    if (!quizTitle.trim()) { alert("Title is required"); return; }
    for (const q of questions) {
      if (!q.question_text || !q.option_a || !q.option_b || !q.option_c || !q.option_d) {
        alert("All question fields must be filled");
        return;
      }
    }
    
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/quiz/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, title: quizTitle, questions })
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); return; }
      setIsCreating(false);
      setQuizTitle('');
      setQuestions([{ question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' }]);
      fetchQuizzes();
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  const handleDeleteQuiz = async (quiz_id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/quiz/${quiz_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      if (res.ok) fetchQuizzes();
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  // Mentee Actions
  const handleStartQuiz = async (quiz) => {
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/quiz/${quiz.quiz_id}/questions?token=${token}`);
      const data = await res.json();
      if (res.ok) {
        setActiveQuiz(quiz);
        setQuizQuestions(data.questions || []);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setQuizResult(null);
      } else {
        alert(data.error || "Failed to start quiz");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  const handleAnswerSelect = (option) => {
    const qid = quizQuestions[currentQuestionIndex].question_id;
    setAnswers({ ...answers, [qid]: option });
  };

  const handleNextQuestion = () => {
    const qid = quizQuestions[currentQuestionIndex].question_id;
    if (!answers[qid]) { alert("Please select an answer"); return; }
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleSubmitQuiz = async () => {
    const qid = quizQuestions[currentQuestionIndex].question_id;
    if (!answers[qid]) { alert("Please select an answer"); return; }
    try {
      setCalling(true);
      const res = await fetch(`${baseUrl}/quiz/${activeQuiz.quiz_id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, answers })
      });
      const data = await res.json();
      if (res.ok) {
        setQuizResult(data);
        fetchQuizzes(); // Refresh list to mark as attempted
      } else {
        alert(data.error || "Failed to submit quiz");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCalling(false);
    }
  };

  const renderMentorForm = () => (
    <div className="bg-zinc-900 shadow-lg rounded-lg p-6 mb-8 mt-4 border border-zinc-800">
      <h2 className="text-xl font-bold text-white mb-4">Create New Quiz</h2>
      <div className="mb-4">
        <label className="block text-zinc-100 text-sm font-bold mb-2">Quiz Title</label>
        <input 
          type="text" 
          value={quizTitle} 
          onChange={e => setQuizTitle(e.target.value)} 
          className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
        />
      </div>
      
      {questions.map((q, idx) => (
        <div key={idx} className="mb-6 p-4 border border-zinc-700 rounded-md bg-zinc-950">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Question {idx + 1}</h3>
            <button 
              disabled={questions.length <= 1}
              onClick={() => handleRemoveQuestion(idx)}
              className="py-1 px-3 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white disabled:opacity-50"
            >
              Remove
            </button>
          </div>
          <div className="mb-3">
            <label className="block text-zinc-300 text-xs mb-1">Question Text</label>
            <textarea 
              rows="3"
              value={q.question_text} 
              onChange={e => handleQuestionChange(idx, 'question_text', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-300 text-xs mb-1">Option A</label>
              <input type="text" value={q.option_a} onChange={e => handleQuestionChange(idx, 'option_a', e.target.value)} className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md" />
            </div>
            <div>
              <label className="block text-zinc-300 text-xs mb-1">Option B</label>
              <input type="text" value={q.option_b} onChange={e => handleQuestionChange(idx, 'option_b', e.target.value)} className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md" />
            </div>
            <div>
              <label className="block text-zinc-300 text-xs mb-1">Option C</label>
              <input type="text" value={q.option_c} onChange={e => handleQuestionChange(idx, 'option_c', e.target.value)} className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md" />
            </div>
            <div>
              <label className="block text-zinc-300 text-xs mb-1">Option D</label>
              <input type="text" value={q.option_d} onChange={e => handleQuestionChange(idx, 'option_d', e.target.value)} className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md" />
            </div>
          </div>
          <div className="mt-3">
            <label className="block text-zinc-300 text-xs mb-1">Correct Answer</label>
            <select 
              value={q.correct_option}
              onChange={e => handleQuestionChange(idx, 'correct_option', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button onClick={handleAddQuestion} className="w-full py-2 px-4 border border-zinc-500 text-zinc-300 rounded-md hover:bg-zinc-800">Add Question</button>
        <button disabled={calling} onClick={handleCreateSubmit} className="w-full py-2 px-4 border border-green-500 text-green-500 rounded-md hover:bg-green-600 hover:text-white">Submit Quiz</button>
      </div>
    </div>
  );

  const renderActiveQuiz = () => {
    if (quizResult) {
      return (
        <div className="bg-zinc-900 shadow-lg rounded-lg p-6 max-w-3xl mx-auto border border-zinc-800 mt-8">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Quiz Results</h2>
          <div className="text-center mb-8">
            <p className="text-6xl font-bold text-green-500">{quizResult.score} <span className="text-2xl text-zinc-400">/ {quizResult.total}</span></p>
          </div>
          <div className="space-y-6">
            {quizResult.results?.map((res, i) => (
              <div key={i} className="p-4 bg-zinc-950 rounded-md border border-zinc-800">
                <p className="text-lg text-white mb-3 font-medium">{i + 1}. {res.question_text}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className={`p-2 rounded ${res.chosen === 'A' ? (res.chosen === res.correct ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-red-900/40 text-red-400 border border-red-800') : 'bg-zinc-800 text-zinc-400'}`}>A. {res.option_a}</div>
                  <div className={`p-2 rounded ${res.chosen === 'B' ? (res.chosen === res.correct ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-red-900/40 text-red-400 border border-red-800') : 'bg-zinc-800 text-zinc-400'}`}>B. {res.option_b}</div>
                  <div className={`p-2 rounded ${res.chosen === 'C' ? (res.chosen === res.correct ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-red-900/40 text-red-400 border border-red-800') : 'bg-zinc-800 text-zinc-400'}`}>C. {res.option_c}</div>
                  <div className={`p-2 rounded ${res.chosen === 'D' ? (res.chosen === res.correct ? 'bg-green-900/40 text-green-400 border border-green-800' : 'bg-red-900/40 text-red-400 border border-red-800') : 'bg-zinc-800 text-zinc-400'}`}>D. {res.option_d}</div>
                </div>
                {res.chosen !== res.correct && (
                  <p className="mt-2 text-sm text-green-400">Correct Answer: {res.correct}</p>
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={() => { setActiveQuiz(null); setQuizResult(null); }} 
            className="mt-8 w-full py-3 px-4 border border-zinc-500 text-zinc-300 rounded-md hover:bg-zinc-800"
          >
            Back to Quizzes
          </button>
        </div>
      );
    }

    if (quizQuestions.length > 0) {
      const q = quizQuestions[currentQuestionIndex];
      const selected = answers[q.question_id];
      const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
      
      return (
        <div className="bg-zinc-900 shadow-lg rounded-lg p-8 max-w-3xl mx-auto border border-zinc-800 mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{activeQuiz.title}</h2>
            <div className="flex justify-between text-zinc-400 text-sm mb-2">
              <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
              <span>{Math.round(progress)}% Completed</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl text-white mb-4 leading-relaxed">{q.question_text}</h3>
            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map(optKey => (
                <label 
                  key={optKey} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${selected === optKey ? 'border-green-500 bg-green-900/20' : 'border-zinc-700 bg-zinc-950 hover:bg-zinc-800'}`}
                >
                  <input 
                    type="radio" 
                    name={`q_${q.question_id}`} 
                    value={optKey} 
                    checked={selected === optKey} 
                    onChange={() => handleAnswerSelect(optKey)}
                    className="mr-3 w-4 h-4 text-green-500 focus:ring-green-500 bg-zinc-800 border-zinc-600"
                  />
                  <span className="text-white text-lg font-medium">{q[`option_${optKey.toLowerCase()}`]}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <button 
                onClick={handleNextQuestion} 
                className="py-2 px-8 bg-green-600 text-white rounded-md hover:bg-green-500 text-lg font-semibold"
              >
                Next
              </button>
            ) : (
              <button 
                disabled={calling}
                onClick={handleSubmitQuiz} 
                className="py-2 px-8 bg-green-600 text-white rounded-md hover:bg-green-500 text-lg font-semibold"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <NavBar />
      <div className="flex-grow container mx-auto px-4 py-24">
        
        {/* If Active Quiz is running, hide everything else */}
        {activeQuiz ? (
          renderActiveQuiz()
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-white">Quizzes</h1>
              {role === 'mentor' && (
                <button 
                  onClick={() => setIsCreating(!isCreating)} 
                  className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 shadow-lg"
                >
                  {isCreating ? 'Cancel' : 'Create Quiz'}
                </button>
              )}
            </div>

            {role === 'mentor' && isCreating && renderMentorForm()}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.length === 0 && !calling && (
                <div className="col-span-full text-center py-10 text-zinc-500">
                  <p className="text-lg">No quizzes available.</p>
                </div>
              )}
              {quizzes.map(quiz => (
                <div key={quiz.quiz_id} className="bg-zinc-900 border border-zinc-800 shadow-lg rounded-xl p-6 hover:border-zinc-700 transition duration-300">
                  <h3 className="text-xl font-bold text-white mb-2 truncate" title={quiz.title}>{quiz.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
                    <span className="bg-zinc-800 px-2 py-1 rounded">{quiz.questions_count} Questions</span>
                    <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {role === 'mentor' ? (
                      <button 
                        disabled={calling}
                        onClick={() => handleDeleteQuiz(quiz.quiz_id)} 
                        className="w-full py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition"
                      >
                        Delete Quiz
                      </button>
                    ) : (
                      quiz.attempted ? (
                        <span className="w-full block text-center py-2 bg-zinc-800 text-zinc-500 rounded-md font-medium">Attempted</span>
                      ) : (
                        <button 
                          disabled={calling}
                          onClick={() => handleStartQuiz(quiz)} 
                          className="w-full py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-600 hover:text-white transition"
                        >
                          Start Quiz
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
