import { FolderOpenDot, Edit2, Trash2 } from "lucide-react";

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
      className="group bg-card text-card-foreground p-4 rounded-xl shadow-sm border border-border cursor-pointer hover:shadow-md hover:border-primary/40 transition-all duration-200 flex flex-col justify-between relative h-40"
    >
      <div className="space-y-1">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-base text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-2">
            {quest.task}
          </h3>
          <span className="text-xs font-semibold text-foreground bg-secondary px-2.5 py-1 rounded-md shrink-0 border border-border">
            {quest.date}
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
            className={`inline-block px-2.5 py-1 rounded-full text-xs border ${getDifficultyBadge(
              quest.difficulty,
            )}`}
          >
            {quest.difficulty.toUpperCase()}
          </span>
        </div>

        {selectedCardId === quest.id && (
          <div
            className="flex items-center gap-1.5 animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => handleEdit(quest)}
              className="p-1.5 text-xs bg-muted text-foreground rounded hover:bg-muted/80 border border-border transition"
              title="Edit Quest"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(quest.id)}
              className="p-1.5 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20 border border-destructive/20 transition"
              title="Delete Quest"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
