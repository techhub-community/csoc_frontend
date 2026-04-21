import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const MenteeQuizResult = () => {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // Simulate an API call to fetch quiz results since backend endpoint is pending
    const loadDummyData = () => {
      setTimeout(() => {
        setResultData({
          total_score: 8,
          max_score: 10,
          questions: [
            {
              question_id: 1,
              question_text: "What does HTML stand for?",
              option_a: "Hyper Text Markup Language",
              option_b: "High Text Markup Language",
              option_c: "Hyper Tabular Markup Language",
              option_d: "None of these",
              selected_option: "a",
              correct_option: "a",
              is_correct: true
            },
            {
              question_id: 2,
              question_text: "Which property is used to change the background color in CSS?",
              option_a: "color",
              option_b: "bgcolor",
              option_c: "background-color",
              option_d: "bg-color",
              selected_option: "b",
              correct_option: "c",
              is_correct: false
            }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    loadDummyData();
  }, [quizId]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center items-center">
          <p className="text-zinc-500 animate-pulse text-xl">Loading Result...</p>
        </div>
        <Footer />
      </>
    );
  }

  const percentage = (resultData.total_score / resultData.max_score) * 100;

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-4xl p-4">
          <Link to="/mentee/quizzes" className="flex items-center text-zinc-400 hover:text-white mb-6 w-fit transition-colors">
            <IoArrowBack className="mr-2" /> Back to Quizzes
          </Link>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg mb-8 text-center flex flex-col items-center">
            <h1 className="text-3xl font-bold text-white mb-6">Quiz Results</h1>
            
            <div className="relative w-40 h-40 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-zinc-800"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className={percentage >= 50 ? "text-green-500" : "text-red-500"}
                  strokeDasharray={`${percentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute text-4xl font-black">
                {resultData.total_score}<span className="text-xl text-zinc-500">/{resultData.max_score}</span>
              </div>
            </div>

            <p className="text-zinc-400">
              {percentage >= 80 ? "Excellent work!" : percentage >= 50 ? "Good job! You passed." : "Keep practicing, you'll get it next time!"}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-800 pb-2">Detailed Review</h2>
            {resultData.questions.map((q, index) => (
              <div key={q.question_id} className={`p-6 rounded-xl border ${q.is_correct ? 'bg-green-900/10 border-green-900/50' : 'bg-red-900/10 border-red-900/50'}`}>
                <div className="flex gap-4">
                  <div className="mt-1">
                    {q.is_correct ? (
                      <AiOutlineCheckCircle size={24} className="text-green-500" />
                    ) : (
                      <AiOutlineCloseCircle size={24} className="text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-4">
                      {index + 1}. {q.question_text}
                    </h3>
                    <div className="space-y-2">
                      {['a', 'b', 'c', 'd'].map(opt => {
                        let rowClass = "p-3 rounded-lg border text-sm transition-colors flex items-center justify-between";
                        
                        if (q.correct_option === opt && q.selected_option === opt) {
                          rowClass += " bg-green-500/20 border-green-500 text-white"; // Selected & Correct
                        } else if (q.correct_option === opt) {
                          rowClass += " bg-zinc-800 border-green-500 text-green-400"; // Missed Correct Option
                        } else if (q.selected_option === opt) {
                          rowClass += " bg-red-500/20 border-red-500 text-white"; // Selected & Wrong
                        } else {
                          rowClass += " bg-zinc-950 border-zinc-800 text-zinc-400"; // Default
                        }

                        return (
                          <div key={opt} className={rowClass}>
                            <div className="flex gap-3">
                              <span className="uppercase font-bold opacity-50">{opt})</span>
                              <span>{q[`option_${opt}`]}</span>
                            </div>
                            {q.correct_option === opt && <span className="text-xs font-bold uppercase tracking-wider opacity-70">Correct Answer</span>}
                            {(q.selected_option === opt && q.correct_option !== opt) && <span className="text-xs font-bold uppercase tracking-wider opacity-70">Your Answer</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenteeQuizResult;
