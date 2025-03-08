import { Menu, Home, Settings, User, LogOut, Box, Users } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div>
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 bg-white shadow-lg flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>
          Admin
        </h2>
        <button onClick={toggleSidebar}>
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <div>
          <Link to="/admin-dashboard">
            <SidebarItem isOpen={isOpen} icon={Home} label="Dashboard" />
          </Link>
        </div>
        <div>
          <Link to="/payment-management">
            <SidebarItem isOpen={isOpen} icon={User} label="Payment" />
          </Link>
        </div>
        <div>
          <Link to="/feedback-management">
            <SidebarItem isOpen={isOpen} icon={User} label="Feedback" />
          </Link>
        </div>
        <div>
          <Link to="/employee-management">
            <SidebarItem isOpen={isOpen} icon={Users} label="Employee " />
          </Link>
        </div>
        <div>
          <Link to="/product-management">
            <SidebarItem isOpen={isOpen} icon={Box} label="Product" />
          </Link>
        </div>
        <div>
          <Link to="/booking_management">
            <SidebarItem isOpen={isOpen} icon={Box} label="Booking" />
          </Link>
        </div>
        <div>
          <Link to="/settings">
            <SidebarItem isOpen={isOpen} icon={Settings} label="Settings" />
          </Link>
        </div>
        <SidebarItem isOpen={isOpen} icon={LogOut} label="Logout" />
      </nav>
    </div>
  </div>
);

export default Sidebar;
