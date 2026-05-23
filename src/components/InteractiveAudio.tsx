import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function InteractiveAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  // Parisian accordian/chime notes to sequence (gentle C maj / F maj romantic chords)
  const melodies = [
    [261.63, 329.63, 392.00, 523.25], // C Major
    [349.23, 440.00, 523.25, 698.46], // F Major
    [293.66, 349.23, 440.00, 587.33], // D Minor 7
    [392.00, 493.88, 587.33, 783.99], // G Major
  ];

  const playBistroNote = (ctx: AudioContext, freq: number, delay: number, duration: number) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Warm, retro accordian/piano hybrid sound (sine wave + a bit of soft triangle wave)
    osc.type = Math.random() > 0.5 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    // Filter to make it soft and cozy
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    // Warm gain envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + delay + 0.1); // subtle, quiet volume
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  };

  const startAmbientSynth = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let chordIndex = 0;
    
    const triggerChord = () => {
      const activeChord = melodies[chordIndex];
      // Play 3 or 4 notes of the chord gently arpeggiated
      activeChord.forEach((note, i) => {
        const strumDelay = i * 0.25 + Math.random() * 0.05;
        const duration = 2.0 + Math.random() * 0.5;
        playBistroNote(ctx, note, strumDelay, duration);
      });
      chordIndex = (chordIndex + 1) % melodies.length;
    };

    triggerChord();
    // Repeating chords every 4.5 seconds for a serene breeze
    const intervalId = window.setInterval(triggerChord, 4500);
    intervalIdRef.current = intervalId;
  };

  const stopAmbientSynth = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientSynth();
    };
  }, []);

  return (
    <div className="flex items-center gap-2 bg-[#121212]/90 border border-gold/10 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg transition-transform hover:scale-105">
      <Music className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      <span className="text-[10px] font-mono tracking-widest text-[#999999] uppercase sm:inline hidden">
        {isPlaying ? 'Bistro Ambiance: Active' : 'Bistro Ambiance'}
      </span>
      <button
        id="toggle_bistro_ambient"
        onClick={toggleSound}
        className="p-1 rounded-full text-gold hover:bg-[#222222] transition-colors focus:outline-none"
        title={isPlaying ? 'Mute' : 'Play Bistro Sounds'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-400" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#666666]" />
        )}
      </button>
    </div>
  );
}
