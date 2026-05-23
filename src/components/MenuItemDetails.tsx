import React from 'react';
import { X, Wine, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem } from '../data';

interface MenuItemDetailsProps {
  item: MenuItem;
  lang: 'en' | 'fr';
  onClose: () => void;
  onAddToPlanner: (item: MenuItem) => void;
  isInPlanner: boolean;
}

export default function MenuItemDetails({ item, lang, onClose, onAddToPlanner, isInPlanner }: MenuItemDetailsProps) {
  // Simple translations for detail labels
  const t = {
    en: {
      ingredients: 'Ingredients',
      chefNotes: 'Chef’s Notes',
      winePairing: 'Curated Wine Match',
      allergenDietary: 'Dietary & Allergen Profile',
      addToPlan: 'Add to Booking Interest',
      removeFromPlan: 'Remove from Booking Interest',
      addedToPlan: 'Added to Booking Interest',
      close: 'Close Details'
    },
    fr: {
      ingredients: 'Ingrédients',
      chefNotes: 'Notes du Chef',
      winePairing: 'Accord Mets & Vins',
      allergenDietary: 'Régime et Allergènes',
      addToPlan: 'Ajouter à mes intentions',
      removeFromPlan: 'Retirer des intentions',
      addedToPlan: 'Ajouté aux intentions',
      close: 'Fermer les détails'
    }
  }[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Container Card */}
      <div className="relative z-10 w-full max-w-lg bg-[#0e0e0e] border border-gold/20 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-fade-in origin-center">
        {/* Border Detail (Parisian Classic Accent) */}
        <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#888888] hover:text-white bg-black/40 border border-white/5 rounded-full p-1.5 transition-colors pointer-events-auto"
          aria-label={t.close}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#777777] uppercase">
              {item.category === 'mains' ? (lang === 'en' ? 'Authentic Main' : 'Plat Authentique') : 
               item.category === 'desserts' ? 'Dessert Artisan' : (lang === 'en' ? 'House Drink' : 'Boisson de la Maison')}
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white mt-1">
              {item.name}
            </h3>
            {item.frenchName && (
              <p className="font-serif italic text-gold text-sm mt-0.5">
                {item.frenchName}
              </p>
            )}
            
            {/* Price line */}
            <div className="mt-3 flex items-center gap-4 text-xs font-mono">
              {item.prices.single && (
                <span className="text-[#eeeeee] bg-white/5 px-2.5 py-1 rounded">
                  {lang === 'en' ? 'Prix: ' : 'Tarif: '} {item.prices.single}
                </span>
              )}
              {item.prices.solo && (
                <span className="text-[#eeeeee] bg-white/5 px-2.5 py-1 rounded">
                  Solo: {item.prices.solo}
                </span>
              )}
              {item.prices.sharing && (
                <span className="text-[#eeeeee] bg-white/5 px-2.5 py-1 rounded">
                  {lang === 'en' ? 'Sharing: ' : 'Partage: '} {item.prices.sharing}
                </span>
              )}
              {item.prices.custom && (
                <span className="text-[#eeeeee] bg-white/5 px-2.5 py-1 rounded">
                  {item.prices.custom}
                </span>
              )}
            </div>
          </div>

          <hr className="my-6 border-[#222222]" />

          {/* Epicurean Description */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono tracking-wider text-amber-500/80 uppercase flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {t.chefNotes}
              </h4>
              <p className="text-sm text-[#cccccc] leading-relaxed font-sans">
                {item.description}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="text-xs font-mono tracking-wider text-[#999999] uppercase mb-2">
                {t.ingredients}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs text-[#bbbbbb] bg-[#161616] border border-[#222222] px-2 py-0.5 rounded"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Pairings */}
            {item.pairing && (
              <div className="p-3 bg-[#16130d] border border-gold/10 rounded flex gap-3 items-start">
                <Wine className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono text-gold font-medium uppercase tracking-wide">
                    {t.winePairing}
                  </h4>
                  <p className="text-xs text-[#dddddd] mt-1 font-sans">
                    {item.pairing}
                  </p>
                </div>
              </div>
            )}

            {/* Allergens / Dietary */}
            {item.badges.length > 0 && (
              <div>
                <h4 className="text-xs font-mono tracking-wider text-[#999999] uppercase mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#555555]" />
                  {t.allergenDietary}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {item.badges.map((badge, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] uppercase tracking-wider font-mono text-[#888888] bg-[#0c0c0c] border border-[#ffffff]/5 px-2 py-1 rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <hr className="my-6 border-[#222222]" />

          {/* Action: Add to dining interest */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-white border border-[#222222] px-4 py-2.5 rounded transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onAddToPlanner(item)}
              className={`text-xs font-mono uppercase tracking-widest px-4 py-2.5 rounded transition-all flex items-center gap-2 cursor-pointer ${
                isInPlanner 
                  ? 'bg-amber-950/40 border border-amber-600/60 text-amber-300' 
                  : 'bg-gold hover:bg-[#b08d24] text-black font-semibold'
              }`}
            >
              {isInPlanner ? t.removeFromPlan : t.addToPlan}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
