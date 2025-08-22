import { IconButton } from "@/components/ui/icon-button";
import { useColumn } from "@/hooks/useColumn";
const RightHeader = () => {
  const { activeColumn, changeColumn } = useColumn();
  return (
    <div className="chat-info-container">
      <IconButton
        onClick={() =>
          changeColumn(activeColumn === "right" ? "center" : "right")
        }
        className="tgico tgico-arrow-left"
      />
    </div>
  );
};

export default RightHeader;
