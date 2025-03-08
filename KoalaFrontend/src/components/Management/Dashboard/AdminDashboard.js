import { useState } from 'react';
import StatCard from '../StatCard';
import RevenueChart from './RevenueChart';

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState('month');

    const revenueDataSets = {
        day: { dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], values: [200, 300, 250, 400, 350, 450, 500] },
        month: { dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], values: [5000, 10000, 7500, 12000, 15000, 13000, 16000, 14500, 17000, 18000, 15500, 20000] },
        year: { dates: ['2020', '2021', '2022', '2023'], values: [120000, 150000, 130000, 170000] },
    };

    const handleTimeRangeChange = (e) => setTimeRange(e.target.value);

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            <div className="flex flex-col flex-1">
                <main className="flex-1 p-6 space-y-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard title="Total Sales" value="789.300.000" />
                        <StatCard title="New Users" value="345" />
                        <StatCard title="Orders" value="1,234" />
                        <StatCard title="Feedbacks" value="89" />
                    </div>

                    {/* Dropdown for selecting time range */}
                    <div className="flex items-center justify-between mt-6">
                        <h2 className="text-xl font-semibold">Revenue Over Time</h2>
                        <select value={timeRange} onChange={handleTimeRangeChange} className="p-2 bg-white border border-gray-300 rounded">
                            <option value="day">Day</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                        </select>
                    </div>

                    {/* Revenue Chart Section */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <RevenueChart revenueData={revenueDataSets[timeRange]} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
