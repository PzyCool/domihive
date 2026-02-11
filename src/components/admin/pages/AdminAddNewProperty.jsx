import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext";
import { Upload, ChevronRight, Video, Image } from "lucide-react";

const emptyForm = {
    id: "",
    title: "",
    description: "",
    state: "Lagos",
    area: "",
    location: "",
    address: "",
    estateType: "Estate Managed", // "Non Estate"
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    size: "",
    rent: "",
    caution: "",
    billsIncluded: false,
    billsNote: "",
    clientId: "",
    contactId: "",
    amenities: [],
    status: "Draft",
    images: [],
    video: null,
};

const AMENITIES = [
    "Parking",
    "Water Supply",
    "CCTV",
    "Security",
    "Swimming Pool",
    "Generator",
    "Gym",
    "Fence",
    "Gate",
];

const Section = ({ title, children }) => (
    <section className="rounded-md border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-[#0e1f42]">{title}</h3>
        </div>
        <div className="p-4">{children}</div>
    </section>
);

const AdminAddNewProperty = () => {
    const navigate = useNavigate();
    const { properties, setProperties, locations } = useAdmin();

    const [form, setForm] = useState(emptyForm);

    const areas = useMemo(
        () => locations?.areas?.[form.state] || [],
        [locations?.areas, form.state]
    );
    const locs = useMemo(
        () => locations?.locations?.[form.area] || [],
        [locations?.locations, form.area]
    );

    const toggleAmenity = (name) => {
        setForm((prev) => {
            const has = prev.amenities.includes(name);
            return {
                ...prev,
                amenities: has
                    ? prev.amenities.filter((x) => x !== name)
                    : [...prev.amenities, name],
            };
        });
    };

    const save = (publish = false) => {
        if (!form.title.trim()) return;

        const payload = {
            ...form,
            status: publish ? "Published" : "Draft",
            id: `prop-${Date.now()}`,
        };

        setProperties((prev) => [payload, ...prev]);
        setForm(emptyForm);

        // navigate("/admin/properties");
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="hover:text-gray-700 cursor-pointer" onClick={() => navigate("/admin/properties")}>
                            Properties
                        </span>
                        <ChevronRight size={14} />
                        <span className="text-gray-700 font-medium">Add New Property</span>
                    </div>

                    <h1 className="text-2xl font-bold text-[#0e1f42] my-2">Add New Property</h1>
                    <p className="text-sm text-gray-600 mb-8">
                        Create a new property listing with detailed information
                    </p>
                </div>
            </div>

            {/* Form layout */}
            <div className="space-y-4">
                {/* Basic Info */}
                <Section title="Basic Information">
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600">Property Title</label>
                            <input
                                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                placeholder="e.g. 3 Bedroom Luxury Apartment"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-600">Property Description</label>
                            <textarea
                                className="mt-1 w-full min-h-[110px] rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                placeholder="Provide a detailed description of the property, including key features and amenities..."
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-600">Type</label>
                                <select
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                >
                                    {(locations?.propertyTypes || ["Apartment", "Duplex", "Studio"]).map((t) => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Bedrooms</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                    value={form.bedrooms}
                                    onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Bathrooms</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                    value={form.bathrooms}
                                    onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Size (sqm)</label>
                                <input
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                    placeholder="e.g. 120"
                                    value={form.size}
                                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                                <label className="text-xs font-medium text-gray-600">Annual Rent (₦)</label>
                                <input
                                    type="number"
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                    placeholder="e.g. 2800000"
                                    value={form.rent}
                                    onChange={(e) => setForm({ ...form, rent: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-600">Caution Fee (₦)</label>
                                <input
                                    type="number"
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                    placeholder="e.g. 500000"
                                    value={form.caution}
                                    onChange={(e) => setForm({ ...form, caution: e.target.value })}
                                />
                            </div>

                            <div className="flex items-end gap-2">
                                <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={form.billsIncluded}
                                        onChange={(e) => setForm({ ...form, billsIncluded: e.target.checked })}
                                    />
                                    Bills Included
                                </label>
                            </div>
                        </div>

                        {form.billsIncluded && (
                            <div>
                                <label className="text-xs font-medium text-gray-600">Bills Note</label>
                                <input
                                    className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                    placeholder="e.g. service charge included"
                                    value={form.billsNote}
                                    onChange={(e) => setForm({ ...form, billsNote: e.target.value })}
                                />
                            </div>
                        )}
                    </div>
                </Section>

                {/* Location */}
                <Section title="Location">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600">State</label>
                            <select
                                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                value={form.state}
                                onChange={(e) =>
                                    setForm({ ...form, state: e.target.value, area: "", location: "" })
                                }
                            >
                                {(locations?.states || ["Lagos"]).map((s) => (
                                    <option key={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-600">Area</label>
                            <select
                                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                value={form.area}
                                onChange={(e) => setForm({ ...form, area: e.target.value, location: "" })}
                            >
                                <option value="">Select Area</option>
                                {areas.map((a) => (
                                    <option key={a}>{a}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-600">Location</label>
                            <select
                                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                            >
                                <option value="">Select Location</option>
                                {locs.map((l) => (
                                    <option key={l}>{l}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Section>

                {/* Address Details */}
                <Section title="Address Details">
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600">Street Address</label>
                            <input
                                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                placeholder="e.g. Plot 23, Adeyinka Road"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-600">Estate Type</label>
                            <div className="mt-2 flex items-center gap-6">
                                {["Estate Managed", "Non Estate"].map((opt) => (
                                    <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="radio"
                                            name="estateType"
                                            checked={form.estateType === opt}
                                            onChange={() => setForm({ ...form, estateType: opt })}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Client & Contact */}
                <Section title="Client & Contact">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600">Select Client</label>
                            <select
                                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                value={form.clientId}
                                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                            >
                                <option value="">Search and select client...</option>
                                {/* wire this to your real clients later */}
                                <option value="client-001">Chioma Okeke</option>
                                <option value="client-002">Tunde Balogun</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-600">Link to Contact</label>
                            <select
                                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#9F7539]"
                                value={form.contactId}
                                onChange={(e) => setForm({ ...form, contactId: e.target.value })}
                            >
                                <option value="">Select active contact...</option>
                                <option value="contact-001">Primary Contact</option>
                                <option value="contact-002">Secondary Contact</option>
                            </select>
                        </div>
                    </div>
                </Section>

                {/* Property Features */}
                <Section title="Property Features">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {AMENITIES.map((a) => (
                            <label key={a} className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={form.amenities.includes(a)}
                                    onChange={() => toggleAmenity(a)}
                                    className="accent-(--accent-color)"
                                />
                                {a}
                            </label>
                        ))}
                    </div>
                </Section>

                {/* Media Upload */}
                <Section title="Media Upload">
                    <div className="space-y-4">
                        {/* Photos */}
                        <div>
                            <label className="text-xs font-medium text-gray-600">Property Photos</label>
                            <div className="mt-2 rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                                <div className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200">
                                    <Image size={18} className="text-gray-500" />
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Drag multiple images here or click to upload
                                </p>
                                <p className="mt-1 text-[11px] text-gray-400">PNG, JPG up to 5MB each</p>

                                <div className="mt-3 flex justify-center">
                                    <label className="inline-flex items-center justify-center rounded-md border border-(--accent-color) bg-white px-3 py-2 text-xs font-semibold text-(--accent-color) hover:bg-gray-100 cursor-pointer">
                                        Choose Images
                                        <input
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={(e) =>
                                                setForm({ ...form, images: Array.from(e.target.files || []) })
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Video */}
                        <div>
                            <label className="text-xs font-medium text-gray-600">Property Video (Optional)</label>
                            <div className="mt-2 rounded-md border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                                <div className="mx-auto flex w-10 h-10 items-center justify-center rounded-full bg-white border border-gray-200">
                                    <Video size={18} className="text-gray-500" />
                                </div>
                                <p className="mt-2 text-sm text-gray-600">Upload property video</p>
                                <p className="mt-1 text-[11px] text-gray-400">MP4 up to 50MB</p>

                                <div className="mt-3 flex justify-center">
                                    <label className="inline-flex border-(--accent-color) items-center justify-center rounded-md border text-(--accent-color) bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-100 cursor-pointer">
                                        Choose Video
                                        <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                            onChange={(e) => setForm({ ...form, video: e.target.files?.[0] || null })}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <button
                    onClick={() => save(false)}
                    className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    Save as Draft
                </button>
                <button
                    onClick={() => save(true)}
                    className="rounded-md bg-[#9F7539] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b58a4a]"
                >
                    Create Property
                </button>
            </div>
        </div>
    );
};

export default AdminAddNewProperty;
