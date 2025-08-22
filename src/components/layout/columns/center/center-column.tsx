import { useColumn } from "@/hooks/useColumn";
import CenterHeader from "./center-header";
import { Button } from "@/components/ui/button";

const CenterColumn: React.FC = () => {
  const { activeColumn, changeColumn } = useColumn();
  return (
    <div className="chat-container">
      <div
        className="chats center-column-inner "
        data-right={activeColumn === "right"}
      >
        <div className="sidebar-header">
          <CenterHeader />
        </div>
        <Button onClick={() => changeColumn("right")} className="ml-2">
          Open Right
        </Button>
      </div>
    </div>
  );
};

export default CenterColumn;
