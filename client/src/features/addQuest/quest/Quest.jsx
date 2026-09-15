import { Toaster } from "sonner";
import { QuestForm } from "../form/QuestForm";
import { Display } from "../display/Display";
import { QuestHeader } from "./QuestHeader";
import { useQuestLogic } from "./useQuestLogic";

const Quest = () => {
  const {
    campaignCount,
    campaignsList,
    formData,
    quests,
    editingId,
    selectedCardId,
    setSelectedCardId,
    isCalendarOpen,
    setIsCalendarOpen,
    calendarDate,
    handleChange,
    handleDateSelect,
    handleonSubmit,
    handleDelete,
    handleEdit,
  } = useQuestLogic();

  return (
    <div className="h-full w-full flex flex-col overflow-hidden px-6 pt-2 pb-6 max-w-5xl mx-auto bg-background text-foreground font-sans">
      <Toaster />

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col space-y-4">
        <QuestHeader />

        {/* Quests Display Component */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Display
            quests={quests}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      {/* Quest Form Component */}
      <div className="shrink-0 pt-2">
        <QuestForm
          formData={formData}
          handleChange={handleChange}
          handleonSubmit={handleonSubmit}
          editingId={editingId}
          campaignCount={campaignCount}
          campaignsList={campaignsList}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          calendarDate={calendarDate}
          handleDateSelect={handleDateSelect}
        />
      </div>
    </div>
  );
};

export default Quest;
