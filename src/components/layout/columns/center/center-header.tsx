
import { IconButton } from "@/components/ui/icon-button";
import { useColumn } from "@/hooks/useColumn";
const CenterHeader = () => {
  const { activeColumn,changeColumn } = useColumn();
  return (
    <div className="chat-info-container">
      <IconButton onClick={() => changeColumn(activeColumn==="left"?"center":"left")} className="tgico tgico-arrow-left state-back" />
    </div>
  );
};

export default CenterHeader;