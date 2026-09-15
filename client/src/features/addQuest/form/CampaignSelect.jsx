import { FolderOpenDot } from "lucide-react";

export const CampaignSelect = ({
  formData,
  handleChange,
  campaignCount,
  campaignsList,
}) => {
  return (
    <div className="flex items-center gap-1 bg-card border border-border px-2.5 py-1 rounded-full shadow-xs hover:border-primary/50 hover:bg-muted/30 transition-all">
      <FolderOpenDot className="text-muted-foreground w-3.5 h-3.5" />
      <select
        name="campaign"
        value={formData.campaign}
        onChange={handleChange}
        disabled={campaignCount === 0}
        className="outline-none bg-transparent text-xs cursor-pointer text-foreground disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        <option value="" className="bg-card text-foreground">
          {campaignCount === 0 ? "No Campaigns" : "Campaign (Optional)"}
        </option>
        {campaignsList.slice(0, campaignCount).map((camp, index) => (
          <option key={index} value={camp} className="bg-card text-foreground">
            {camp}
          </option>
        ))}
      </select>
    </div>
  );
};
