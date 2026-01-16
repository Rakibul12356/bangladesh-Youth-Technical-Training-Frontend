



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import {
    Users,
    DollarSign,
    BookOpen,
    Activity,
    Search,
    Download,
    Plus,
    MoreHorizontal,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const stats = [
    { title: 'Total Students', value: '12,450', delta: '12%', isPositive: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Revenue', value: '$482,000', delta: '8%', isPositive: true, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Active Courses', value: '5', delta: '-2%', isPositive: false, icon: BookOpen, color: 'text-violet-600', bg: 'bg-violet-50' },
    { title: 'Completion Rate', value: '84.5%', delta: '5%', isPositive: true, icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
];

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function loadUsers() {
            try {
                const res = await axiosInstance.get('/users');
                if (mounted && Array.isArray(res.data)) setUsers(res.data);
            } catch (e) {
                console.error('Failed to fetch users', e);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        loadUsers();
        return () => { mounted = false };
    }, []);

    return (
        <div className="min-h-screen pt-20 p-4 md:p-6 bg-slate-50 font-sans">
            <div className=" space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                        <p className="text-sm text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                placeholder="Search anything..."
                                className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white shadow-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:bg-slate-50 transition-colors font-medium text-sm">
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Export</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all font-medium text-sm hover:-translate-y-0.5">
                                <Plus className="w-4 h-4" />
                                <span>New Report</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${s.bg}`}>
                                    <s.icon className={`w-6 h-6 ${s.color}`} />
                                </div>
                                <span className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${s.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                    {s.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                                    {s.delta}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">{s.title}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Registrations Section */}
                <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">New Registrations</h2>
                            <p className="text-sm text-slate-500 mt-1">Recent users who joined the platform</p>
                        </div>
                        <Link to="/admin/users" className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
                            View All
                        </Link>
                    </div>

                    {/* --- MOBILE VIEW: Cards --- */}
                    <div className="md:hidden p-4 space-y-4 bg-slate-50/50">
                        {loading ? (
                            <div className="text-sm text-slate-500">Loading users...</div>
                        ) : users.length === 0 ? (
                            <div className="text-sm text-slate-500">No users found.</div>
                        ) : users.map((u) => (
                            <div key={u._id || u.email} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
                                            {u.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{u.name}</div>
                                            <div className="text-xs text-slate-500">{u.email}</div>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600 p-1">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                                    <div>
                                        <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Role</div>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${u.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-semibold">Joined</div>
                                        <div className="text-sm font-medium text-slate-700">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : (u.joined || '-')}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- DESKTOP VIEW: Table --- */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td className="px-6 py-4" colSpan={5}>Loading users...</td></tr>
                                ) : users.length === 0 ? (
                                    <tr><td className="px-6 py-4" colSpan={5}>No users found.</td></tr>
                                ) : users.map((u) => (
                                    <tr key={u._id || u.email} className="hover:bg-slate-50/60 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center text-indigo-600 font-bold text-sm border-2 border-white shadow-sm">
                                                    {u.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{u.name}</div>
                                                    <div className="text-xs text-slate-500">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${u.role === 'Admin'
                                                    ? 'bg-purple-50 text-purple-700 border-purple-100'
                                                    : u.role === 'Instructor'
                                                        ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                                                        : 'bg-blue-50 text-blue-700 border-blue-100'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                                                <span className="text-sm text-slate-600 font-medium">{u.status || 'Active'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : (u.joined || '-')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;