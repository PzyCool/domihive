// src/components/admin/pages/AdminInspectionSlots.jsx
import React, { useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';

const AdminInspectionSlots = () => {
  const { properties, slots, setSlots } = useAdmin();
  const [selectedProperty, setSelectedProperty] = useState(properties[0]?.id || '');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  const propertySlots = slots.filter((s) => s.propertyId === selectedProperty);

  const addSlot = () => {
    if (!selectedProperty || !dateInput || !timeInput) return;
    setSlots((prev) => {
      const existing = prev.find((s) => s.propertyId === selectedProperty && s.date === dateInput);
      if (existing) {
        return prev.map((s) =>
          s === existing ? { ...s, times: Array.from(new Set([...s.times, timeInput])) } : s
        );
      }
      return [...prev, { propertyId: selectedProperty, date: dateInput, times: [timeInput] }];
    });
    setTimeInput('');
  };

  const removeTime = (date, time) => {
    setSlots((prev) =>
      prev
        .map((s) =>
          s.date === date && s.propertyId === selectedProperty
            ? { ...s, times: s.times.filter((t) => t !== time) }
            : s
        )
        .filter((s) => s.times.length > 0)
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white mb-4">Inspection Slots</h1>
      <div className="bg-white dark:bg-[#111827] rounded-lg border border-gray-100 dark:border-white/5 shadow p-4 space-y-4 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select className="border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none cursor-pointer" value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
            {properties.map((p) => <option key={p.id} value={p.id} className="dark:bg-[#111827]">{p.title}</option>)}
          </select>
          <input type="date" className="border dark:border-white/10 rounded p-2 text-sm bg-transparent dark:text-white outline-none" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
          <div className="flex gap-2">
            <input type="text" className="border dark:border-white/10 rounded p-2 text-sm flex-1 bg-transparent dark:text-white outline-none" placeholder="Time e.g. 10:00 AM" value={timeInput} onChange={(e) => setTimeInput(e.target.value)} />
            <button onClick={addSlot} className="bg-[#0e1f42] dark:bg-white dark:text-[#0e1f42] text-white px-3 rounded text-sm font-semibold cursor-pointer whitespace-nowrap">Add</button>
          </div>
        </div>

        <div className="space-y-3">
          {propertySlots.length === 0 && <div className="text-sm text-gray-600 dark:text-gray-400">No slots configured yet.</div>}
          {propertySlots.map((slot) => (
            <div key={slot.date} className="border border-gray-200 dark:border-white/5 rounded p-3 bg-gray-50/50 dark:bg-white/5">
              <div className="font-semibold text-[#0e1f42] dark:text-white mb-2">{slot.date}</div>
              <div className="flex flex-wrap gap-2">
                {slot.times.map((time) => (
                  <span key={time} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm flex items-center gap-2 dark:text-gray-300">
                    {time}
                    <button onClick={() => removeTime(slot.date, time)} className="text-red-500 hover:text-red-400 text-xs font-bold cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInspectionSlots;
