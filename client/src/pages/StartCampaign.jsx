import { useState } from "react";
import {
  Plus,
  ArrowLeft,
  CalendarDays,
  FolderOpenDot,
  Edit2,
  Trash2,
} from "lucide-react";

// --- 1. Difficulty Selector Component ---
export const DifficultySelect = ({ value, onChange, name = "difficulty" }) => {
  return (
    <div className="flex items-center bg-card border border-border px-3 py-1.5 rounded-full shadow-xs hover:border-primary/50 hover:bg-muted/30 transition-all">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="outline-none bg-transparent text-xs cursor-pointer font-medium text-foreground px-1 w-full"
      >
        <option value="easy" className="bg-card text-foreground">
          🟢 Easy
        </option>
        <option value="medium" className="bg-card text-foreground">
          🟡 Medium
        </option>
        <option value="hard" className="bg-card text-foreground">
          🔴 Hard
        </option>
      </select>
    </div>
  );
};

// --- 2. Quest Card Component ---
export const QuestCard = ({
  quest,
  selectedCardId,
  setSelectedCardId,
  handleEdit,
  handleDelete,
}) => {
  const getDifficultyBadge = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy":
        return "text-success bg-success/15 border-success/30 font-semibold";
      case "medium":
        return "text-warning bg-warning/15 border-warning/30 font-semibold";
      case "hard":
        return "text-destructive bg-destructive/15 border-destructive/30 font-semibold";
      default:
        return "text-foreground bg-muted border-border font-semibold";
    }
  };

  return (
    <div
      onClick={() =>
        setSelectedCardId(selectedCardId === quest.id ? null : quest.id)
      }
      className="group bg-card text-card-foreground p-4 rounded-xl shadow-sm border border-border cursor-pointer hover:shadow-md hover:border-primary/40 transition-all duration-200 flex flex-col justify-between relative h-40 text-left"
    >
      <div className="space-y-1">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-base text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-2">
            {quest.task || "Untitled Quest"}
          </h3>
          <span className="text-xs font-semibold text-foreground bg-secondary px-2.5 py-1 rounded-md shrink-0 border border-border">
            {quest.date || "No Date"}
          </span>
        </div>

        {quest.campaign ? (
          <p className="text-xs pt-1 text-muted-foreground font-medium flex items-center gap-1.5">
            <FolderOpenDot className="w-3.5 h-3.5 text-primary/70" />
            {quest.campaign}
          </p>
        ) : (
          <div
            className="invisible text-xs pt-1 font-medium flex items-center gap-1.5 select-none"
            aria-hidden="true"
          >
            <FolderOpenDot className="w-3.5 h-3.5" />
            Placeholder
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pb-1 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-accent/20 text-accent border border-accent/40 shadow-xs">
            ⭐ +{quest.xp || 250} XP
          </span>
          <span
            className={`inline-block px-2.5 py-1 rounded-full text-xs border uppercase ${getDifficultyBadge(
              quest.difficulty,
            )}`}
          >
            {quest.difficulty || "easy"}
          </span>
        </div>

        {selectedCardId === quest.id && (
          <div
            className="flex items-center gap-1.5 animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {handleEdit && (
              <button
                type="button"
                onClick={() => handleEdit(quest)}
                className="p-1.5 text-xs bg-muted text-foreground rounded hover:bg-muted/80 border border-border transition"
                title="Edit Quest"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            {handleDelete && (
              <button
                type="button"
                onClick={() => handleDelete(quest.id)}
                className="p-1.5 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20 border border-destructive/20 transition"
                title="Delete Quest"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 3. Empty State Component ---
export const EmptyState = () => (
  <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-3">
    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      <FolderOpenDot className="w-6 h-6" />
    </div>
    <h3 className="text-sm font-semibold text-foreground">
      No Campaign Created Yet
    </h3>
    <p className="text-xs text-muted-foreground max-w-xs">
      Fill out the details below to initialize your first quest campaign and
      start tracking tasks.
    </p>
  </div>
);

// --- 4. Main Campaign Management Component ---
const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [tasks, setTasks] = useState([
    { task: "", difficulty: "easy", xp: "250", date: "" },
  ]);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { task: "", difficulty: "easy", xp: "250", date: "" }]);
  };

  const removeTaskField = (index) => {
    if (tasks.length === 1) return;
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const createCampaign = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Requirement 2: Validation check to prevent sending empty forms
    if (!campaignName.trim()) {
      setErrorMsg("Campaign name is required.");
      return;
    }

    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].task.trim()) {
        setErrorMsg(`Task #${i + 1} cannot be empty.`);
        return;
      }
      if (!tasks[i].date) {
        setErrorMsg(`Please specify a date for Task #${i + 1}.`);
        return;
      }
    }

    const newCampaign = {
      id: Date.now(),
      name: campaignName.trim(),
      tasks: tasks.map((task, index) => ({
        ...task,
        id: `task-${Date.now()}-${index}`,
        status: "Active",
        xp: parseInt(task.xp, 10) || 250,
      })),
      status: "Active",
    };

    setCampaigns((prev) => [...prev, newCampaign]);
    setActiveCampaign(newCampaign);
    setCampaignName("");
    setTasks([{ task: "", difficulty: "easy", xp: "250", date: "" }]);
    setCurrentPage(1);
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = activeCampaign.tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Completed" } : task,
    );
    const updatedCampaign = { ...activeCampaign, tasks: updatedTasks };
    setActiveCampaign(updatedCampaign);
    setCampaigns(
      campaigns.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c)),
    );
  };

  const handleCancelTask = (taskId) => {
    const updatedTasks = activeCampaign.tasks.map((task) =>
      task.id === taskId ? { ...task, status: "Cancelled" } : task,
    );
    const updatedCampaign = { ...activeCampaign, tasks: updatedTasks };
    setActiveCampaign(updatedCampaign);
    setCampaigns(
      campaigns.map((c) => (c.id === updatedCampaign.id ? updatedCampaign : c)),
    );
  };

  const getTaskCounts = () => {
    if (!activeCampaign)
      return {
        assigned: 0,
        completed: 0,
        easyCompleted: 0,
        mediumCompleted: 0,
        hardCompleted: 0,
        totalXp: 0,
      };
    const assigned = activeCampaign.tasks.length;
    const completed = activeCampaign.tasks.filter(
      (task) => task.status === "Completed",
    ).length;
    const easyCompleted = activeCampaign.tasks.filter(
      (task) =>
        task.difficulty?.toLowerCase() === "easy" &&
        task.status === "Completed",
    ).length;
    const mediumCompleted = activeCampaign.tasks.filter(
      (task) =>
        task.difficulty?.toLowerCase() === "medium" &&
        task.status === "Completed",
    ).length;
    const hardCompleted = activeCampaign.tasks.filter(
      (task) =>
        task.difficulty?.toLowerCase() === "hard" &&
        task.status === "Completed",
    ).length;
    const totalXp = activeCampaign.tasks.reduce(
      (total, task) =>
        total + (task.status === "Completed" ? parseInt(task.xp, 10) || 0 : 0),
      0,
    );
    return {
      assigned,
      completed,
      easyCompleted,
      mediumCompleted,
      hardCompleted,
      totalXp,
    };
  };

  const tasksPerPage = 6;
  const totalTasks = activeCampaign ? activeCampaign.tasks.length : 0;
  const pages = Math.ceil(totalTasks / tasksPerPage);
  const currentTasks = activeCampaign
    ? activeCampaign.tasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage,
      )
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-card text-card-foreground p-6 rounded-2xl border border-border shadow-xl">
        {activeCampaign ? (
          <div>
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setActiveCampaign(null)}
                className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Campaigns
              </button>
              <h1 className="text-2xl font-bold tracking-tight text-foreground text-center flex-1">
                {activeCampaign.name}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/15 text-success border border-success/30">
                {activeCampaign.status}
              </span>
            </div>

            {/* Campaign Summary Board */}
            <div className="bg-muted/40 rounded-xl p-4 mb-6 border border-border">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-4">
                <div className="bg-card p-3 rounded-lg border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">
                    Total Assigned
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {getTaskCounts().assigned}
                  </span>
                </div>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">
                    Completed
                  </span>
                  <span className="text-lg font-bold text-success">
                    {getTaskCounts().completed}
                  </span>
                </div>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <span className="block text-xs text-muted-foreground mb-1">
                    EXP Earned
                  </span>
                  <span className="text-lg font-bold text-accent">
                    {getTaskCounts().totalXp} XP
                  </span>
                </div>
                <div className="bg-card p-3 rounded-lg border border-border flex flex-col justify-center items-center">
                  <span className="block text-xs text-muted-foreground mb-1">
                    Difficulty Breakdown
                  </span>
                  <div className="flex gap-1.5 text-xs font-medium">
                    <span className="text-success" title="Easy">
                      🟢 {getTaskCounts().easyCompleted}
                    </span>
                    <span className="text-warning" title="Medium">
                      🟡 {getTaskCounts().mediumCompleted}
                    </span>
                    <span className="text-destructive" title="Hard">
                      🔴 {getTaskCounts().hardCompleted}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quest Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {currentTasks.map((task) => (
                <div key={task.id} className="flex flex-col gap-2">
                  <QuestCard
                    quest={{
                      ...task,
                      campaign: activeCampaign.name,
                    }}
                    selectedCardId={selectedCardId}
                    setSelectedCardId={setSelectedCardId}
                    handleEdit={null}
                    handleDelete={null}
                  />
                  {/* Action Buttons for Task Completion */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={task.status === "Completed"}
                      className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer shadow-xs ${
                        task.status === "Completed"
                          ? "bg-success/20 text-success cursor-not-allowed border border-success/30"
                          : "bg-success text-success-foreground hover:bg-success/90"
                      }`}
                    >
                      {task.status === "Completed" ? "Completed ✓" : "Complete"}
                    </button>
                    <button
                      onClick={() => handleCancelTask(task.id)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pages > 1 && (
              <div className="flex justify-center mb-4">
                <button
                  className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-xs font-semibold hover:bg-primary/90 transition shadow-xs cursor-pointer"
                  onClick={() =>
                    setCurrentPage(currentPage < pages ? currentPage + 1 : 1)
                  }
                >
                  {currentPage < pages ? "Load More" : "Back to First Page"}
                </button>
              </div>
            )}

            <div className="flex justify-center">
              <button
                className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-xs font-semibold hover:bg-primary/90 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                onClick={addTask}
              >
                <Plus className="w-4 h-4" />
                Add Another Task
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Campaign Manager
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Create and manage your goal-driven quest campaigns
            </p>

            {campaigns.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Existing Campaigns
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {campaigns.map((camp) => (
                    <button
                      key={camp.id}
                      onClick={() => setActiveCampaign(camp)}
                      className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer border border-border shadow-xs"
                    >
                      {camp.name} ({camp.tasks.length} tasks)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {campaigns.length === 0 && <EmptyState />}

            <form
              onSubmit={createCampaign}
              className="bg-muted/30 rounded-2xl p-5 border border-border text-left mt-4 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Initialize New Campaign
              </h3>

              {errorMsg && (
                <div className="mb-4 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Full-Stack Mastery Quest"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-card text-foreground placeholder-muted-foreground text-xs font-medium rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-3 mb-5">
                <label className="block text-xs font-medium text-muted-foreground">
                  Tasks Setup
                </label>
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-2 items-center bg-card p-3 rounded-xl border border-border shadow-xs"
                  >
                    <input
                      type="text"
                      placeholder={`Task #${index + 1} name`}
                      value={task.task}
                      onChange={(e) =>
                        handleTaskChange(index, "task", e.target.value)
                      }
                      className="w-full sm:flex-1 p-2 bg-transparent text-foreground placeholder-muted-foreground text-xs font-medium focus:outline-none border-b sm:border-b-0 border-border"
                    />

                    {/* Date Feature Input */}
                    <div className="flex items-center gap-1 bg-muted/40 px-2 py-1 rounded-full border border-border">
                      <CalendarDays className="w-3.5 h-3.5 text-primary" />
                      <input
                        type="date"
                        value={task.date}
                        onChange={(e) =>
                          handleTaskChange(index, "date", e.target.value)
                        }
                        className="bg-transparent text-xs text-foreground focus:outline-none cursor-pointer"
                      />
                    </div>

                    {/* Custom Difficulty Selector */}
                    <DifficultySelect
                      value={task.difficulty}
                      onChange={(e) =>
                        handleTaskChange(index, "difficulty", e.target.value)
                      }
                    />

                    <input
                      type="number"
                      placeholder="XP"
                      value={task.xp}
                      onChange={(e) =>
                        handleTaskChange(index, "xp", e.target.value)
                      }
                      className="w-16 p-2 bg-transparent text-foreground text-xs font-medium focus:outline-none text-center border border-input rounded-full"
                    />

                    {tasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTaskField(index)}
                        className="text-destructive hover:bg-destructive/10 p-1.5 rounded-full transition"
                        title="Remove Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  type="button"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-5 py-2.5 rounded-full text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  onClick={addTask}
                >
                  <Plus className="w-4 h-4" />
                  Add Another Task
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full text-xs font-semibold transition cursor-pointer shadow-sm"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignManagement;
