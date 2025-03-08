import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Notifications from "./Notifications";
import Security from "./Security";
import TabButtons from "./TabButtons";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="bg-white p-6 rounded-lg shadow">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "notifications" && <Notifications />}
            {activeTab === "security" && <Security />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
