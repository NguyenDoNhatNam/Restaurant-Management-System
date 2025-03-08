import React from "react";

const Security = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Security</h2>
    <div className="space-y-4">
      {["Current Password", "New Password", "Confirm new password"].map((label, index) => (
        <div key={index}>
          <label className="block text-sm font-medium mb-1">{label}</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
      <div className="flex items-center justify-between">
        <span>Enable two-factor authentication</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-10 h-5 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500"></div>
          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transform transition-transform duration-200 peer-checked:translate-x-5"></div>
        </label>
      </div>
    </div>
  </div>
);

export default Security;
