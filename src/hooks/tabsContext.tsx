import React, { createContext, useContext, useState } from "react";

interface TabsContextType {
  activeTab: string;
  switchTo: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider: React.FC<{
  defaultTab?: string;
  children: React.ReactNode;
}> = ({ defaultTab = "home", children }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const switchTo = (id: string) => setActiveTab(id);

  return (
    <TabsContext.Provider value={{ activeTab, switchTo }}>
      {children}
    </TabsContext.Provider>
  );
};

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("useTabs must be used within a TabsProvider");
    }
    return {
      activeTab: "",
      switchTo: () => {},
    };
  }
  return ctx;
}
