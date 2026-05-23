/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import OurStory from './components/OurStory';
import MenuItemDetails from './components/MenuItemDetails';
import ReservationModal from './components/ReservationModal';
import { MenuItem } from './data';

// Import our custom generated high-quality French food hero image
import heroImage from './assets/images/la_lune_hero_1779510091366.png';

export default function App() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [plannerItems, setPlannerItems] = useState<MenuItem[]>([]);

  const handleTogglePlannerItem = (item: MenuItem) => {
    setPlannerItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemovePlannerItem = (item: MenuItem) => {
    setPlannerItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  const t = {
    en: {
      siteTitle: 'LA LUNE',
      siteSubtitle: 'FRENCH BISTRO',
      heroSlogan: 'A TASTE OF PARIS',
      heroSubSlogan: 'A rustic, candle-lit sensory escape, right in the historic heart of Paris.',
      ctaButton: 'Dine with us',
      footerHours: 'OPERATING HOURS',
      footerDays: 'Closed Sunday Morning | Mon — Sat: 12:00 PM — 11:30 PM',
      footerPolicy: 'Smart elegant attire advised. Reservations are virtual and client-side saved.',
      mains: 'Mains',
      desserts: 'Desserts',
      drinks: 'Drinks',
      story: 'Story',
    },
    fr: {
      siteTitle: 'LA LUNE',
      siteSubtitle: 'BISTROT FRANÇAIS',
      heroSlogan: 'UNE SAVEUR DE PARIS',
      heroSubSlogan: 'Une échappée sensorielle rustique et chaleureuse, au cœur même du Paris historique.',
      ctaButton: 'Dine with us', // In the prompt's reference image, it literally says "Dine with us" in English! We preserve this beautiful detail exactly.
      footerHours: 'HEURES D’OUVERTURE',
      footerDays: 'Fermé le Dimanche Matin | Lun — Sam : 12h00 — 23h30',
      footerPolicy: 'Tenue correcte exigée. Réservations virtuelles et enregistrées en local.',
      mains: 'Plats',
      desserts: 'Desserts',
      drinks: 'Boissons',
      story: 'Story',
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-[#eeeeee] flex flex-col font-sans select-none antialiased">
      {/* Floating Header */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        onReservationsClick={() => setIsReservationOpen(true)} 
      />

      {/* HERO SCENE */}
      <section className="relative h-[85vh] sm:h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="La Lune French Pastries and Bistro Table"
            className="w-full h-full object-cover origin-center scale-105 select-none pointer-events-none filter brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Moody Black Vignette & Soft Gradient Overlay to blend text with background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Copy (Matches original design exactly, but with added polish) */}
        <div className="relative z-10 text-center px-6 max-w-4xl space-y-4 md:space-y-6 flex flex-col items-center animate-fade-in mt-12">
          
          <span className="font-mono text-xs sm:text-sm tracking-[0.45em] text-[#eeeeee] uppercase">
            {lang === 'en' ? 'LA LUNE FRENCH BISTRO' : 'LA LUNE BISTROT FRANÇAIS'}
          </span>
          
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-medium tracking-[0.15em] text-white my-2 uppercase select-text leading-none">
            {t.heroSlogan}
          </h1>
          
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-amber-500/90 font-light tracking-wide max-w-xl mx-auto -mt-1">
            {t.heroSubSlogan}
          </p>

          <button
            id="dine_with_us_hero"
            onClick={() => setIsReservationOpen(true)}
            className="bg-white hover:bg-neutral-100 text-black font-sans text-xs sm:text-sm font-semibold tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(255,255,255,0.15)] cursor-pointer mt-4"
          >
            {t.ctaButton}
          </button>
        </div>

        {/* Anchor point to scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[9px] font-mono tracking-widest text-[#aaaaaa] uppercase">
            {lang === 'en' ? 'View Menu' : 'Découvrir la carte'}
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent animate-bounce" />
        </div>

      </section>

      {/* CORE MENU PANEL */}
      <main className="flex-1 bg-black">
        <MenuSection
          lang={lang}
          onItemSelect={(item) => setSelectedDetailItem(item)}
          plannerItems={plannerItems}
          onReservationsClick={() => setIsReservationOpen(true)}
        />
        
        {/* OUR STORY & METRIC PARIS MAP */}
        <OurStory lang={lang} />
      </main>

      {/* EXQUISITE CULINARY FOOTER */}
      <footer className="bg-[#050505] border-t border-[#111111] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo Brand */}
          <div className="text-center md:text-left">
            <span className="font-serif text-lg tracking-[0.2em] text-white block">
              LA LUNE
            </span>
            <span className="text-[8px] font-mono tracking-[0.3em] text-gold uppercase block mt-1">
              {lang === 'en' ? 'PARIS BISTRONOMY' : 'GASTRONOMIE PARISIENNE'}
            </span>
          </div>

          {/* Operational Hours */}
          <div className="text-center font-mono text-xs text-[#888888]">
            <span className="text-[10px] tracking-widest text-gold uppercase block mb-1.5 font-bold">
              {t.footerHours}
            </span>
            <p>{t.footerDays}</p>
          </div>

          {/* Guidelines Fineprint */}
          <div className="text-center md:text-right max-w-xs">
            <p className="text-[10px] font-mono text-[#555555] leading-relaxed">
              {t.footerPolicy}
            </p>
            <span className="text-[9px] font-mono text-[#444444] mt-2 block">
              © {new Date().getFullYear()} La Lune. Built with pride in Paris.
            </span>
          </div>

        </div>
      </footer>

      {/* DETAIL OVERLAY POPUP */}
      {selectedDetailItem && (
        <MenuItemDetails
          item={selectedDetailItem}
          lang={lang}
          onClose={() => setSelectedDetailItem(null)}
          onAddToPlanner={handleTogglePlannerItem}
          isInPlanner={plannerItems.some((p) => p.id === selectedDetailItem.id)}
        />
      )}

      {/* RESERVATION OVERLAY MODAL */}
      {isReservationOpen && (
        <ReservationModal
          lang={lang}
          onClose={() => setIsReservationOpen(false)}
          selectedItems={plannerItems}
          onRemoveItem={handleRemovePlannerItem}
        />
      )}
    </div>
  );
}
