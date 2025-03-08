import { useState } from 'react';
import Sidebar from '../Navbar/Sidebar';
import { Outlet } from 'react-router-dom';

const ManagementLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-6 space-y-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ManagementLayout;
