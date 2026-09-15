import { Plus } from "lucide-react";
import { TaskInput } from "./TaskInput";
import { DifficultySelect } from "./DifficultySelect";
import { CampaignSelect } from "./CampaignSelect";
import { DatePickerField } from "./DatePickerField";

export const QuestForm = ({
  formData,
  handleChange,
  handleonSubmit,
  editingId,
  campaignCount,
  campaignsList,
  isCalendarOpen,
  setIsCalendarOpen,
  calendarDate,
  handleDateSelect,
}) => {
  return (
    <div className="w-full bg-card p-3 rounded-2xl shadow-xl border border-border shrink-0">
      <form
        onSubmit={handleonSubmit}
        noValidate
        className="flex flex-col gap-2 w-full"
      >
        {/* Row 1: Task Input */}
        <TaskInput
          formData={formData}
          handleChange={handleChange}
          editingId={editingId}
        />

        {/* Row 2: Action Controls & Create CTA */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-0">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Difficulty Capsule */}
            <DifficultySelect formData={formData} handleChange={handleChange} />

            {/* Campaign Capsule (Optional) */}
            <CampaignSelect
              formData={formData}
              handleChange={handleChange}
              campaignCount={campaignCount}
              campaignsList={campaignsList}
            />

            {/* Date Capsule */}
            <DatePickerField
              formData={formData}
              isCalendarOpen={isCalendarOpen}
              setIsCalendarOpen={setIsCalendarOpen}
              calendarDate={calendarDate}
              handleDateSelect={handleDateSelect}
            />
          </div>

          {/* Primary CTA Create Quest Button */}
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all duration-150 flex items-center justify-center gap-1.5 shadow-sm font-medium text-xs whitespace-nowrap ml-auto"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>{editingId !== null ? "Update Quest" : "Create Quest"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
