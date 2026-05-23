import React, { useState } from 'react';
import { Search, Info, Sparkles, Filter, Bookmark, Wine } from 'lucide-react';
import { menuItems, MenuItem } from '../data';

interface MenuSectionProps {
  lang: 'en' | 'fr';
  onItemSelect: (item: MenuItem) => void;
  plannerItems: MenuItem[];
  onReservationsClick: () => void;
}

export default function MenuSection({ lang, onItemSelect, plannerItems, onReservationsClick }: MenuSectionProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'veg' | 'gf' | 'vegan'>('all');

  const mains = menuItems.filter((i) => i.category === 'mains');
  const desserts = menuItems.filter((i) => i.category === 'desserts');
  const drinks = menuItems.filter((i) => i.category === 'drinks');

  const matchesSearchAndFilter = (item: MenuItem) => {
    // 1. Filter Check
    if (activeFilter === 'veg' && !item.badges.some((b) => b.toLowerCase().includes('vegetarian'))) return false;
    if (activeFilter === 'gf' && !item.badges.some((b) => b.toLowerCase().includes('gluten-free'))) return false;
    if (activeFilter === 'vegan' && !item.badges.some((b) => b.toLowerCase().includes('vegan'))) return false;

    // 2. Search Check
    if (!search) return true;
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.frenchName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(query))
    );
  };

  const t = {
    en: {
      mainsHeading: 'MAINS',
      dessertsHeading: 'DESSERTS',
      drinksHeading: 'DRINKS',
      soloHeader: 'Solo',
      sharingHeader: 'Sharing',
      searchPlh: 'Search ingredients, French names...',
      filterAll: 'La Carte (All)',
      filterVeg: 'Vegetarian',
      filterGF: 'Gluten-Free',
      filterVegan: 'Vegan',
      menuHint: 'Tap any selection to view Chef notes, detailed ingredients, and sommelier wine pairings.',
      plannerBanner: 'You have chosen {{count}} interest(s) for your reservation.'
    },
    fr: {
      mainsHeading: 'PLATS',
      dessertsHeading: 'DESSERTS',
      drinksHeading: 'BOISSONS',
      soloHeader: 'Individuel',
      sharingHeader: 'À Partager',
      searchPlh: 'Rechercher ingrédients, noms...',
      filterAll: 'La Carte (Tout)',
      filterVeg: 'Végétarien',
      filterGF: 'Sans Gluten',
      filterVegan: 'Végane',
      menuHint: 'Cliquez sur un plat pour voir les notes du Chef, les allergènes et les accords mets & vins.',
      plannerBanner: 'Vous avez sélectionné {{count}} plat(s) pour votre réservation.'
    }
  }[lang];

  return (
    <section className="bg-black py-16 text-[#dddddd]">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* INTERACTIVE CONTROLS (Search & Filters) */}
        <div className="mb-14 space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#555555]" />
              <input
                type="text"
                placeholder={t.searchPlh}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#222222] focus:border-gold/45 text-white placeholder-[#555555] rounded-md pl-10 pr-4 py-2.5 font-mono text-xs outline-none transition-all"
              />
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['all', 'veg', 'gf', 'vegan'] as const).map((mode) => {
                const label = mode === 'all' ? t.filterAll : mode === 'veg' ? t.filterVeg : mode === 'gf' ? t.filterGF : t.filterVegan;
                return (
                  <button
                    key={mode}
                    onClick={() => setActiveFilter(mode)}
                    className={`px-3 py-2 rounded font-mono text-[10px] uppercase tracking-wider border whitespace-nowrap cursor-pointer transition-all ${
                      activeFilter === mode
                        ? 'bg-[#d4af37]/15 border-gold/50 text-gold font-bold shadow-[0_0_10px_rgba(212,175,55,0.08)]'
                        : 'bg-black border-[#222222] text-[#888888] hover:text-[#cccccc]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Epicurean Help Text */}
          <p className="text-center text-[11px] font-sans text-gold/60 italic tracking-wide">
            ✧ {t.menuHint}
          </p>
        </div>


        {/* MAINS */}
        <div id="menu-mains" className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-mono text-[14px] font-semibold tracking-[0.4em] text-white my-3 relative inline-block">
              {t.mainsHeading}
            </h3>
          </div>

          <div className="space-y-6">
            {mains.filter(matchesSearchAndFilter).map((item) => (
              <div 
                key={item.id}
                onClick={() => onItemSelect(item)}
                className="group cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between transition-all duration-200"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between gap-2.5">
                    <span className="font-mono text-sm tracking-wider font-semibold group-hover:text-gold transition-colors text-[#eeeeee]">
                      {item.name.toUpperCase()}
                    </span>
                    <span className="flex-1 border-b border-[#222222] group-hover:border-gold/30 border-dashed mx-2 transition-colors" />
                    <span className="font-mono text-sm font-semibold text-white">
                      {item.prices.single}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-serif italic text-[#777777] group-hover:text-amber-500/80 transition-colors">
                      {item.frenchName}
                    </span>
                    {plannerItems.some((p) => p.id === item.id) && (
                      <Bookmark className="w-3 h-3 text-gold fill-gold/20" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* DESSERTS */}
        <div id="menu-desserts" className="mb-16">
          <div className="text-center mb-6">
            <h3 className="font-mono text-[14px] font-semibold tracking-[0.4em] text-white my-3 relative inline-block">
              {t.dessertsHeading}
            </h3>
          </div>

          {/* Grid Titles for Desserts */}
          <div className="flex justify-end gap-x-12 pr-1 mb-3 text-[11px] font-mono tracking-widest text-[#666666] border-b border-[#111111] pb-1">
            <span className="w-16 text-right">{t.soloHeader}</span>
            <span className="w-16 text-right">{t.sharingHeader}</span>
          </div>

          <div className="space-y-6">
            {desserts.filter(matchesSearchAndFilter).map((item) => (
              <div 
                key={item.id}
                onClick={() => onItemSelect(item)}
                className="group cursor-pointer flex justify-between items-baseline gap-4 py-1.5 transition-all duration-200"
              >
                {/* Product Titles */}
                <div className="flex-1">
                  <span className="font-mono text-sm tracking-wider font-semibold group-hover:text-gold transition-colors text-[#eeeeee] block">
                    {item.name.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-serif italic text-[#777777] group-hover:text-amber-500/80 transition-colors block">
                      {item.frenchName}
                    </span>
                    {plannerItems.some((p) => p.id === item.id) && (
                      <Bookmark className="w-3 h-3 text-gold fill-gold/20" />
                    )}
                  </div>
                </div>

                {/* Split Price lines */}
                <div className="flex gap-x-12 shrink-0 font-mono text-sm font-semibold">
                  <span className="w-16 text-right text-white font-mono group-hover:text-gold/90 transition-colors">
                    {item.prices.solo}
                  </span>
                  <span className="w-16 text-right text-white font-mono group-hover:text-gold/90 transition-colors">
                    {item.prices.sharing}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* DRINKS */}
        <div id="menu-drinks" className="mb-12">
          <div className="text-center mb-8">
            <h3 className="font-mono text-[14px] font-semibold tracking-[0.4em] text-white my-3 relative inline-block">
              {t.drinksHeading}
            </h3>
          </div>

          <div className="space-y-6">
            {drinks.filter(matchesSearchAndFilter).map((item) => (
              <div 
                key={item.id}
                onClick={() => onItemSelect(item)}
                className="group cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between transition-all duration-200"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between gap-2.5">
                    <span className="font-mono text-sm tracking-wider font-semibold group-hover:text-gold transition-colors text-[#eeeeee]">
                      {item.name.toUpperCase()}
                    </span>
                    <span className="flex-1 border-b border-[#222222] group-hover:border-gold/30 border-dashed mx-2 transition-colors" />
                    <span className="font-mono text-sm font-semibold text-white">
                      {item.prices.single || item.prices.custom}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-serif italic text-[#777777] group-hover:text-amber-500/80 transition-colors">
                      {item.frenchName}
                    </span>
                    {plannerItems.some((p) => p.id === item.id) && (
                      <Bookmark className="w-3 h-3 text-gold fill-gold/20" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Reservation Callout to bind selections */}
        {plannerItems.length > 0 && (
          <div className="bg-[#12100b] border border-gold/15 rounded-md p-4 flex flex-col sm:flex-row justify-between items-center gap-3 animate-fade-in mt-14 shadow-lg">
            <span className="text-xs font-mono text-[#cccccc]">
              {t.plannerBanner.replace('{{count}}', plannerItems.length.toString())}
            </span>
            <button
              onClick={onReservationsClick}
              className="bg-gold hover:bg-[#b08d24] text-black font-mono text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded transition-all cursor-pointer shadow-md shrink-0"
            >
              {lang === 'en' ? 'Open Reservation' : 'Finaliser ma Réservation'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
