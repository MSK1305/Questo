export const DifficultySelect = ({ formData, handleChange }) => {
  return (
    <div className="flex items-center bg-card border border-border px-2 py-1 rounded-full shadow-xs hover:border-primary/50 hover:bg-muted/30 transition-all">
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        className="outline-none bg-transparent text-xs cursor-pointer font-medium text-foreground px-1"
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
