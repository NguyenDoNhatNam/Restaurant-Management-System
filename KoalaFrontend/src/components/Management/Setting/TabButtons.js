import React from "react";
import { UserIcon, BellIcon, LockIcon } from "lucide-react";

const TabButtons = ({ activeTab, setActiveTab }) => (
  <div className="flex justify-center mb-4 space-x-4">
    {[
      { label: "Manager Information", icon: <UserIcon className="w-4 h-4 mr-1" />, tab: "personal" },
      { label: "Notifications", icon: <BellIcon className="w-4 h-4 mr-1" />, tab: "notifications" },
      { label: "Security", icon: <LockIcon className="w-4 h-4 mr-1" />, tab: "security" },
    ].map(({ label, icon, tab }) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`p-2 ${activeTab === tab ? "bg-gray-200 font-semibold" : ""} rounded-md flex items-center`}
      >
        {icon} {label}
      </button>
    ))}
  </div>
);

export default TabButtons;
