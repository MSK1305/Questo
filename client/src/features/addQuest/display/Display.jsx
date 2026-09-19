import { EmptyState } from "./EmptyState";
import { QuestCard } from "../..//../components/shared/QuestCard";

export const Display = ({
  quests,
  selectedCardId,
  setSelectedCardId,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="flex flex-col h-full pr-1 pb-2">
      {quests.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quests
            .slice(0, 6)
            .reverse()
            .map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                selectedCardId={selectedCardId}
                setSelectedCardId={setSelectedCardId}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
};
