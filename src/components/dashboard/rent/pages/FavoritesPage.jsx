import React from 'react';
import { useProperties } from '../contexts/PropertiesContext';
import PropertyGrid from '../components/browse-properties/components/PropertyGrid/PropertyGrid';

const FavoritesPage = () => {
  const { favoriteProperties, toggleFavorite, isFavorite } = useProperties();

  const handleFavoriteToggle = (property) => toggleFavorite(property);

  return (
    <div className="p-4 md:p-6 bg-[var(--light-gray,#f8f9fa)] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="bg-white rounded-xl shadow-md border border-[var(--gray-light,#e2e8f0)] p-5">
          <h1 className="text-2xl font-bold text-[var(--primary-color,#0e1f42)]">Favorites</h1>
          <p className="text-sm text-[var(--gray,#6c757d)]">Saved properties will appear here.</p>
        </div>

        {favoriteProperties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-light,#e2e8f0)] p-6 text-[var(--gray,#6c757d)]">
            No favorites yet. Browse properties and tap the heart icon to save homes you like.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[var(--gray-light,#e2e8f0)] p-4 md:p-6">
            <PropertyGrid
              properties={favoriteProperties.map((p) => ({ ...p, isFavorite: isFavorite(p.id || p.propertyId) }))}
              onFavoriteToggle={handleFavoriteToggle}
              onPropertyClick={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
