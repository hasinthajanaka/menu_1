import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Compass, Calendar, Clock, Star, Landmark } from 'lucide-react';

interface OurStoryProps {
  lang: 'en' | 'fr';
}

export default function OurStory({ lang }: OurStoryProps) {
  const [liveHoursText, setLiveHoursText] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    // Parisian closing/opening timer calculations (Paris is UTC+1 / UTC+2 in DST)
    // For absolute safety, we compute local Parisian hours based on simulated current date
    const checkBistroStatus = () => {
      const now = new Date();
      // Get Paris hours (using UTC + 2 for May timezone offset in Paris)
      const parisHour = (now.getUTCHours() + 2) % 24;
      const parisMinutes = now.getUTCMinutes();
      
      const openHour = 12; // 12:00 PM
      const closeHour = 23.5; // 11:30 PM (23:30)

      let open = false;
      let statusStr = '';

      const currentDecimalTime = parisHour + parisMinutes / 60;

      if (currentDecimalTime >= openHour && currentDecimalTime < closeHour) {
        open = true;
        const remainingHours = Math.floor(closeHour - currentDecimalTime);
        const remainingMins = Math.floor(((closeHour - currentDecimalTime) % 1) * 60);
        statusStr = lang === 'en' 
          ? `● Open Now — Closing in ${remainingHours}h ${remainingMins}m` 
          : `● Ouvert Actuellement — Fermeture dans ${remainingHours}h ${remainingMins}m`;
      } else {
        open = false;
        let diff = 0;
        if (currentDecimalTime < openHour) {
          diff = openHour - currentDecimalTime;
        } else {
          diff = (24 - currentDecimalTime) + openHour;
        }
        const waitHours = Math.floor(diff);
        const waitMins = Math.floor((diff % 1) * 60);
        statusStr = lang === 'en'
          ? `○ Closed Now — Opening in ${waitHours}h ${waitMins}m for lunch` 
          : `○ Fermé Actuellement — Ouverture dans ${waitHours}h ${waitMins}m pour le déjeuner`;
      }

      setIsOpenNow(open);
      setLiveHoursText(statusStr);
    };

    checkBistroStatus();
    const interval = setInterval(checkBistroStatus, 60000);
    return () => clearInterval(interval);
  }, [lang]);

  const t = {
    en: {
      headline: 'Our Parisian Story',
      subline: 'FONDEÉ EN 1982',
      p1: 'La Lune French Bistro stands nestled alongside cobblestone walls, ancient booksellers, and the bustling theaters of the 6th arrondissement. Since opening our doors in 1982, we have curated a romantic escape filled with warm candlelights, vintage copper pots, and the timeless melodies of Saint-Germain-des-Prés.',
      p2: 'Every dish is a testament to classical French gastronomy, carefully slow-cooked and paired by our resident sommelier to offer a taste of historical Paris. Experience culinary craftsmanship in its most honest, beautiful, and heartfelt form.',
      address: '30 Rue de l\'Ancienne Comédie, 75006 Paris, France',
      michelinReview: '“An exceptional sanctuary of traditional taste. From the perfectly crispy crust of the crème brûlée to the silky depth of the Bourguignon, La Lune delivers the heart and soul of authentic French cuisine with remarkable modesty.”',
      reviewer1: '— Michelin Gastronomy Guide',
      figaroReview: '“One of the best-kept culinary secrets in Saint-Germain. An exquisite, candle-lit room where the air is scented with butter, red wine, and tarragon, evoking the golden age of Paris.”',
      reviewer2: '— Le Figaro'
    },
    fr: {
      headline: 'Notre Histoire Parisienne',
      subline: 'FONDEÉ EN 1982',
      p1: 'Le Bistro La Lune s’épanouit le long d’anciennes ruelles pavées, de bouquinistes et de théâtres vibrants du 6ème arrondissement. Depuis notre inauguration en 1982, nous cultivons un refuge romantique baigné de douces bougies, de casseroles en cuivre vintage et de mélodies intemporelles de Saint-Germain-des-Prés.',
      p2: 'Chaque création est un hommage à la gastronomie française classique, mijotée avec dévotion et accordée avec précision par notre sommelier maison. Entrez et vivez l’authenticité d’un art de vivre unique au monde.',
      address: '30 Rue de l\'Ancienne Comédie, 75006 Paris, France',
      michelinReview: '“Un sanctuaire exceptionnel du goût traditionnel. Du craquant parfait de la crème brûlée à la profondeur soyeuse du bourguignon, La Lune livre l’âme de la cuisine française avec une modestie remarquable.”',
      reviewer1: '— Guide Gastronomique Michelin',
      figaroReview: '“L’un des secrets culinaires les mieux gardés de Saint-Germain. Une salle exquise éclairée aux bougies, parfumée de beurre, de vin rouge et d’estragon, évoquant l’âge d’or parisien.”',
      reviewer2: '— Le Figaro'
    }
  }[lang];

  return (
    <section id="location-details" className="pt-20 pb-24 border-t border-[#111111] bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Story Text (7 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.4em] text-gold uppercase block">
              {t.subline}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              {t.headline}
            </h2>
          </div>

          <div className="space-y-4 text-sm text-[#aaaaaa] leading-relaxed max-w-xl font-sans font-light">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>

          {/* Dynamic Opening Hours Card */}
          <div className="p-4 bg-[#0a0a0a] border border-[#222222]/60 rounded-md max-w-xl">
            <h4 className="text-xs font-mono text-gold uppercase tracking-wider mb-2 flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-amber-500" />
              {lang === 'en' ? 'Bistro Operational Clock' : 'Horloge de Service'}
            </h4>
            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#dddddd] font-mono">
                {lang === 'en' ? 'Service hours: 12:00 PM — 11:30 PM (Noon to Late)' : 'Heures de service : 12h00 — 23h30'}
              </p>
              <p className={`text-xs font-mono mt-1 font-semibold ${isOpenNow ? 'text-emerald-400' : 'text-amber-500/90'}`}>
                {liveHoursText}
              </p>
            </div>
          </div>

          <hr className="border-[#1e1e1e] max-w-xl" />

          {/* Elegant Critic Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl pt-2">
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-[#cccccc] italic font-serif leading-relaxed">
                {t.michelinReview}
              </p>
              <span className="text-[10px] font-mono tracking-wider text-[#888888] block text-right pr-2">
                {t.reviewer1}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-[#cccccc] italic font-serif leading-relaxed">
                {t.figaroReview}
              </p>
              <span className="text-[10px] font-mono tracking-wider text-[#888888] block text-[#888888] text-right pr-2">
                {t.figaroReview ? t.reviewer2 : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Location & Architectural Map (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b0b0b] border border-[#222222] p-5 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-mono text-gold uppercase tracking-wider font-medium">
                  {lang === 'en' ? 'Bistro Address' : 'Adresse Municipale'}
                </h4>
                <p className="text-sm font-serif italic text-white mt-0.5">
                  {t.address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-xs font-mono text-gold uppercase tracking-wider font-medium">
                  {lang === 'en' ? 'Telephone Direct' : 'Ligne Directe'}
                </h4>
                <p className="text-xs font-mono text-white mt-0.5 select-all">
                  +33 1 43 25 XX XX
                </p>
              </div>
            </div>

            {/* ARTISTIC parisian vector map overlay */}
            <div className="relative h-64 bg-[#070707] border border-[#1e1e1e] rounded overflow-hidden flex flex-col justify-between p-4">
              
              {/* Paris grids overlay styles */}
              <div className="absolute inset-0 opacity-15" style={{ 
                backgroundImage: 'radial-gradient(#d4af37 0.75px, transparent 0.75px), linear-gradient(30deg, #181818 20%, transparent 80%), linear-gradient(-60deg, #151515 10%, transparent 90%)',
                backgroundSize: '15px 15px, 100% 100%, 100% 100%' 
              }} />

              {/* Seine River Curve Vector */}
              <div className="absolute top-2 left-0 right-0 h-4 bg-teal-950/20 border-b border-teal-800/15 flex items-center justify-center font-mono text-[8px] text-teal-600/40 tracking-[0.6em]">
                LA SEINE
              </div>

              {/* Grid Roads */}
              <div className="absolute left-1/2 top-4 bottom-0 w-[1px] bg-[#222222]" /> {/* Rue St-Germain */}
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#222222]" /> {/* Bd Saint-Germain */}
              <div className="absolute left-1/3 top-8 bottom-0 w-[1.5px] bg-[#3a3526] transform -rotate-12" title="Rue de l'Ancienne Comédie" /> {/* Rue de l'Ancienne Comédie */}

              {/* Locations Labels */}
              <div className="z-10 text-[9px] font-mono text-[#555555] flex flex-col gap-1 pl-4 pt-4">
                <span className="flex items-center gap-1"><Landmark className="w-2.5 h-2.5 text-teal-800/60" /> Théâtre de l'Odéon</span>
                <span className="flex items-center gap-1"><Compass className="w-2.5 h-2.5 text-sky-800/50" /> Saint-Germain-des-Prés</span>
              </div>

              {/* Center Marker: La Lune */}
              <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-gold border border-black animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-gold border-2 border-[#000000] z-10" />
                <span className="bg-[#121212] border border-gold/45 text-gold text-[9px] font-bold font-mono px-1.5 py-0.5 rounded shadow-lg mt-1 whitespace-nowrap tracking-wider">
                  LA LUNE
                </span>
              </div>

              {/* Directions hint label */}
              <div className="z-10 flex justify-between items-center text-[9px] font-mono text-[#666666]">
                <span>M4: Odéon Station (150m)</span>
                <span>Arrondissement 6e</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
