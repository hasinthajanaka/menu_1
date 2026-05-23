import React, { useState } from 'react';
import { X, Users, Calendar, Clock, Sparkles, MapPin, Mail, Phone, User, Check, Flame, Copy, BookmarkCheck } from 'lucide-react';
import { MenuItem } from '../data';

interface ReservationModalProps {
  lang: 'en' | 'fr';
  onClose: () => void;
  selectedItems: MenuItem[];
  onRemoveItem: (item: MenuItem) => void;
}

export default function ReservationModal({ lang, onClose, selectedItems, onRemoveItem }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [partySize, setPartySize] = useState('2');
  const [seatingArea, setSeatingArea] = useState('window');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('19:00');
  
  // Contacts
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('none');
  const [specialRequest, setSpecialRequest] = useState('');
  
  // Confirmation state
  const [bookingCode, setBookingCode] = useState('');
  const [copied, setCopied] = useState(false);

  const t = {
    en: {
      title: 'Reserve Your Table',
      frenchFlair: 'RÉSERVATION DE TABLE',
      subtitle: 'Experience authentic Parisian dining under the dim candlelights of La Lune',
      guests: 'How many guests?',
      stepNum: 'Step {{current}} of 3',
      next: 'Next Step',
      back: 'Back',
      confirm: 'Confirm Reservation',
      preferences: 'Table & Environment',
      contactInfo: 'Guest Details',
      complete: 'Reservation Guaranteed',
      seatingLabel: 'Seating Preference',
      dateLabel: 'Select Date',
      timeLabel: 'Select Time',
      bePrep: 'Highly active kitchen time. Booking highly advised.',
      occasionLabel: 'Special Occasion',
      preBookText: 'Your Selected Menu Interests',
      preBookSub: 'These will be highlighted for our Chef to prioritize.',
      dressReminder: 'Dress Code: Smart Elegant. Looking forward to welcoming you.',
      namePlh: 'Your full name',
      emailPlh: 'Your email address',
      phonePlh: 'Your phone number',
      requestPlh: 'Allergies, high-chairs, surprises or special window seats requests...',
      occasions: {
        none: 'Just dining',
        anniversary: 'Anniversary Celebration',
        birthday: 'Birthday Splurge',
        business: 'Business Meeting',
        date: 'Romantic Date Night'
      },
      seating: {
        window: 'Sideroad Window (Vue de la Rue)',
        corner: 'Cozy Alcove (Le Coin Tranquille)',
        bar: 'Zinc Copper Bar (Près du Zinc)',
        patio: 'Heated Garden Terrace (La Terrasse)'
      }
    },
    fr: {
      title: 'Réserver Une Table',
      frenchFlair: 'RÉSERVATION DE TABLE',
      subtitle: 'Découvrez la cuisine parisienne authentique sous l’éclat feutré de La Lune',
      guests: 'Combien de convives ?',
      stepNum: 'Étape {{current}} de 3',
      next: 'Étape Suivante',
      back: 'Retour',
      confirm: 'Confirmer la Réservation',
      preferences: 'Table & Ambiance',
      contactInfo: 'Informations Invités',
      complete: 'Réservation Garantie',
      seatingLabel: 'Préférence d’emplacement',
      dateLabel: 'Choisir la Date',
      timeLabel: 'Choisir l’Heure',
      bePrep: 'Période de forte affluence. Réservation recommandée.',
      occasionLabel: 'Occasion Spéciale',
      preBookText: 'Sélection de plats pré-enregistrés',
      preBookSub: 'Sélectionnés depuis notre carte interactive pour notre Chef.',
      dressReminder: 'Tenue de rigueur : Élégante & Chic. Au plaisir de vous recevoir.',
      namePlh: 'Votre nom complet',
      emailPlh: 'Votre adresse e-mail',
      phonePlh: 'Votre numéro de téléphone',
      requestPlh: 'Allergies, chaises hautes, surprises ou demandes spécifiques...',
      occasions: {
        none: 'Dîner classique',
        anniversary: 'Célébration d’Anniversaire',
        birthday: 'Fête d’Anniversaire',
        business: 'Repas d’Affaires',
        date: 'Rendez-vous Romantique'
      },
      seating: {
        window: 'Fenêtre (Vue sur la Rue)',
        corner: 'Alcôve Feutrée (Le Coin Tranquille)',
        bar: 'Près du Zinc en Cuivre (Le Zinc)',
        patio: 'Terrasse de Jardin Chauffée (La Terrasse)'
      }
    }
  }[lang];

  const handleNext = () => {
    if (step === 1) {
      if (!bookingDate) {
        alert(lang === 'en' ? 'Please select a valid dining date' : 'Veuillez choisir une date pour votre dîner');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert(lang === 'en' ? 'Please complete all required guest fields.' : 'Veuillez remplir toutes les informations requises.');
      return;
    }
    
    // Generate organic reservation code
    const letters = 'LUNE';
    const num = Math.floor(1000 + Math.random() * 9000);
    const suffix = 'PARIS';
    const code = `${letters}-${num}-${suffix}`;
    
    setBookingCode(code);
    setStep(4); // Golden ticket receipt
  };

  const copyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const partyOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '10', '12'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#080808]/95 border border-gold/15 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)] my-8">
        
        {/* Absolute Paris Header Decor */}
        <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#888888] hover:text-white bg-black/50 border border-[#222222] rounded-full p-2 hover:scale-105 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {step < 4 ? (
          <div className="p-6 md:p-8">
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono tracking-[0.4em] text-gold uppercase block mb-1">
                {t.frenchFlair}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {t.title}
              </h2>
              <p className="text-xs text-[#888888] italic font-serif mt-1 max-w-md mx-auto">
                {t.subtitle}
              </p>

              {/* Progress Bar */}
              <div className="mt-6 max-w-xs mx-auto flex items-center justify-between">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center flex-1 last:flex-none">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono border transition-all ${
                      step >= num 
                        ? 'bg-amber-950/30 border-amber-500 text-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]' 
                        : 'border-[#333333] text-[#555555]'
                    }`}>
                      {num}
                    </div>
                    {num < 3 && (
                      <div className={`h-[1px] flex-1 mx-2 ${
                        step > num ? 'bg-amber-600' : 'bg-[#222222]'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: DATE, GUESTS & ENVIRONMENT */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Row 1: Guests and Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-[#999999] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        {t.guests}
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {partyOptions.slice(0, 5).map((size) => (
                          <button
                            type="button"
                            key={size}
                            onClick={() => setPartySize(size)}
                            className={`py-2 rounded font-mono text-sm border transition-all ${
                              partySize === size 
                                ? 'bg-[#d4af37]/15 border-[#d4af37] text-white font-bold' 
                                : 'border-[#222222] text-[#888888] hover:bg-[#111111]'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-5 gap-2 mt-2">
                        {partyOptions.slice(5).map((size) => (
                          <button
                            type="button"
                            key={size}
                            onClick={() => setPartySize(size)}
                            className={`py-2 rounded font-mono text-sm border transition-all ${
                              partySize === size 
                                ? 'bg-[#d4af37]/15 border-[#d4af37] text-white font-bold' 
                                : 'border-[#222222] text-[#888888] hover:bg-[#111111]'
                            }`}
                          >
                            {size} {parseInt(size) >= 10 ? '+' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#999999] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {t.dateLabel}
                      </label>
                      <input
                        type="date"
                        min="2026-05-23"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-[#121212] border border-[#222222] focus:border-gold/60 text-white rounded px-4 py-2.5 font-mono text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Seating Arrangement Box */}
                  <div>
                    <label className="block text-xs font-mono text-[#999999] uppercase tracking-wider mb-2">
                      {t.seatingLabel}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(t.seating).map(([key, labelStr]) => (
                        <div
                          key={key}
                          onClick={() => setSeatingArea(key)}
                          className={`p-3.5 rounded border flex justify-between items-center cursor-pointer transition-all ${
                            seatingArea === key 
                              ? 'bg-[#d4af37]/10 border-gold/60 text-white shadow-[0_0_15px_rgba(212,175,55,0.05)]' 
                              : 'bg-[#0f0f0f]/80 border-[#222222] text-[#888888] hover:bg-[#121212]'
                          }`}
                        >
                          <span className="text-xs font-mono">{labelStr}</span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            seatingArea === key ? 'border-amber-400 bg-amber-500' : 'border-[#333333]'
                          }`}>
                            {seatingArea === key && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 2: CLOCK SLOTS & MENU PRE-LOAD */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Dinner clock selector */}
                  <div>
                    <label className="block text-xs font-mono text-[#999999] uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {t.timeLabel}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((time) => {
                        const isHighlyRequested = ['19:00', '19:30', '20:00'].includes(time);
                        return (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setBookingTime(time)}
                            className={`py-2 rounded font-mono text-xs border relative transition-all ${
                              bookingTime === time 
                                ? 'bg-[#d4af37]/15 border-[#d4af37] text-white font-semibold' 
                                : 'border-[#222222] text-[#888888] hover:bg-[#111111]'
                            }`}
                          >
                            {time}
                            {isHighlyRequested && (
                              <span className="absolute -top-1 -right-1 bg-red-600/90 hover:bg-red-600 text-[8px] px-1 rounded-full text-white pointer-events-none scale-90" title={t.bePrep}>
                                🔥
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Menu preload binder */}
                  <div>
                    <div className="flex items-center justify-between mb-3 border-b border-[#222222] pb-2">
                      <h4 className="text-xs font-mono text-gold uppercase tracking-wider">
                        {t.preBookText}
                      </h4>
                      <span className="text-[10px] font-mono text-[#666666]">
                        {selectedItems.length} {lang === 'en' ? 'selected' : 'sélectionné(s)'}
                      </span>
                    </div>
                    
                    {selectedItems.length === 0 ? (
                      <p className="text-xs text-[#666666] italic font-serif leading-relaxed">
                        {lang === 'en' 
                          ? 'You haven’t pre-selected any menu items. Feel free to browse our menu details to flag favorite items for the Chef.' 
                          : 'Vous n’avez pas encore pré-sélectionné de plats de notre carte interactive.'}
                      </p>
                    ) : (
                      <div className="bg-[#0f0f0f]/90 border border-[#222222] rounded overflow-hidden max-h-48 overflow-y-auto divide-y divide-[#1e1e1e]">
                        {selectedItems.map((item) => (
                          <div key={item.id} className="p-3 flex justify-between items-center gap-4 text-xs font-mono">
                            <div>
                              <span className="text-white block font-sans font-medium">{item.name}</span>
                              <span className="text-[#666666] italic font-serif mt-0.5 block">{item.frenchName}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item)}
                              className="text-red-400 hover:text-red-300 hover:underline px-2 py-1 bg-red-950/20 rounded border border-red-900/10"
                            >
                              {lang === 'en' ? 'Remove' : 'Retirer'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* STEP 3: CONTACT FORM */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#999999] uppercase tracking-wider mb-1.5 required">
                        {lang === 'en' ? 'Full Name' : 'Nom Complet'} *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-[#555555]" />
                        <input
                          type="text"
                          required
                          placeholder={t.namePlh}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#121212] border border-[#222222] text-white rounded pl-10 pr-4 py-2.5 font-mono text-sm outline-none focus:border-gold/60 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-[#999999] uppercase tracking-wider mb-1.5 required">
                        {lang === 'en' ? 'Phone Number' : 'Numéro de Téléphone'} *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#555555]" />
                        <input
                          type="tel"
                          required
                          placeholder={t.phonePlh}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#121212] border border-[#222222] text-white rounded pl-10 pr-4 py-2.5 font-mono text-sm outline-none focus:border-gold/60 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#999999] uppercase tracking-wider mb-1.5 required">
                      {lang === 'en' ? 'Email Address' : 'Adresse E-mail'} *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#555555]" />
                      <input
                        type="email"
                        required
                        placeholder={t.emailPlh}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#121212] border border-[#222222] text-white rounded pl-10 pr-4 py-2.5 font-mono text-sm outline-none focus:border-gold/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Occasion Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-[#999999] uppercase tracking-wider mb-1.5">
                        {t.occasionLabel}
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full bg-[#121212] border border-[#222222] text-[#eeeeee] rounded px-4 py-2.5 font-mono text-sm outline-none focus:border-gold/60 transition-colors cursor-pointer"
                      >
                        {Object.entries(t.occasions).map(([key, labelStr]) => (
                          <option key={key} value={key} className="bg-[#121212] text-white">
                            {labelStr}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col justify-end">
                      <p className="text-[10px] font-mono text-[#666666] leading-normal flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{t.dressReminder}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#999999] uppercase tracking-wider mb-1.5">
                      {lang === 'en' ? 'Special Requests' : 'Demandes Particulières'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={t.requestPlh}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full bg-[#121212] border border-[#222222] text-white rounded px-4 py-2.5 font-mono text-xs outline-none focus:border-gold/60 transition-colors resize-none"
                    />
                  </div>

                </div>
              )}

              {/* ACTION FOOTER */}
              <div className="flex justify-between items-center pt-4 border-t border-[#222222] mt-6">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="border border-[#222222] text-[#888888] hover:text-white px-5 py-2.5 rounded text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors"
                    >
                      {t.back}
                    </button>
                  )}
                </div>
                
                <div>
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-gold text-black hover:bg-[#b08d24] px-6 py-2.5 font-semibold font-mono rounded text-xs uppercase tracking-widest cursor-pointer transition-all flex items-center gap-1 shadow-lg"
                    >
                      {t.next}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-gold text-black hover:bg-[#b08d24] px-6 py-2.5 font-bold font-mono rounded text-xs uppercase tracking-widest cursor-pointer transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    >
                      {t.confirm}
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>
        ) : (
          /* STEP 4: CONFIRMED GOLDEN TICKET RECEIPT */
          <div className="p-6 md:p-8 animate-fade-in text-center max-w-lg mx-auto">
            
            <div className="w-16 h-16 bg-amber-950/20 border border-gold/45 rounded-full flex items-center justify-center mx-auto mb-4 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Check className="w-8 h-8 animate-pulse text-amber-400" />
            </div>

            <span className="text-[10px] font-mono tracking-[0.4em] text-gold uppercase">
              {lang === 'en' ? 'PASSPORT CONFIRMED' : 'REÇU DE RÉSERVATION'}
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
              La Lune Parisienne
            </h2>
            <p className="text-xs text-[#888888] italic font-serif mt-1">
              {lang === 'en' ? 'A table awaits you in the city of lamps' : 'Une table vous attend sous la douce lune parisienne'}
            </p>

            {/* GOLDEN TICKET DISPLAY */}
            <div className="mt-8 bg-[#100f0b] border-2 border-gold/30 rounded p-6 shadow-inner relative overflow-hidden text-left font-mono">
              {/* Sider tickets punches */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border border-gold/30" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border border-gold/30" />

              <div className="border-b border-[#22221b] pb-4 mb-4 flex justify-between items-start">
                <div>
                  <h4 className="text-[10px] text-[#888888] tracking-widest uppercase mb-0.5">{lang === 'en' ? 'Reservation Ticket' : 'Billet d’Exception'}</h4>
                  <p className="font-serif italic text-gold text-sm font-bold">La Lune Bistro</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#888888] block uppercase">STATUS</span>
                  <span className="text-[11px] text-emerald-400 bg-emerald-900/10 px-2 py-0.5 border border-emerald-500/25 rounded tracking-widest font-bold">GUARANTEED</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                <div>
                  <span className="text-[#666666] block text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Guest Name' : 'Nom d’Invité'}</span>
                  <span className="text-white font-sans font-medium mt-0.5 block truncate">{name}</span>
                </div>
                
                <div>
                  <span className="text-[#666666] block text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Party Size' : 'Convives'}</span>
                  <span className="text-[#eeeeee] mt-0.5 block">{partySize} {parseInt(partySize) > 1 ? (lang === 'en' ? 'Guests' : 'Personnes') : 'Guest'}</span>
                </div>

                <div>
                  <span className="text-[#666666] block text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Date & Time' : 'Date et Heure'}</span>
                  <span className="text-amber-300 mt-0.5 block">{bookingDate} @ {bookingTime}</span>
                </div>

                <div>
                  <span className="text-[#666666] block text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Environment' : 'Atmosphère'}</span>
                  <span className="text-[#eeeeee] mt-0.5 block text-[11px] truncate">{(t.seating as any)[seatingArea]}</span>
                </div>
              </div>

              {/* Interactive Selected Items list */}
              {selectedItems.length > 0 && (
                <div className="mt-4 border-t border-[#22221b] pt-3 text-[10px]">
                  <span className="text-[#666666] block uppercase tracking-wider mb-1.5">{lang === 'en' ? 'Pre-Cook Interest:' : 'Cuisine Notifiée:'}</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedItems.map((item) => (
                      <span key={item.id} className="bg-[#1f1a12] text-amber-200 border border-gold/15 px-2 py-0.5 rounded italic">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Code */}
              <div className="mt-5 pt-4 border-t border-[#22221b] flex items-center justify-between">
                <div>
                  <span className="text-[#666666] block text-[9px] uppercase tracking-wider">{lang === 'en' ? 'Reservation Code' : 'Code Unique'}</span>
                  <span className="text-white text-sm font-bold tracking-widest mt-0.5 block">{bookingCode}</span>
                </div>

                {/* Micro QR Pixel Code mock */}
                <div className="w-12 h-12 bg-[#121212] border border-[#22221b] p-1 rounded flex flex-col justify-between shrink-0">
                  <div className="flex justify-between">
                    <div className="w-2.5 h-2.5 bg-gold rounded-xs" />
                    <div className="w-2.5 h-2.5 bg-gold rounded-xs" />
                  </div>
                  <div className="h-1 bg-gold/50 rounded-xs mx-0.5" />
                  <div className="flex justify-between items-end">
                    <div className="w-2.5 h-2.5 bg-gold rounded-xs" />
                    <div className="w-3.5 h-1 bg-gold rounded-xs" />
                  </div>
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={copyCode}
                className="bg-[#121212] border border-[#222222] hover:border-gold/30 text-xs font-mono text-[#bbbbbb] hover:text-white px-5 py-3 rounded tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    {lang === 'en' ? 'Copied' : 'Copié !'}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-500" />
                    {lang === 'en' ? 'Copy Ticket Details' : 'Copier les détails'}
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="bg-gold text-black hover:bg-[#b08d24] font-bold text-xs font-mono uppercase tracking-widest px-6 py-3 rounded cursor-pointer transition-all"
              >
                {lang === 'en' ? 'Finish' : 'Terminer'}
              </button>
            </div>

            <p className="text-[10px] font-mono text-[#555555] mt-6 leading-relaxed">
              * {lang === 'en' ? 'A copy has been virtually prepared. Dress elegant. Arrive 10 minutes beforehand.' : 'Billet nominatif virtuel. Tenue chic recommandée. Merci d’arriver 10 minutes à l’avance.'}
            </p>

          </div>
        )}
      </div>
    </div>
  );
}
