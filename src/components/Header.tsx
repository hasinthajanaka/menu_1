import React from 'react';
import { Globe, Clock, MapPin } from 'lucide-react';
import InteractiveAudio from './InteractiveAudio';

interface HeaderProps {
  lang: 'en' | 'fr';
  setLang: (lang: 'en' | 'fr') => void;
  onReservationsClick: () => void;
}

export default function Header({ lang, setLang, onReservationsClick }: HeaderProps) {
  return (
    <header className="relative z-30 w-full bg-gradient-to-b from-black/80 to-transparent">
      {/* Upper Info Strip */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center border-b border-[#ffffff]/5">
        <div className="flex items-center gap-6 text-[11px] font-mono tracking-wider text-[#aaaaaa]">
          <span className="flex items-center gap-1.5 sm:inline-flex hidden">
            <Clock className="w-3.5 h-3.5 text-amber-500/80" />
            {lang === 'en' ? 'Open daily: 12 PM — 11:30 PM' : 'Ouvert tous les jours : 12h — 23h30'}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-500/80" />
            <a 
              href="#location-details" 
              className="hover:text-gold transition-colors"
            >
              30 Rue de l'Ancienne Comédie, Paris
            </a>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sound toggler */}
          <InteractiveAudio />
          
          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-[#121212]/90 border border-gold/10 px-2.5 py-1 rounded-full text-xs font-mono">
            <Globe className="w-3 h-3 text-[#999999]" />
            <button
              id="lang_en_toggle"
              onClick={() => setLang('en')}
              className={`px-1.5 py-0.5 rounded transition-colors duration-150 ${
                lang === 'en' 
                  ? 'text-amber-400 font-bold' 
                  : 'text-[#666666] hover:text-[#999999]'
              }`}
            >
              EN
            </button>
            <span className="text-[#333333]">|</span>
            <button
              id="lang_fr_toggle"
              onClick={() => setLang('fr')}
              className={`px-1.5 py-0.5 rounded transition-colors duration-150 ${
                lang === 'fr' 
                  ? 'text-amber-400 font-bold' 
                  : 'text-[#666666] hover:text-[#999999]'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Marque */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <a href="#" className="flex flex-col">
          <span className="font-serif text-2xl tracking-[0.18em] text-white font-medium">
            LA LUNE
          </span>
          <span className="text-[9px] font-mono tracking-[0.4em] text-gold uppercase text-center mt-0.5">
            French Bistro
          </span>
        </a>
        
        <nav className="sm:flex hidden items-center gap-8 text-[12px] uppercase tracking-[0.2em] font-mono text-[#cccccc]">
          <a href="#menu-mains" className="hover:text-white hover:underline underline-offset-4 decoration-gold/60 transition-colors">
            {lang === 'en' ? 'Mains' : 'Plats'}
          </a>
          <a href="#menu-desserts" className="hover:text-white hover:underline underline-offset-4 decoration-gold/60 transition-colors">
            {lang === 'en' ? 'Desserts' : 'Desserts'}
          </a>
          <a href="#menu-drinks" className="hover:text-white hover:underline underline-offset-4 decoration-gold/60 transition-colors">
            {lang === 'en' ? 'Drinks' : 'Boissons'}
          </a>
          <a href="#location-details" className="hover:text-white hover:underline underline-offset-4 decoration-gold/60 transition-colors">
            {lang === 'en' ? 'Story' : 'Notre Histoire'}
          </a>
        </nav>

        <div>
          <button
            id="book_table_nav"
            onClick={onReservationsClick}
            className="border border-[#d4af37]/60 hover:border-[#d4af37] text-gold bg-black/40 hover:bg-[#d4af37]/10 transition-all font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-md hover:shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-pointer"
          >
            {lang === 'en' ? 'Book a Table' : 'Réserver'}
          </button>
        </div>
      </div>
    </header>
  );
}
