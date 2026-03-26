import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";

const initialForm = {
  title: "",
  description: "",
  state: "Lagos",
  area: "",
  location: "",
  address: "",
  estateType: "Estate",
  type: "Apartment",
  clientId: "",
  contractId: "",
  status: "Draft",
  amenities: [],
  image: "",
};

const Section = ({ title, children }) => (
  <section className="rounded-md border border-gray-200 dark:border-white/5 bg-white dark:bg-[#111827] transition-colors">
    <div className="border-b border-gray-100 dark:border-white/5 px-4 py-3">
      <h3 className="text-sm font-semibold text-[#0e1f42] dark:text-white">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </section>
);

export default function AdminAddNewProperty() {
  const navigate = useNavigate();
  const { properties, setProperties, locations, clients, setClients } = useAdmin();
  const [form, setForm] = useState(initialForm);

  const areas = useMemo(
    () => locations?.areas?.[form.state] || [],
    [locations?.areas, form.state]
  );
  const locs = useMemo(
    () => locations?.locations?.[form.area] || [],
    [locations?.locations, form.area]
  );
  const propertyTypes = locations?.propertyTypes || ["Apartment", "Duplex", "Studio"];
  const amenities = locations?.amenities || ["Parking", "Security", "Water"];

  const toggleAmenity = (name) => {
    setForm((prev) => {
      const hasAmenity = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: hasAmenity
          ? prev.amenities.filter((item) => item !== name)
          : [...prev.amenities, name],
      };
    });
  };

  const handleCreateProperty = () => {
    if (!form.title.trim()) return;
    if (!form.clientId) return;

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      state: form.state,
      area: form.area,
      location: form.location,
      address: form.address,
      estateType: form.estateType,
      tag: form.estateType,
      type: form.type,
      status: form.status,
      clientId: form.clientId,
      contractId: form.contractId || null,
      amenities: form.amenities,
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1400&h=800&fit=crop",
      units: [],
      bedrooms: 0,
      bathrooms: 0,
      rent: 0,
    };

    setProperties([newProperty, ...properties]);
    setClients((prev) =>
      prev.map((client) =>
        client.id === form.clientId
          ? {
              ...client,
              pendingPropertyAssignment: false,
              pendingPropertyAssignmentNote: "",
            }
          : client
      )
    );
    navigate("/admin/properties");
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="hover:text-[#9F7539] cursor-pointer" onClick={() => navigate("/admin")}>
            Admin
          </span>
          <ChevronRight size={13} />
          <span className="hover:text-[#9F7539] cursor-pointer" onClick={() => navigate("/admin/properties")}>
            Properties
          </span>
          <ChevronRight size={13} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">Add New Property</span>
        </div>

        <h1 className="text-2xl font-bold text-[#0e1f42] dark:text-white mt-2">Add New Property</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Create a building/estate container. Units can be added after property creation.
        </p>
      </div>

      <div className="space-y-4">
        <Section title="Property Basics">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Property Owner</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539] cursor-pointer"
                value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
              >
                <option value="" className="dark:bg-[#111827]">Select Property Owner</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id} className="dark:bg-[#111827]">
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Property Name / Building Title</label>
              <input
                className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                placeholder="e.g. Chukwudi Gardens"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Description</label>
              <textarea
                className="mt-1 w-full min-h-[100px] rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                placeholder="Short property summary for admin records"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Property Type</label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539] cursor-pointer"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {propertyTypes.map((type) => (
                    <option key={type} className="dark:bg-[#111827]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Estate Tag</label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539] cursor-pointer"
                  value={form.estateType}
                  onChange={(e) => setForm({ ...form, estateType: e.target.value })}
                >
                  <option value="Estate" className="dark:bg-[#111827]">Estate</option>
                  <option value="Non-estate" className="dark:bg-[#111827]">Non-estate</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Publish Status</label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539] cursor-pointer"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="Draft" className="dark:bg-[#111827]">Draft</option>
                  <option value="Published" className="dark:bg-[#111827]">Published</option>
                </select>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Location">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">State</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539] cursor-pointer"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value, area: "", location: "" })}
              >
                {(locations?.states || ["Lagos"]).map((state) => (
                  <option key={state} className="dark:bg-[#111827]">
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Area</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539] cursor-pointer"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value, location: "" })}
              >
                <option value="" className="dark:bg-[#111827]">Select Area</option>
                {areas.map((area) => (
                  <option key={area} className="dark:bg-[#111827]">
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Location</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539] cursor-pointer"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              >
                <option value="" className="dark:bg-[#111827]">Select Location</option>
                {locs.map((location) => (
                  <option key={location} className="dark:bg-[#111827]">
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Full Address</label>
            <input
              className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
              placeholder="e.g. 12 Allen Avenue, Ikeja GRA"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </Section>

        <Section title="Amenities & Cover">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
            {amenities.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Cover Image URL</label>
            <input
              className="mt-1 w-full rounded-md border border-gray-200 dark:border-white/10 bg-transparent dark:text-white px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
        </Section>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={() => navigate("/admin/properties")}
          className="rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateProperty}
          className="rounded-md bg-[#9F7539] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b58a4a] transition-colors cursor-pointer"
        >
          Create Property
        </button>
      </div>
    </div>
  );
}

