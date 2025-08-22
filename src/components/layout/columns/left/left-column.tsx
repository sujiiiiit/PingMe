import React from "react";
import SidebarHeader from "./sidebar-header";
import SidebarContent from "./sidebar-content";
import {
  Tabs,
  SubTabs,
  TabTrigger,
  TabContent,
  useParentTabs,
} from "@/components/ui/tabs";
import { IconButton } from "@/components/ui/icon-button";
import { TabsProvider } from "@/hooks/tabsContext";
import { Button } from "@/components/ui/button";

const LeftColumn: React.FC = () => {
  return (
    <TabsProvider>
      <Tabs defaultTab="chat" className="left-column-inner">
        {/* Top-level Tab Contents */}
        <TabContent tabId="chat">
          <SidebarHeader />
          <SidebarContent />
        </TabContent>
        <TabContent tabId="settings">
          <SubTabs defaultTab="general" className="nested-tabs">
            <TabContent tabId="general">
              <div className="sidebar-header">
                <BackToParentTab tabId="chat" />
                <div className="sidebar-header-title">
                  <span>Settings</span>
                </div>
              </div>
              <div className="sidebar-content">
                <TabTrigger tabId="advanced">
                  <Button>Go to Advanced</Button>
                </TabTrigger>
              </div>
            </TabContent>
            <TabContent tabId="advanced">
              <div className="sidebar-header">
                <TabTrigger tabId="general">
                  <IconButton className="tgico tgico-arrow-left" />
                </TabTrigger>
                <div className="sidebar-header-title">
                  <span>Advanced Settings</span>
                </div>
              </div>
            </TabContent>
          </SubTabs>
        </TabContent>
        <TabContent tabId="about">
          <h1>About Content</h1>
        </TabContent>
      </Tabs>
    </TabsProvider>
  );
};

// Button to go back to a parent tab from a nested tab
function BackToParentTab({ tabId }: { tabId: string }) {
  const parentTabs = useParentTabs();
  return (
    <IconButton
      className="tgico tgico-arrow-left"
      onClick={() => parentTabs.switchTo(tabId)}
    />
  );
}

export default LeftColumn;
