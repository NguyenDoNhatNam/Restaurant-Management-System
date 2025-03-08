import React from "react";

const PersonalInfo = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">User Information</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Fullname</label>
        <input
          type="text"
          placeholder="Nguyễn Văn A"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          placeholder="0123456789"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  </div>
);

export default PersonalInfo;
