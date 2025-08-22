import { useColumn } from "@/hooks/useColumn";
import { Provider } from "react-redux";
import { store } from "./store";
import LeftColumn from "@/components/layout/columns/left/left-column";
import CenterColumn from "@/components/layout/columns/center/center-column";
import RightColumn from "@/components/layout/columns/right/right-column";
import { useSearch } from "./hooks/useSearch";

const AppContent = () => {
    const { searchIsOpen } = useSearch();
  
  const { activeColumn } = useColumn();
  return (
    <div className={`main-layout animation-on ${searchIsOpen ? "search-open" : ""}`}>
      <div className="layout-inner tabs-container">
        <div
          className="tabs-tab left-column"
          data-state={activeColumn === "left"}
        >
          <LeftColumn />
        </div>
        <div
          className="tabs-tab center-column"
          data-left={activeColumn === "left"}
          data-right={activeColumn === "right"}
        >
          <CenterColumn />
        </div>
        <div
          className="tabs-tab right-column"
          data-state={activeColumn === "right"}
        >
          <RightColumn />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
