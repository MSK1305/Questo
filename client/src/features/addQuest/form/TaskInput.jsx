export const TaskInput = ({ formData, handleChange, editingId }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        name="task"
        placeholder={
          editingId !== null ? "Editing quest..." : "What needs to be done?"
        }
        value={formData.task}
        onChange={handleChange}
        className="w-full outline-none bg-card border border-border px-4 py-2 rounded-xl text-base text-foreground placeholder:text-muted-foreground shadow-xs focus:border-primary transition-all font-medium"
      />
    </div>
  );
};
