// src/components/admin/pages/AdminProperties.jsx
import React, { useMemo, useState } from 'react';
import { useAdmin } from '../../../context/AdminContext';

const emptyForm = {
  id: '',
  title: '',
  description: '',
  state: 'Lagos',
  area: '',
  location: '',
  type: 'Apartment',
  bedrooms: 1,
  bathrooms: 1,
  size: '',
  rent: '',
  caution: '',
  billsIncluded: false,
  billsNote: '',
  tag: 'Estate',
  age: 'Any',
  furnishing: 'None',
  petPolicy: 'Allowed',
  amenities: [],
  status: 'Draft',
  image: ''
};

const AdminProperties = () => {
  const { properties, setProperties, locations } = useAdmin();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (!form.title) return;
    if (editingId) {
      setProperties((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
    } else {
      setProperties((prev) => [...prev, { ...form, id: `prop-${Date.now()}` }]);
    }
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const prop = properties.find((p) => p.id === id);
    if (prop) {
      setEditingId(id);
      setForm({ ...emptyForm, ...prop });
    }
  };

  const areas = useMemo(() => locations.areas[form.state] || [], [locations.areas, form.state]);
  const locs = useMemo(() => locations.locations[form.area] || [], [locations.locations, form.area]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0e1f42] mb-4">Properties</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white border border-gray-100 rounded-lg shadow p-4 lg:col-span-1">
          <h3 className="font-semibold text-[#0e1f42] mb-3">{editingId ? 'Edit Property' : 'Add Property'}</h3>
          <div className="space-y-3 text-sm">
            <input className="w-full border rounded p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea className="w-full border rounded p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <select className="border rounded p-2" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value, area: '', location: '' })}>
                {locations.states.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select className="border rounded p-2" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value, location: '' })}>
                <option value="">Select Area</option>
                {areas.map((a) => <option key={a}>{a}</option>)}
              </select>
              <select className="border rounded p-2 col-span-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
                <option value="">Select Location</option>
                {locs.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select className="border rounded p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {locations.propertyTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
              <input className="border rounded p-2" type="number" min="1" placeholder="Bedrooms" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} />
              <input className="border rounded p-2" type="number" min="1" placeholder="Bathrooms" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} />
              <input className="border rounded p-2" placeholder="Size (sqm)" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
              <input className="border rounded p-2" type="number" placeholder="Annual Rent" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} />
              <input className="border rounded p-2" type="number" placeholder="Caution Fee" value={form.caution} onChange={(e) => setForm({ ...form, caution: e.target.value })} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.billsIncluded} onChange={(e) => setForm({ ...form, billsIncluded: e.target.checked })} />
              <span>Bills Included</span>
            </div>
            {form.billsIncluded && (
              <input className="w-full border rounded p-2" placeholder="Bills note" value={form.billsNote} onChange={(e) => setForm({ ...form, billsNote: e.target.value })} />
            )}
            <div className="grid grid-cols-2 gap-2">
              <select className="border rounded p-2" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
                <option>Estate</option>
                <option>Non-estate</option>
              </select>
              <select className="border rounded p-2" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}>
                <option>Any</option>
                <option>New</option>
                <option>Modern</option>
                <option>Old</option>
              </select>
              <select className="border rounded p-2" value={form.furnishing} onChange={(e) => setForm({ ...form, furnishing: e.target.value })}>
                <option>None</option>
                <option>Semi</option>
                <option>Full</option>
              </select>
              <select className="border rounded p-2" value={form.petPolicy} onChange={(e) => setForm({ ...form, petPolicy: e.target.value })}>
                <option>Allowed</option>
                <option>Not allowed</option>
              </select>
            </div>
            <input className="w-full border rounded p-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <select className="border rounded p-2 w-full" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Draft</option>
              <option>Published</option>
            </select>
            <button onClick={handleSave} className="w-full bg-[#0e1f42] text-white py-2 rounded hover:opacity-90">
              {editingId ? 'Update Property' : 'Save Property'}
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white border border-gray-100 rounded-lg shadow p-4 lg:col-span-2">
          <h3 className="font-semibold text-[#0e1f42] mb-3">Properties List</h3>
          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-2">Title</th>
                  <th className="py-2 pr-2">Location</th>
                  <th className="py-2 pr-2">Type</th>
                  <th className="py-2 pr-2">Beds</th>
                  <th className="py-2 pr-2">Rent</th>
                  <th className="py-2 pr-2">Status</th>
                  <th className="py-2 pr-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((prop) => (
                  <tr key={prop.id} className="border-b last:border-0">
                    <td className="py-2 pr-2 font-semibold text-[#0e1f42]">{prop.title}</td>
                    <td className="py-2 pr-2 text-gray-700">{prop.state} / {prop.area} / {prop.location}</td>
                    <td className="py-2 pr-2 text-gray-700">{prop.type}</td>
                    <td className="py-2 pr-2 text-gray-700">{prop.bedrooms}</td>
                    <td className="py-2 pr-2 text-gray-700">₦{prop.rent?.toLocaleString?.()}</td>
                    <td className="py-2 pr-2">
                      <span className={`px-2 py-1 rounded text-xs ${prop.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="py-2 pr-2">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(prop.id)} className="text-[#0e1f42] hover:underline">Edit</button>
                        <button
                          onClick={() => setProperties((prev) => prev.map((p) => p.id === prop.id ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' } : p))}
                          className="text-[#9f7539] hover:underline"
                        >
                          {prop.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;
