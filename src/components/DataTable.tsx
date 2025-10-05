import { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';

interface DataItem {
  id: number;
  company: string;
  revenue: number;
  growth: number;
  employees: number;
  category: string;
}

const sampleData: DataItem[] = [
  { id: 1, company: 'TechCorp Inc.', revenue: 45000000, growth: 27, employees: 250, category: 'Technology' },
  { id: 2, company: 'FinanceHub', revenue: 32000000, growth: -5, employees: 180, category: 'Finance' },
  { id: 3, company: 'HealthPlus', revenue: 28000000, growth: 15, employees: 320, category: 'Healthcare' },
  { id: 4, company: 'EduTech Pro', revenue: 19000000, growth: 42, employees: 95, category: 'Education' },
  { id: 5, company: 'RetailMax', revenue: 51000000, growth: 8, employees: 410, category: 'Retail' },
  { id: 6, company: 'CloudSystems', revenue: 38000000, growth: 33, employees: 175, category: 'Technology' },
  { id: 7, company: 'MediCare Solutions', revenue: 22000000, growth: -3, employees: 205, category: 'Healthcare' },
  { id: 8, company: 'FinTrack', revenue: 41000000, growth: 19, employees: 145, category: 'Finance' },
];

export default function DataTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortField, setSortField] = useState<keyof DataItem>('revenue');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const categories = ['All', ...Array.from(new Set(sampleData.map(item => item.category)))];

  const filteredAndSortedData = useMemo(() => {
    let filtered = sampleData.filter(item => {
      const matchesSearch = item.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return aValue > bValue ? multiplier : -multiplier;
    });
  }, [searchTerm, selectedCategory, sortField, sortDirection]);

  const handleSort = (field: keyof DataItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Industry Leaders
            <span className="block mt-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              Performance Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real-time data from companies transforming their industries
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent appearance-none cursor-pointer transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    onClick={() => handleSort('company')}
                    className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-cyan-500 transition-colors"
                  >
                    Company
                  </th>
                  <th
                    onClick={() => handleSort('category')}
                    className="text-left py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-cyan-500 transition-colors"
                  >
                    Category
                  </th>
                  <th
                    onClick={() => handleSort('revenue')}
                    className="text-right py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-cyan-500 transition-colors"
                  >
                    Revenue
                  </th>
                  <th
                    onClick={() => handleSort('growth')}
                    className="text-right py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-cyan-500 transition-colors"
                  >
                    Growth
                  </th>
                  <th
                    onClick={() => handleSort('employees')}
                    className="text-right py-4 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-cyan-500 transition-colors"
                  >
                    Employees
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-cyan-50 dark:hover:bg-gray-700/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {item.company}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-gray-900 dark:text-white">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className={`flex items-center justify-end gap-1 font-semibold ${
                        item.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.growth >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(item.growth)}%
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">
                      {item.employees.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No companies found matching your criteria
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredAndSortedData.length} of {sampleData.length} companies
            </p>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
