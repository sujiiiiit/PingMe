import { useSearch } from "@/hooks/useSearch";
import { useColumn } from "@/hooks/useColumn";
import { Button } from "@/components/ui/button";
const SidebarContent: React.FC = () => {
  const { searchIsOpen } = useSearch();
  const { changeColumn } = useColumn();

  return (
    <div className="sidebar-content transitions zoom-fade animating backwards">
      <div
        className={`${
          searchIsOpen ? "from" : "active to"
        } transition-item relative z-[2]`}
      >
        <Button onClick={() => changeColumn("center")}>Open chat</Button>
      </div>
      <div
        className={`${
          searchIsOpen ? "active to" : "from"
        } transition-item absolute z-[3]`}
      >
        Item 2
      </div>
    </div>
  );
};

export default SidebarContent;
