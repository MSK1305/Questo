import { useState } from "react";
import {
  sortedByIntelligenceDesc,
  sortedBySpiritDesc,
  sortedByEnduranceDesc,
  sortedByStaminaDesc,
  sortedByLevelDesc,
  sortedByStrength,
  hardcodedUser,
  checkUser,
} from "./userData";

const sortedData = {
  level: sortedByLevelDesc,
  strength: sortedByStrength,
  stamina: sortedByStaminaDesc,
  endurance: sortedByEnduranceDesc,
  spirit: sortedBySpiritDesc,
  intelligence: sortedByIntelligenceDesc,
};

const Leaderboard = () => {
  const [sortCategory, setSortCategory] = useState("level");
  const [visibleCount, setVisibleCount] = useState(10);

  const currentSortedList = sortedData[sortCategory];
  const isUserInTop50 = checkUser[sortCategory];

  const displayedUsers = currentSortedList.slice(0, Math.min(visibleCount, 50));

  const maxLimitReached =
    visibleCount >= 50 || visibleCount >= currentSortedList.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, 50));
  };

  const handleViewProfile = (username) => {
    console.log(`View profile for: ${username}`);
  };

  return (
    <div className="leaderboard-display flex flex-col items-center w-full p-6 text-foreground bg-background min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>

      {/* Sort Dropdown */}
      <div className="w-full max-w-xl flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="text-sm font-medium text-muted-foreground"
          >
            Sort by:
          </label>

          <select
            id="sort-select"
            value={sortCategory}
            onChange={(e) => {
              setSortCategory(e.target.value);
              setVisibleCount(10);
            }}
            className="px-3 py-1.5 border border-border rounded-md bg-card text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="level">Level</option>
            <option value="strength">Strength</option>
            <option value="stamina">Stamina</option>
            <option value="endurance">Endurance</option>
            <option value="spirit">Spirit</option>
            <option value="intelligence">Intelligence</option>
          </select>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-xl flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          {displayedUsers.map((user, index) => {
            const isCurrentUser =
              isUserInTop50 && user.username === hardcodedUser.username;

            return (
              <div
                key={user.username}
                className={`rounded-xl p-4 shadow-md flex items-center justify-between border-2 transition-all ${
                  isCurrentUser
                    ? "bg-accent/15 border-accent shadow-accent/20 ring-4 ring-accent/25"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-extrabold text-lg w-6 ${
                      isCurrentUser ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    #{index + 1}
                  </span>

                  <span
                    className={`font-bold ${
                      isCurrentUser ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {user.username}
                    {isCurrentUser && (
                      <span className="ml-2.5 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded-full shadow-xs">
                        You
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-muted-foreground font-medium capitalize text-sm">
                    {sortCategory}:{" "}
                    <span className="text-foreground font-bold">
                      {user[sortCategory]}
                    </span>
                  </div>

                  <button
                    onClick={() => handleViewProfile(user.username)}
                    className="px-3.5 py-1.5 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:opacity-90 transition-opacity shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {!maxLimitReached && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/80 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Load More
            </button>
          </div>
        )}

        {/* User Card (only when not in Top 50) */}
        {!isUserInTop50 && (
          <div className="mt-8 pt-6 border-t-2 border-dashed border-border">
            <div className="bg-accent/15 border-2 border-accent rounded-xl p-4 shadow-md ring-4 ring-accent/25 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-bold text-foreground">
                  {hardcodedUser.username}
                  <span className="ml-2.5 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded-full shadow-xs">
                    You
                  </span>
                </span>
              </div>

              <div className="text-muted-foreground font-medium capitalize text-sm">
                {sortCategory}:{" "}
                <span className="text-foreground font-bold">
                  {hardcodedUser[sortCategory]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
