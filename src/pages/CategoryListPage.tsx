import React from 'react';
import { ChevronRight, ArrowRight, Layers, Tag } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useApp } from '../context/AppContext';

interface Props {
  onSelectCategory: (slug: string) => void;
}

export const CategoryListPage: React.FC<Props> = ({ onSelectCategory }) => {
  const { listings } = useApp();
  const publishedListings = listings.filter(l => l.status === 'published');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
          Complete Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          All Philmen Categories
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Browse our 3 official product and service sectors. All inventory and service requests are centrally coordinated and verified by Philmen.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map(category => {
          const categoryListings = publishedListings.filter(l => l.category === category.name);
          const count = categoryListings.length;

          return (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-lg transition-all p-6 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md">
                    {count} {count === 1 ? 'Listing' : 'Listings'} Available
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors font-display mb-2">
                  {category.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {category.description}
                </p>

                {/* Subcategories list */}
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Subcategories:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.subcategories.map(sub => (
                        <span
                          key={sub}
                          className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-sm"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>View {category.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
