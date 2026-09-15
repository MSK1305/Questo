import { useState } from "react";
import { CalendarDays, Search } from "lucide-react";

const QuestLog = () => {
  const [selectedLog, setSelectedLog] = useState("issued");

  const handleLogChange = (event) => {
    setSelectedLog(event.target.value);
  };

  const questOptions = [
    { id: "issued-quest", value: "issued", label: "Issued Quest" },
    { id: "missed-quest", value: "missed", label: "Missed Quest" },
    { id: "completed-quest", value: "completed", label: "Completed Quest" },
    { id: "progress-quest", value: "progress", label: "Progress" },
    { id: "achievement-quest", value: "achievement", label: "Achievement" },
  ];

  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-lg inline-block">
      <form className="flex flex-row flex-wrap items-center gap-3">
        {questOptions.map((option) => (
          <div key={option.value} className="relative">
            <input
              type="radio"
              name="log"
              value={option.value}
              id={option.id}
              checked={selectedLog === option.value}
              onChange={handleLogChange}
              className="sr-only peer"
            />
            <label
              htmlFor={option.id}
              className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all duration-300 inline-block
                ${
                  selectedLog === option.value
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md scale-105"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:border-indigo-400 hover:scale-105"
                }`}
            >
              {option.label}
            </label>
          </div>
        ))}

        {/* Merged Search Bar, Date Picker, and Search Button */}
        <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-300">
          {/* Text Input */}
          <input
            type="text"
            placeholder="Search task..."
            className="px-3 py-2 bg-transparent text-slate-200 placeholder-slate-400 text-sm font-medium focus:outline-none w-36 sm:w-44"
          />

          {/* Date Picker Section */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-l border-slate-700 text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-700/50 transition-colors">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-300">Date</span>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestLog;
