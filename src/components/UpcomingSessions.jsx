import React from 'react';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { sessionsData } from '../data/sessions';

const SessionCard = ({ session, completed = false }) => (
  <div className={`group relative bg-zinc-950 p-4 rounded-xl border transition-all duration-300 ${
    completed
      ? 'border-zinc-800 opacity-70'
      : 'border-zinc-800 hover:border-neon/30'
  }`}>
    {!completed && (
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-neon rounded-full animate-ping"></div>
      </div>
    )}

    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className={`font-bold text-lg transition-colors ${
            completed ? 'text-zinc-400 line-through' : 'text-white group-hover:text-neon'
          }`}>
            {session.title}
          </h4>
          {completed && (
            <AiOutlineCheckCircle className="text-green-500 shrink-0" size={16} />
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-zinc-400">
          <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
            <AiOutlineCalendar className={completed ? 'text-zinc-500' : 'text-neon'} />
            <span>{session.date}, {session.day}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
            <AiOutlineClockCircle className={completed ? 'text-zinc-500' : 'text-neon'} />
            <span>{session.time}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-medium">Mentor: {session.mentor}</span>
          {session.meetLink && (
            <a
              href={session.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-bold px-3 py-1.5 rounded-lg hover:scale-105 active:scale-95 transition-transform inline-block ${
                completed
                  ? 'bg-zinc-700 text-zinc-300'
                  : 'bg-neon text-black'
              }`}
            >
              {completed ? 'Recording' : 'Join Link'}
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

const UpcomingSessions = () => {
  const upcoming = sessionsData.filter(s => s.status !== 'Completed');
  const completed = sessionsData.filter(s => s.status === 'Completed');

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg h-full space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 className="text-xl font-bold">Sessions</h3>
        <span className="text-xs bg-neon/10 text-neon px-2 py-1 rounded-full animate-pulse border border-neon/20">
          Live Mentorship
        </span>
      </div>

      {/* Upcoming */}
      <div>
        <p className="text-xs font-semibold text-neon uppercase tracking-widest mb-3">Upcoming</p>
        {upcoming.length === 0 ? (
          <p className="text-zinc-500 text-sm italic py-2 text-center">No upcoming sessions.</p>
        ) : (
          <div className="space-y-4">
            {upcoming.map(s => <SessionCard key={s.id} session={s} />)}
          </div>
        )}
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Completed</p>
          <div className="space-y-4">
            {completed.map(s => <SessionCard key={s.id} session={s} completed />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;
