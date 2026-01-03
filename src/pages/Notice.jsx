import React, { useState } from 'react';
import {
    Bell,
    Search,
    Calendar,
    ChevronRight,
    Info,
    AlertCircle,
    CheckCircle,
    Megaphone,
    Clock,
    Filter,
    ArrowRight
} from 'lucide-react';

// --- Mock Data ---
const NOTICES = [
    {
        id: 1,
        title: "System Maintenance Scheduled",
        category: "Maintenance",
        date: "2023-10-28",
        content: "Our servers will be undergoing scheduled maintenance this Sunday from 2:00 AM to 4:00 AM UTC. Services may be intermittently unavailable.",
        priority: "high",
        author: "IT Support Team"
    },
    {
        id: 2,
        title: "Annual Company Retreat 2024",
        category: "Event",
        date: "2023-10-25",
        content: "We are excited to announce that this year's retreat will be held in the mountains! Please RSVP by next Friday.",
        priority: "normal",
        author: "HR Department"
    },
    {
        id: 3,
        title: "New Policy: Remote Work Guidelines",
        category: "Policy",
        date: "2023-10-20",
        content: "Please review the updated remote work policy in the employee handbook. The new guidelines take effect starting November 1st.",
        priority: "urgent",
        author: "Management"
    },
    {
        id: 4,
        title: "Q3 Financial Results Published",
        category: "News",
        date: "2023-10-15",
        content: "We crushed our targets this quarter! Detailed reports are now available on the internal dashboard.",
        priority: "normal",
        author: "Finance Team"
    },
    {
        id: 5,
        title: "Cafeteria Menu Update",
        category: "General",
        date: "2023-10-10",
        content: "Based on popular demand, we are adding more vegan and gluten-free options to the daily lunch menu starting next week.",
        priority: "low",
        author: "Facilities"
    },
    {
        id: 6,
        title: "Security Patch 4.2.1 Released",
        category: "Update",
        date: "2023-10-05",
        content: "A critical security patch has been deployed to all workstations. Please restart your computer at your earliest convenience.",
        priority: "high",
        author: "Security Team"
    }
];

const CATEGORIES = ["All", "Maintenance", "Event", "Policy", "News", "Update"];

// --- Components ---

const Badge = ({ type, text }) => {
    const styles = {
        Maintenance: "bg-orange-100 text-orange-700 border-orange-200",
        Event: "bg-purple-100 text-purple-700 border-purple-200",
        Policy: "bg-red-100 text-red-700 border-red-200",
        News: "bg-green-100 text-green-700 border-green-200",
        Update: "bg-blue-100 text-blue-700 border-blue-200",
        General: "bg-gray-100 text-gray-700 border-gray-200",
        high: "bg-red-50 text-red-600 border-red-100 animate-pulse",
        urgent: "bg-red-50 text-red-600 border-red-100",
    };

    const defaultStyle = "bg-blue-50 text-blue-600 border-blue-100";

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type] || defaultStyle}`}>
            {text || type}
        </span>
    );
};

const PriorityIcon = ({ priority }) => {
    if (priority === 'high' || priority === 'urgent') return <AlertCircle className="w-5 h-5 text-red-500" />;
    if (priority === 'low') return <Info className="w-5 h-5 text-blue-400" />;
    return <CheckCircle className="w-5 h-5 text-green-500" />;
};

const NoticeCard = ({ notice }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`group relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${isExpanded ? 'ring-2 ring-blue-500/20' : ''}`}
        >
            {/* Accent Bar on Left */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${notice.priority === 'high' || notice.priority === 'urgent' ? 'bg-red-500' : 'bg-blue-500'} transition-all group-hover:w-1.5`}></div>

            <div className="p-5 pl-7">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2 items-center mb-1">
                        <Badge type={notice.category} />
                        {notice.priority === 'urgent' && <Badge type="urgent" text="Urgent" />}
                    </div>
                    <span className="flex items-center text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">
                        <Calendar className="w-3 h-3 mr-1.5" />
                        {new Date(notice.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {notice.title}
                </h3>

                <p className={`text-slate-600 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {notice.content}
                </p>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                            {notice.author.charAt(0)}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">{notice.author}</span>
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-sm font-semibold text-blue-500 hover:text-blue-700 flex items-center gap-1 transition-colors"
                    >
                        {isExpanded ? 'Show Less' : 'Read Detail'}
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotices = NOTICES.filter(notice => {
        const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
        const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            notice.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-100">


            {/* --- Header Section --- */}
            <header className="relative bg-white border-b border-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-blue-50/50 pattern-grid-lg opacity-20 pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
                    <div className="md:flex justify-between items-end gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2 text-sm uppercase tracking-wider">
                                <Clock className="w-4 h-4" />
                                <span>Official Updates</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                                Notice Board
                            </h1>
                            <p className="text-slate-500 max-w-xl text-lg">
                                Stay updated with the latest announcements, events, and policy changes happening across the organization.
                            </p>
                        </div>

                        {/* Stats Card (Desktop Only) */}
                        <div className="hidden md:flex gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center min-w-[120px]">
                                <div className="text-2xl font-bold text-blue-600">{NOTICES.length}</div>
                                <div className="text-xs text-slate-400 font-medium uppercase mt-1">Total Notices</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center min-w-[120px]">
                                <div className="text-2xl font-bold text-red-500">2</div>
                                <div className="text-xs text-slate-400 font-medium uppercase mt-1">Urgent</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Main Content Area --- */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Controls: Search & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

                    {/* Categories */}
                    <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <div className="flex gap-2">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${selectedCategory === category
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105 ring-2 ring-blue-400 ring-offset-2'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-300 hover:border-blue-300'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-72 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search notices..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* --- Content Grid --- */}
                {filteredNotices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotices.map(notice => (
                            <NoticeCard key={notice.id} notice={notice} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                        <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Filter className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No notices found</h3>
                        <p className="mt-1 text-slate-500">Try adjusting your search or category filter.</p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

            </main>



            {/* Tailwind Utility for hiding scrollbar if needed but keeping functionality */}
            <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default App;