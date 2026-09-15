import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export const useQuestLogic = () => {
  const campaignCount = 1;
  const campaignsList = ["Campaign Alpha", "Campaign Beta", "Campaign Gamma"];

  const [formData, setFormData] = useState({
    task: "",
    date: "",
    difficulty: "easy",
    campaign: "",
  });

  const [quests, setQuests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (selectedDate) => {
    setCalendarDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setFormData((prev) => ({ ...prev, date: formattedDate }));
    }
    setIsCalendarOpen(false);
  };

  const handleonSubmit = (e) => {
    e.preventDefault();

    if (!formData.task.trim()) {
      toast.warning("Please enter a quest title.", {
        position: "bottom-center",
        className:
          "bg-card text-card-foreground border border-border border-l-4 border-l-amber-500 rounded-xl shadow-sm",
        icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
      });
      return;
    }

    if (!formData.date) {
      toast.warning("Please select a due date.", {
        position: "bottom-center",
        className:
          "bg-card text-card-foreground border border-border border-l-4 border-l-amber-500 rounded-xl shadow-sm",
        icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
      });
      return;
    }

    if (editingId !== null) {
      setQuests(
        quests.map((q) =>
          q.id === editingId
            ? { ...formData, id: editingId, xp: q.xp || 250 }
            : q,
        ),
      );
      setEditingId(null);
      toast.success("Quest updated.", {
        position: "top-center",
        className:
          "bg-card text-card-foreground border border-border border-l-4 border-l-emerald-500 rounded-xl shadow-sm",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
      });
    } else {
      const newQuest = {
        ...formData,
        id: Date.now(),
        xp:
          formData.difficulty === "hard"
            ? 500
            : formData.difficulty === "medium"
              ? 350
              : 250,
      };

      const updatedQuests = [newQuest, ...quests];
      setQuests(updatedQuests);

      toast.success("Issued quest can be viewed in quest log", {
        position: "top-center",
        className:
          "bg-card text-card-foreground border border-border border-l-4 border-l-emerald-500 rounded-xl shadow-sm",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
      });
    }

    setFormData({
      task: "",
      date: "",
      difficulty: "easy",
      campaign: "",
    });
    setCalendarDate(undefined);
    setSelectedCardId(null);
  };

  const handleDelete = (id) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
    if (selectedCardId === id) setSelectedCardId(null);
    toast.success("Quest removed.", {
      position: "top-center",
      className:
        "bg-card text-card-foreground border border-border border-l-4 border-l-emerald-500 rounded-xl shadow-sm",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />,
    });
  };

  const handleEdit = (quest) => {
    setFormData({
      task: quest.task,
      date: quest.date,
      difficulty: quest.difficulty,
      campaign: quest.campaign,
    });
    if (quest.date) {
      setCalendarDate(new Date(quest.date));
    }
    setEditingId(quest.id);
    setSelectedCardId(null);
  };

  return {
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
  };
};
