import { CalendarDays } from "lucide-react";
import { ModifiedCalendarWithPresets } from "./ModifiedCalendarWithPresets";

export const DatePickerField = ({
  formData,
  isCalendarOpen,
  setIsCalendarOpen,
  calendarDate,
  handleDateSelect,
}) => {
  return (
    <div className="relative flex items-center bg-card border border-border px-2.5 py-1 rounded-full shadow-xs hover:border-primary/50 hover:bg-muted/30 transition-all">
      <button
        type="button"
        onClick={() => setIsCalendarOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground focus:outline-none"
      >
        <CalendarDays className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium text-foreground whitespace-nowrap">
          {formData.date ? formData.date : "Due Date"}
        </span>
      </button>

      {isCalendarOpen && (
        <div className="absolute bottom-12 left-0 z-50 shadow-xl rounded-xl bg-card text-card-foreground border border-border p-2 animate-in fade-in zoom-in-95 duration-150">
          <ModifiedCalendarWithPresets
            date={calendarDate}
            setDate={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
};
