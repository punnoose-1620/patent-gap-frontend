import HistoryCard from '@/components/history/HistoryCard';
import StatCard from '@/components/history/StatCard';
import { AlertCircle, CheckCircle, Search, Shield } from 'lucide-react';
import { useState } from 'react';
import { mockHistories, mockStats } from './mock';

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistories = mockHistories.filter((history) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;

    return (
      history.title.toLowerCase().includes(query) ||
      history.patentId.toLowerCase().includes(query) ||
      history.competitors.some((c) => c.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search History</h1>
        <p className="text-gray-600 mt-1">Track and manage your patent searches and analysis</p>
      </div>

      {/* Search Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patent name, ID, or competitor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Searches" value={mockStats.totalSearches} icon={Search} />
        <StatCard label="Completed" value={mockStats.completed} icon={CheckCircle} />
        <StatCard label="High Risk Matches" value={mockStats.highRiskMatches} icon={AlertCircle} />
        <StatCard label="Cleared Patents" value={mockStats.clearedPatents} icon={Shield} />
      </div>

      {/* Search Results List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Search Results ({filteredHistories.length})</h2>
        <div className="space-y-4">
          {filteredHistories.length > 0 ? (
            filteredHistories.map((history) => <HistoryCard key={history.id} history={history} />)
          ) : (
            <div className="p-12 text-center border rounded-lg">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No searches found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
