import { memo, useEffect, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";
import { IconButton } from "@/components/ui/icon-button";
import { useSearch, useClearSearch, useSearchInput } from "@/hooks/useSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTabs } from "@/hooks/tabsContext";
const SidebarHeader: React.FC = () => {
  const { searchContent, handleSearchChange } = useSearchInput();
  const { inputRef, clearInput } = useClearSearch();
  const { searchIsOpen, openSearch, closeSearch } = useSearch();
  const { switchTo } = useTabs();

  const showClearBtn = searchIsOpen && searchContent;

  // ✅ Memoize back button handler
  const handleBackClick = useCallback(() => {
    closeSearch();
    clearInput();
  }, [closeSearch, clearInput]);

  // ✅ Stable debounced search handler
  const debouncedHandleSearchChange = useMemo(
    () => debounce(handleSearchChange, 300),
    [handleSearchChange]
  );

  // ✅ Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedHandleSearchChange.cancel();
    };
  }, [debouncedHandleSearchChange]);

  return (
    <div className="sidebar-header">
      {/* --- Left Button / Back Icon --- */}
      <div className="sidebar-header-btn">
        <div className="animated-menu-icon" />
        {!searchIsOpen ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton className="absolute inset-0 data-[state=open]:bg-light-secondary-text" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => switchTo("settings")}
                icon="tgico tgico-setting"
              >
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem icon="tgico tgico-moon">
                Enable dark mode
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <IconButton className="absolute inset-0" onClick={handleBackClick} />
        )}
      </div>

      {/* --- Search Field --- */}
      <div className="search-field group">
        <input
          id="search-input"
          type="text"
          className="search-input"
          ref={inputRef}
          placeholder="Search"
          onFocus={openSearch}
          onChange={debouncedHandleSearchChange}
        />

        <span className="tgico tgico-search search-icon" />

        <IconButton
          onClick={clearInput}
          className={`clear-search-input tgico tgico-close ${
            showClearBtn ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default memo(SidebarHeader);
