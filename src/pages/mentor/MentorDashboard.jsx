import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useAuthStore from '../../hooks/useAuthStore';
import useLocalStorage from '../../hooks/useLocalStorage';
import { baseUrl } from '../../data/consts';
import { Link } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi2';
import { MdOutlineBarChart } from 'react-icons/md';
import UpcomingSessions from '../../components/UpcomingSessions';

const DOMAIN_LABELS = {
  web:  'Web Development',
  app:  'App Development',
  dsa:  'DSA / CP',
  aiml: 'AI / ML',
  uiux: 'UI / UX',
};

const DOMAIN_ORDER = ['web', 'app', 'dsa', 'aiml', 'uiux'];

// ─── Mentee Registrations Widget ────────────────────────────────────────────

const RegistrationSkeleton = () => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg animate-pulse mb-8">
    <div className="h-5 w-48 bg-zinc-800 rounded mb-6" />
    {/* highlight card skeleton */}
    <div className="h-24 bg-zinc-800 rounded-xl mb-6" />
    {/* domain rows */}
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-4 w-28 bg-zinc-800 rounded" />
          <div className="flex-1 h-2 bg-zinc-800 rounded-full" />
          <div className="h-4 w-8 bg-zinc-800 rounded" />
        </div>
      ))}
    </div>
    <div className="mt-4 h-4 w-36 bg-zinc-800 rounded" />
  </div>
);

const MenteeRegistrations = ({ token }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    const fetchStats = async () => {
      try {
        const res = await fetch(`${baseUrl}/mentor/dashboard?token=${token}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError('Could not load mentee registration data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  if (loading) return <RegistrationSkeleton />;

  if (error) {
    return (
      <div className="p-4 mb-8 text-sm text-amber-400 bg-amber-900/20 border border-amber-500/30 rounded-xl flex items-center gap-3">
        <MdOutlineBarChart size={20} className="shrink-0" />
        {error}
      </div>
    );
  }

  if (!stats) return null;

  const { mentor_domain, my_domain_count, domain_counts, total_mentees } = stats;
  const myLabel = DOMAIN_LABELS[mentor_domain] ?? mentor_domain;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg mb-8 relative overflow-hidden">
      {/* subtle bg icon */}
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none select-none">
        <HiUserGroup size={100} className="text-neon" />
      </div>

      <h2 className="text-lg font-bold text-zinc-200 mb-5 flex items-center gap-2">
        <HiUserGroup className="text-neon" size={20} />
        Mentee Registrations
      </h2>

      {/* ── Highlight Card ── */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4
                      bg-gradient-to-br from-zinc-950 to-zinc-900
                      border border-neon/30 rounded-xl px-6 py-5 mb-6
                      shadow-[0_0_24px_rgba(57,255,20,0.07)]">
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1 font-semibold">
            Mentees in your domain
          </p>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-400">
            {myLabel}
          </p>
        </div>
        <div className="text-right">
          <span className="text-6xl font-black text-white leading-none">
            {my_domain_count}
          </span>
          <p className="text-zinc-500 text-xs mt-1">registered</p>
        </div>
        {/* glow line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      </div>

      {/* ── Domain Breakdown ── */}
      <div className="space-y-3">
        {DOMAIN_ORDER.map((key) => {
          const count  = domain_counts[key] ?? 0;
          const pct    = total_mentees > 0 ? (count / total_mentees) * 100 : 0;
          const isOwn  = key === mentor_domain;

          return (
            <div
              key={key}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${isOwn ? 'bg-neon/5 border border-neon/20' : 'border border-transparent hover:bg-zinc-800/40'}`}
            >
              {/* domain label */}
              <span className={`w-36 text-sm font-semibold shrink-0
                ${isOwn ? 'text-neon' : 'text-zinc-400'}`}>
                {DOMAIN_LABELS[key]}
              </span>

              {/* progress bar */}
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700
                    ${isOwn
                      ? 'bg-gradient-to-r from-neon to-green-400 shadow-[0_0_6px_rgba(57,255,20,0.5)]'
                      : 'bg-zinc-600'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* count */}
              <span className={`w-8 text-right text-sm font-bold shrink-0
                ${isOwn ? 'text-neon' : 'text-zinc-300'}`}>
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Total ── */}
      <div className="mt-5 pt-4 border-t border-zinc-800 flex justify-between items-center">
        <span className="text-zinc-500 text-sm">Total mentees across all domains</span>
        <span className="text-white font-black text-xl">{total_mentees}</span>
      </div>
    </div>
  );
};

// ─── Main Dashboard ─────────────────────────────────────────────────────────

const MentorDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [quizRes, assignRes] = await Promise.all([
          fetch(`${baseUrl}/quiz/list?token=${token}`),
          fetch(`${baseUrl}/assignment/list?token=${token}`)
        ]);
        
        if (quizRes.ok) {
          const quizData = await quizRes.json();
          setQuizzes(quizData);
        }
        
        if (assignRes.ok) {
          const assignData = await assignRes.json();
          setAssignments(assignData);
        }
      } catch (err) {
        setError("Failed to load dashboard data. Please check your connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-24 sm:pt-32 pb-10 bg-zinc-950 text-white flex justify-center">
        <div className="w-full max-w-5xl p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-500">
                Mentor Dashboard
              </h1>
              <p className="text-zinc-400 mt-2 text-sm sm:text-base">Manage your quizzes and assignments</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/mentor/quizzes/create"
                className="flex items-center gap-2 bg-neon hover:bg-green-400 text-zinc-950 px-4 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)] text-sm"
              >
                <CiCirclePlus size={18} className="font-bold"/> Create Quiz
              </Link>
              <Link 
                to="/mentor/assignments/create"
                className="flex items-center gap-2 bg-neon hover:bg-green-400 text-zinc-950 px-4 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)] text-sm"
              >
                <CiCirclePlus size={18} className="font-bold"/> Create Assignment
              </Link>
            </div>
          </div>
          
          {error && (
            <div className="p-4 mb-6 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg shadow-lg">
              {error}
            </div>
          )}

          {/* ── Mentee Registrations ── */}
          <MenteeRegistrations token={token} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Overview Card 1 */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AiOutlineUnorderedList size={80} className="text-neon" />
              </div>
              <h2 className="text-zinc-400 text-xl font-semibold mb-2">Total Quizzes</h2>
              <p className="text-5xl font-black text-white">
                {loading ? "..." : quizzes.length}
              </p>
              <div className="mt-6">
                <Link to="/mentor/quizzes" className="text-green-500 hover:text-green-400 text-sm font-semibold flex items-center gap-1">
                  View all quizzes →
                </Link>
              </div>
            </div>

            {/* Overview Card 2 */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AiOutlineUnorderedList size={80} className="text-neon" />
              </div>
              <h2 className="text-zinc-400 text-xl font-semibold mb-2">Total Assignments</h2>
              <p className="text-5xl font-black text-white">
                {loading ? "..." : assignments.length}
              </p>
              <div className="mt-6">
                <Link to="/mentor/assignments" className="text-green-500 hover:text-green-400 text-sm font-semibold flex items-center gap-1">
                  View all assignments →
                </Link>
              </div>
            </div>

          <div className="mb-8">
            <UpcomingSessions />
          </div>
          </div>

          {!loading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Quizzes */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Recent Quizzes</h3>
                {quizzes.length === 0 ? (
                  <p className="text-zinc-500 text-sm italic">No quizzes created yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {quizzes.slice(0, 3).map((q) => (
                      <li key={q.quiz_id} className="flex justify-between items-center bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                        <div>
                          <p className="font-semibold text-zinc-200">{q.title}</p>
                          <p className="text-xs text-zinc-500 mt-1">{q.question_count} questions</p>
                        </div>
                        <Link to={`/mentor/quizzes/${q.quiz_id}/results`} className="text-green-500 hover:text-green-400 text-sm border border-green-500/30 px-3 py-1 rounded">
                          Results
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Recent Assignments */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-4 border-b border-zinc-800 pb-2">Recent Assignments</h3>
                {assignments.length === 0 ? (
                  <p className="text-zinc-500 text-sm italic">No assignments created yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {assignments.slice(0, 3).map((a) => (
                      <li key={a.assignment_id} className="flex justify-between items-center bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                        <div>
                          <p className="font-semibold text-zinc-200">{a.title}</p>
                          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{a.description}</p>
                        </div>
                        <Link to={`/mentor/assignments/${a.assignment_id}/submissions`} className="text-green-500 hover:text-green-400 text-sm border border-green-500/30 px-3 py-1 rounded whitespace-nowrap">
                          Submissions
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentorDashboard;
