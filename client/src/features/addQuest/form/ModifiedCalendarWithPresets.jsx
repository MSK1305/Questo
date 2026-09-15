import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { addDays, startOfToday } from "date-fns";

export function ModifiedCalendarWithPresets({ date, setDate }) {
  const [currentMonth, setCurrentMonth] = React.useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const today = startOfToday();

  return (
    <div className="p-1">
      <Card
        className="mx-auto w-fit max-w-75 border-none shadow-none bg-transparent text-card-foreground"
        size="sm"
      >
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDay) => {
              setDate(selectedDay);
            }}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            fixedWeeks
            disabled={{ before: today }}
            className="p-0 text-card-foreground"
          />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-t border-border pt-2 mt-1">
          {[
            { label: "Today", value: 0 },
            { label: "Tomorrow", value: 1 },
          ].map((preset) => (
            <button
              key={preset.value}
              type="button"
              className="flex-1 px-3 py-1 text-xs font-medium border border-border rounded-md hover:bg-muted transition text-card-foreground"
              onClick={() => {
                const newDate = addDays(new Date(), preset.value);
                setDate(newDate);
                setCurrentMonth(
                  new Date(newDate.getFullYear(), newDate.getMonth(), 1),
                );
              }}
            >
              {preset.label}
            </button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}
