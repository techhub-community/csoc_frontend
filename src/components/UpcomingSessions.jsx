import React from 'react';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { sessionsData } from '../data/sessions';

const UpcomingSessions = () => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-lg h-full">
      <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
        <h3 className="text-xl font-bold">Upcoming Sessions</h3>
        <span className="text-xs bg-neon/10 text-neon px-2 py-1 rounded-full animate-pulse border border-neon/20">
          Live Mentorship
        </span>
      </div>
      
      {sessionsData.length === 0 ? (
        <p className="text-zinc-500 text-sm italic py-4 text-center">No sessions scheduled yet.</p>
      ) : (
        <div className="space-y-4">
          {sessionsData.map((session) => (
            <div key={session.id} className="group relative bg-zinc-950 p-4 rounded-xl border border-zinc-800 hover:border-neon/30 transition-all duration-300">
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-2 h-2 bg-neon rounded-full animate-ping"></div>
              </div>
              
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg group-hover:text-neon transition-colors">
                    {session.title}
                  </h4>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-zinc-400">
                    <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                      <AiOutlineCalendar className="text-neon" />
                      <span>{session.date}, {session.day}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                      <AiOutlineClockCircle className="text-neon" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 font-medium">Mentor: {session.mentor}</span>
                    {/* <button className="text-xs bg-neon text-black font-bold px-3 py-1.5 rounded-lg hover:scale-105 active:scale-95 transition-transform">
                      Join Link
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;
