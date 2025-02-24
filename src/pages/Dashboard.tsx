import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
          <p className="text-gray-600">No upcoming interviews scheduled</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">No recent activity</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Total Interviews: 0</p>
            <p className="text-gray-600">Questions in Bank: 0</p>
            <p className="text-gray-600">Average Score: N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;