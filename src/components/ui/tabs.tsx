import React, { memo, useRef, cloneElement, isValidElement } from "react";
import { useTabs, TabsProvider } from "@/hooks/tabsContext";
import ReactCtx from "react";

/* -------------------- Tabs Container -------------------- */
type TabsProps = {
  children: React.ReactNode;
  className?: string;
  defaultTab?: string;
};

// Context to provide parent tab switching
const ParentTabsContext = ReactCtx.createContext<null | ReturnType<typeof useTabs>>(null);

export function useParentTabs() {
  const ctx = ReactCtx.useContext(ParentTabsContext);
  if (!ctx) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("useParentTabs must be used inside a nested Tabs");
    }
    return {} as ReturnType<typeof useTabs>; // fallback to empty object in production
  }
  return ctx;
}

// Context to provide tab order and activeTab for triggers/contents
const TabOrderContext = ReactCtx.createContext<{ tabIds: string[]; activeTab: string | undefined }>(
  { tabIds: [], activeTab: undefined }
);

export const Tabs: React.FC<TabsProps> = ({ children, className = "", defaultTab }) => {
  const tabIds: string[] = [];
  let firstTabId: string | undefined = undefined;

  // Collect tabIds from both TabTrigger and TabContent
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const type = (child.type as any).displayName;
      const props = (child as React.ReactElement).props as { tabId?: string };
      if ((type === "TabTrigger" || type === "TabContent") && props.tabId) {
        const tid = props.tabId;
        if (typeof tid === "string" && !tabIds.includes(tid)) {
          tabIds.push(tid);
          if (!firstTabId) firstTabId = tid;
        }
      }
    }
  });

  // Remove debug log in production
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[Tabs] collected tabIds:", tabIds);
  }

  const resolvedDefaultTab = defaultTab || firstTabId;

  return (
    <TabsProvider defaultTab={resolvedDefaultTab}>
      <ParentTabsContext.Provider value={useTabs()}>
        <TabOrderProvider tabIds={tabIds}>
          <div className={`tabs-container ${className}`}>{children}</div>
        </TabOrderProvider>
      </ParentTabsContext.Provider>
    </TabsProvider>
  );
};

function TabOrderProvider({ tabIds, children }: { tabIds: string[]; children: React.ReactNode }) {
  const { activeTab } = useTabs();
  return (
    <TabOrderContext.Provider value={{ tabIds, activeTab }}>
      {children}
    </TabOrderContext.Provider>
  );
}

// SubTabs: styled alias for Tabs (for nested usage)
export const SubTabs: React.FC<TabsProps> = ({ children, className = "", defaultTab }) => {
  return (
    <Tabs className={`sub-tabs ${className}`} defaultTab={defaultTab}>
      {children}
    </Tabs>
  );
};

/* -------------------- Trigger -------------------- */
type TabTriggerProps = {
  tabId: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  asChild?: boolean;
};

export const TabTrigger = memo(
  ({ tabId, children, className = "", asChild = false }: TabTriggerProps) => {
    const { switchTo } = useTabs();
    const { tabIds, activeTab } = ReactCtx.useContext(TabOrderContext);

    const idx = tabIds.indexOf(tabId);
    const activeIdx = activeTab ? tabIds.indexOf(activeTab) : -1;
    const isPrevious = idx > -1 && activeIdx > -1 && idx < activeIdx;

    // Remove debug log in production
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log(
        `[TabTrigger] tabId=${tabId}, idx=${idx}, activeTab=${activeTab}, activeIdx=${activeIdx}, isPrevious=${isPrevious}`
      );
    }

    const triggerProps = {
      onClick: () => switchTo(tabId),
      // className: `${className} ${isPrevious ? "previous-tab" : ""}`.trim(),
      className: `${className}`.trim(),
    };

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement, {
        ...triggerProps,
        ...(typeof children === "object" &&
        "props" in children &&
        typeof children.props === "object"
          ? children.props
          : {}),
      });
    }
    return <button {...triggerProps}>{children}</button>;
  }
);

/* -------------------- Content -------------------- */
type TabContentProps = {
  tabId: string;
  children: React.ReactNode;
  className?: string;
};

export const TabContent = memo(({ tabId, children, className = "" }: TabContentProps) => {
  const { activeTab } = useTabs();
  const { tabIds } = ReactCtx.useContext(TabOrderContext);

  const renderedOnceRef = useRef(false);
  if (activeTab === tabId) renderedOnceRef.current = true;

  const idx = tabIds.indexOf(tabId);
  const activeIdx = activeTab ? tabIds.indexOf(activeTab) : -1;
  const isPrevious = idx > -1 && activeIdx > -1 && idx < activeIdx;

  // Remove debug log in production
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(
      `[TabContent] tabId=${tabId}, idx=${idx}, activeTab=${activeTab}, activeIdx=${activeIdx}, isPrevious=${isPrevious}`
    );
  }

  return (
    <div
      className={`tabs-tab tab ${
        activeTab === tabId ? "active" : ""
      } ${isPrevious ? "previous-tab" : ""} ${className}`}
      data-tab-id={tabId}
    >
      {renderedOnceRef.current ? children : null}
    </div>
  );
});

TabContent.displayName = "TabContent";
TabTrigger.displayName = "TabTrigger";
