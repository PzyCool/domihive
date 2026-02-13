// src/components/admin/pages/AdminLocationsFilters.jsx
import React, { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';

const AdminLocationsFilters = () => {
  const { locations, setLocations } = useAdmin();
  const [stateInput, setStateInput] = useState('');
  const [areaInput, setAreaInput] = useState({ state: 'Lagos', value: '' });
  const [locationInput, setLocationInput] = useState({ area: 'Ikoyi', value: '' });
  const [typeInput, setTypeInput] = useState('');
  const [amenityInput, setAmenityInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  const addState = () => {
    if (!stateInput) return;
    setLocations((prev) => ({ ...prev, states: [...prev.states, stateInput], areas: { ...prev.areas, [stateInput]: [] } }));
    setStateInput('');
  };

  const addArea = () => {
    if (!areaInput.value) return;
    setLocations((prev) => ({
      ...prev,
      areas: { ...prev.areas, [areaInput.state]: [...(prev.areas[areaInput.state] || []), areaInput.value] },
      locations: { ...prev.locations, [areaInput.value]: [] }
    }));
    setAreaInput({ ...areaInput, value: '' });
  };

  const addLocation = () => {
    if (!locationInput.value) return;
    setLocations((prev) => ({
      ...prev,
      locations: { ...prev.locations, [locationInput.area]: [...(prev.locations[locationInput.area] || []), locationInput.value] }
    }));
    setLocationInput({ ...locationInput, value: '' });
  };

  const addType = () => {
    if (!typeInput) return;
    setLocations((prev) => ({ ...prev, propertyTypes: [...prev.propertyTypes, typeInput] }));
    setTypeInput('');
  };

  const addAmenity = () => {
    if (!amenityInput) return;
    setLocations((prev) => ({ ...prev, amenities: [...prev.amenities, amenityInput] }));
    setAmenityInput('');
  };

  const addPriceRange = () => {
    if (!priceInput) return;
    setLocations((prev) => ({ ...prev, priceRanges: [...prev.priceRanges, priceInput] }));
    setPriceInput('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white mb-4">Locations & Filters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111827] p-4 rounded-lg border border-gray-100 dark:border-white/5 shadow transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white mb-3">States</h3>
          <div className="flex gap-2 mb-2">
            <input className="border dark:border-white/10 rounded p-2 flex-1 text-sm bg-transparent dark:text-white outline-none" placeholder="Add state" value={stateInput} onChange={(e) => setStateInput(e.target.value)} />
            <button onClick={addState} className="bg-[#0e1f42] dark:bg-white dark:text-[#0e1f42] text-white px-3 rounded text-sm font-semibold cursor-pointer">Add</button>
          </div>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {locations.states.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>

        <div className="bg-white dark:bg-[#111827] p-4 rounded-lg border border-gray-100 dark:border-white/5 shadow transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white mb-3">Areas</h3>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <select className="border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none cursor-pointer" value={areaInput.state} onChange={(e) => setAreaInput({ ...areaInput, state: e.target.value })}>
              {locations.states.map((s) => <option key={s} className="dark:bg-[#111827]">{s}</option>)}
            </select>
            <input className="border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none" placeholder="Add area" value={areaInput.value} onChange={(e) => setAreaInput({ ...areaInput, value: e.target.value })} />
          </div>
          <button onClick={addArea} className="bg-[#0e1f42] dark:bg-white dark:text-[#0e1f42] text-white px-3 py-1 rounded text-sm mb-2 font-semibold cursor-pointer">Add</button>
          <div className="text-xs text-gray-700 dark:text-gray-400 space-y-1">
            {Object.entries(locations.areas).map(([state, areas]) => (
              <div key={state} className="mb-2 last:mb-0">
                <div className="font-semibold text-[#0e1f42] dark:text-white mb-1">{state}</div>
                <div className="flex flex-wrap gap-2">{areas.map((a) => <span key={a} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded dark:text-gray-300">{a}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] p-4 rounded-lg border border-gray-100 dark:border-white/5 shadow transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white mb-3">Locations</h3>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <select className="border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none cursor-pointer" value={locationInput.area} onChange={(e) => setLocationInput({ ...locationInput, area: e.target.value })}>
              {Object.keys(locations.locations).map((a) => <option key={a} className="dark:bg-[#111827]">{a}</option>)}
            </select>
            <input className="border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none" placeholder="Add location" value={locationInput.value} onChange={(e) => setLocationInput({ ...locationInput, value: e.target.value })} />
          </div>
          <button onClick={addLocation} className="bg-[#0e1f42] dark:bg-white dark:text-[#0e1f42] text-white px-3 py-1 rounded text-sm mb-2 font-semibold cursor-pointer">Add</button>
          <div className="text-xs text-gray-700 dark:text-gray-400 space-y-1 max-h-36 overflow-y-auto custom-scrollbar">
            {Object.entries(locations.locations).map(([area, locs]) => (
              <div key={area} className="mb-2 last:mb-0">
                <div className="font-semibold text-[#0e1f42] dark:text-white mb-1">{area}</div>
                <div className="flex flex-wrap gap-2">{locs.map((l) => <span key={l} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded dark:text-gray-300">{l}</span>)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] p-4 rounded-lg border border-gray-100 dark:border-white/5 shadow transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white mb-3">Property Types</h3>
          <div className="flex gap-2 mb-2">
            <input className="border dark:border-white/10 rounded p-2 flex-1 text-sm bg-transparent dark:text-white outline-none" placeholder="Add type" value={typeInput} onChange={(e) => setTypeInput(e.target.value)} />
            <button onClick={addType} className="bg-[#0e1f42] dark:bg-white dark:text-[#0e1f42] text-white px-3 rounded text-sm font-semibold cursor-pointer">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {locations.propertyTypes.map((t) => <span key={t} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded dark:text-gray-300">{t}</span>)}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] p-4 rounded-lg border border-gray-100 dark:border-white/5 shadow transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white mb-3">Amenities</h3>
          <div className="flex gap-2 mb-2">
            <input className="border dark:border-white/10 rounded p-2 flex-1 text-sm bg-transparent dark:text-white outline-none" placeholder="Add amenity" value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} />
            <button onClick={addAmenity} className="bg-[#0e1f42] dark:bg-white dark:text-[#0e1f42] text-white px-3 rounded text-sm font-semibold cursor-pointer">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {locations.amenities.map((a) => <span key={a} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded dark:text-gray-300">{a}</span>)}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] p-4 rounded-lg border border-gray-100 dark:border-white/5 shadow transition-colors">
          <h3 className="font-semibold text-[#0e1f42] dark:text-white mb-3">Price Ranges</h3>
          <div className="flex gap-2 mb-2">
            <input className="border dark:border-white/10 rounded p-2 flex-1 text-sm bg-transparent dark:text-white outline-none" placeholder="Add price range" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} />
            <button onClick={addPriceRange} className="bg-[#0e1f42] dark:bg-white dark:text-[#0e1f42] text-white px-3 rounded text-sm font-semibold cursor-pointer">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {locations.priceRanges.map((p) => <span key={p} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded dark:text-gray-300">{p}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLocationsFilters;
