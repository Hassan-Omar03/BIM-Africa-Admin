import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function Dashboard() {
  const { getAdmin, getBlogs } = useContext(AppContext);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getAdmin();
      if (data) {
        setAdmin(data);
      }
      const blogData = await getBlogs(1, 1);
      setTotalBlogs(blogData?.pagination?.totalBlogs || 0);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to BIM Africa Admin Panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Blogs</p>
                <h2 className="text-5xl font-bold">{totalBlogs}</h2>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            </div>
            <button
              onClick={() => navigate('/blogs')}
              className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              View All Blogs
            </button>
          </div>

          <div className="bg-white border-2 border-blue-600 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Admin Details</h3>
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            {admin ? (
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium w-20">Name:</span>
                  <span className="text-gray-800 flex-1">{admin.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 font-medium w-20">Email:</span>
                  <span className="text-gray-800 flex-1">{admin.email}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No admin data available</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 ">
          <div className="bg-white border border-gray-200 max-w-xl rounded-lg shadow p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/add-blog')}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                + Add New Blog
              </button>
              <button
                onClick={() => navigate('/blogs')}
                className="w-full bg-white text-blue-600 border border-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                Manage Blogs
              </button>
            </div>
          </div>

          {/* <div className="bg-blue-50 border border-blue-200 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Database</span>
                <span className="flex items-center text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">API Status</span>
                <span className="flex items-center text-green-600">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
            <div className="text-gray-600 text-sm">
              <p className="mb-2">✓ Admin logged in</p>
              <p className="mb-2">✓ Dashboard loaded</p>
              <p className="text-gray-400">Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}