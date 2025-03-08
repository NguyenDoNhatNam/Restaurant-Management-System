import React from "react";

const Notifications = () => (
  <div>
    <h2 className="text-xl font-semibold mb-2">Notification settings</h2>
    <p className="text-gray-600 mb-4">Customize how you receive notifications.</p>
    <div className="space-y-4">
      {["Email Notification", "Push Notifications", "SMS Notification"].map((label, index) => (
        <div key={index} className="flex items-center justify-between">
          <span>{label}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transform transition-transform duration-200 peer-checked:translate-x-5"></div>
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default Notifications;
