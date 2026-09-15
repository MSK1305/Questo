import { Swords } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="my-auto flex flex-col items-center justify-center p-8 text-center bg-card rounded-2xl border border-border border-dashed transition-all">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2 text-xl shadow-inner">
        <Swords className="w-5 h-5 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-base text-foreground tracking-tight">
        No Active Quests
      </h3>
      <p className="text-xs text-muted-foreground max-w-xs mt-0.5 leading-relaxed">
        Create your first quest to begin your adventure.
      </p>
    </div>
  );
};
