// src/components/QuestLog.js
import { useState } from "react";
import { CalendarDays, Search } from "lucide-react";
import { dummyData } from "../../dummydata";

const QuestLog = () => {
  const [selectedLog, setSelectedLog] = useState("issued");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [visibleCards, setVisibleCards] = useState(6);
  const [selectedCard, setSelectedCard] = useState(null);

  const questOptions = [
    { id: "issued-quest", value: "issued", label: "Issued Quest" },
    { id: "missed-quest", value: "missed", label: "Missed Quest" },
    { id: "completed-quest", value: "completed", label: "Completed Quest" },
    { id: "progress-quest", value: "progress", label: "Progress" },
  ];

  const handleLogChange = (event) => {
    setSelectedLog(event.target.value);
    setVisibleCards(6); // Reset visible cards when tab changes
    setSelectedCard(null); // Reset selected card when switching tabs
  };

  const handleCardClick = (card) => {
    setSelectedCard(selectedCard === card ? null : card);
  };

  const handleAction = (action, card) => {
    console.log(
      `${action} clicked for ${card.taskName || card.achievementName}`,
    );
    // Implement actual action handling here
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedQuery(searchQuery);
    setVisibleCards(6);
  };

  const loadMore = () => {
    setVisibleCards(visibleCards + 6);
  };

  // Get base data for current log and filter by applied search query
  const rawData = dummyData[selectedLog] || [];
  const filteredData = rawData.filter((item) => {
    const name = item.taskName || item.achievementName || "";
    return name.toLowerCase().includes(appliedQuery.toLowerCase());
  });

  const displayedData = filteredData.slice(0, visibleCards);

  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-lg w-full max-w-5xl mx-auto">
      {/* Top control bar: Selection buttons and search bar on the far right */}
      <div className="flex flex-row flex-wrap items-center justify-between gap-3 pb-3">
        {/* Selection Option Buttons */}
        <div className="flex flex-row items-center gap-2">
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
        </div>

        {/* Search Bar on the Right */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-300 w-full max-w-xs ml-2"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search task..."
            className="px-4 py-2 bg-transparent text-slate-200 placeholder-slate-400 text-sm font-medium focus:outline-none flex-1 min-w-0"
          />

          <div className="flex items-center gap-1.5 px-3 py-2 border-l border-slate-700 text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-700/50 transition-colors shrink-0">
            <CalendarDays className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline text-xs text-slate-300">
              Date
            </span>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shrink-0 border-l border-slate-700"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Grid Display (Two cards in a row) */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {displayedData.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-slate-600"
            onClick={() => handleCardClick(item)}
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-slate-200 text-lg font-medium">
                  {item.taskName || item.achievementName}
                </h3>
                {item.campaignInfo && (
                  <span className="bg-slate-700 text-slate-300 px-2 py-1 text-sm rounded">
                    Campaign {item.campaignInfo}
                  </span>
                )}
              </div>

              <div className="text-slate-300 text-sm">
                <span>Difficulty: {item.difficulty}</span>
                <span className="ml-4">EXP: {item.EXP}</span>
                <span className="ml-4">Due Date: {item.dueDate}</span>
              </div>
            </div>

            {selectedCard === item && (
              <div className="mt-4 flex justify-end gap-2">
                {selectedLog === "issued" ? (
                  <>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("Edit", item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("Delete", item);
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : selectedLog === "progress" ? (
                  <>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("Edit", item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("Delete", item);
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : selectedLog === "missed" ? (
                  <>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("Cancel", item);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction("Reissue", item);
                      }}
                    >
                      Reissue
                    </button>
                  </>
                ) : selectedLog === "completed" ? (
                  <button
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("Re-issue", item);
                    }}
                  >
                    Re-issue
                  </button>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Center-aligned Load More button */}
      {filteredData.length > visibleCards && (
        <div className="flex justify-center mt-6 w-full">
          <button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded transition-colors font-medium"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestLog;
