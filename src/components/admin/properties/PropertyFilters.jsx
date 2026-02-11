import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const PropertyFilters = ({
    filtersOpen,
    setFiltersOpen,
    search,
    setSearch,
    unitStatus,
    setUnitStatus,
    stateFilter,
    setStateFilter,
    locationFilter,
    setLocationFilter,
    sortBy,
    setSortBy,
    resetFilters,
    statesList,
    locationsList
}) => {
    return (
        <div className="bg-white rounded-lg border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-gray-500" />
                    <p className="text-sm font-semibold text-[#0e1f42]">Filters</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={resetFilters}
                        className="text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                        <X size={14} /> Reset
                    </button>
                    <button
                        onClick={() => setFiltersOpen((v) => !v)}
                        className="text-xs font-semibold text-[#9F7539]"
                    >
                        {filtersOpen ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {filtersOpen && (
                <div className="p-4 flex flex-col gap-3">
                    {/* Search */}
                    <div className="relative w-full md:max-w-sm">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search units..."
                            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 text-sm outline-none focus:border-[#9F7539]"
                        />
                    </div>

                    {/* Select filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3">
                        <select
                            value={unitStatus}
                            onChange={(e) => setUnitStatus(e.target.value)}
                            className="px-3 py-2 rounded-md border border-gray-200 text-sm w-full lg:w-auto"
                        >
                            <option value="all">All Status</option>
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                            <option value="reserved">Reserved</option>
                            <option value="maintenance">Maintenance</option>
                        </select>

                        <select
                            value={stateFilter}
                            onChange={(e) => {
                                setStateFilter(e.target.value);
                                setLocationFilter("all");
                            }}
                            className="px-3 py-2 rounded-md border border-gray-200 text-sm w-full lg:w-auto"
                        >
                            <option value="all">All States</option>
                            {statesList.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>

                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="px-3 py-2 rounded-md border border-gray-200 text-sm w-full lg:w-auto"
                        >
                            <option value="all">All Locations</option>
                            {locationsList.map((l) => (
                                <option key={l}>{l}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 rounded-md border border-gray-200 text-sm w-full lg:w-auto"
                        >
                            <option value="newest">Sort: Newest</option>
                            <option value="rent-asc">Rent: Low → High</option>
                            <option value="rent-desc">Rent: High → Low</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyFilters;
