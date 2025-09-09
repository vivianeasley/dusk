import { randArr } from "./utils";

export const sound = (stringNotes, typeOrOpts, musicLengthArg) => {
    // ---- options (back-compat with (type, musicLength)) ----
    const opts = (typeof typeOrOpts === "object" && typeOrOpts) ? typeOrOpts : {
      wave: (typeof typeOrOpts === "string" ? typeOrOpts : "sine"),
      musicLength: (typeof musicLengthArg === "number" ? musicLengthArg : undefined),
    };
  
    const wave = opts.wave || "sine";                 // "sine" | "triangle" | "square" | "sawtooth"
    const musicLength = opts.musicLength ?? 0.1;
  
    // Pitch controls
    const transposeOctaves = opts.transposeOctaves ?? -2;   // go low: try -3 or -4
    const transposeSemitones = opts.transposeSemitones ?? 0;
    const baseHz = opts.baseHz ?? 440;                      // reference (A4)
    const baseChar = opts.baseCharCode ?? 105;              // 'i' => 440Hz to keep your mapping
  
    // Tone shaping
    const filterCutoff = opts.filterCutoff ?? 450;          // Hz, lower = darker (200–600 good)
    const filterQ = opts.filterQ ?? 10;                     // resonance
    const subLevel = opts.subLevel ?? 0.35;                 // 0..1 level for sub oscillator
    const subOctaves = opts.subOctaves ?? 1;                // 1 or 2 octaves below
  
    // Envelope
    const amp = opts.gain ?? 0.45;
    const attack = opts.attack ?? 0.01;                     // slower attack feels creepier (0.02–0.06)
    const decay = opts.decay ?? 0.12;
    const sustain = opts.sustain ?? 0.2;
    const release = opts.release ?? 0.3;
  
    // FX
    const vibratoRate = opts.vibratoRate ?? 5;              // Hz
    const vibratoDepth = opts.vibratoDepth ?? 12;           // cents (small = subtle; 10–25)
    const delayTime = opts.delayTime ?? 0.23;               // s
    const delayFeedback = opts.delayFeedback ?? 0.33;       // 0..0.8
    const delayWet = opts.delayWet ?? 0.25;                 // 0..1
  
    const noteLengths = { '5':0.4, '4':0.3, '3':0.2, '2':0.1, '1':0.05 };
    const skipList = [...Object.keys(noteLengths), '-'];
  
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
  
    // Master
    const master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  
    // Global delay (simple spooky echo)
    const delay = ctx.createDelay(1.5);
    delay.delayTime.value = delayTime;
    const fb = ctx.createGain(); fb.gain.value = delayFeedback;
    const wet = ctx.createGain(); wet.gain.value = delayWet;
    delay.connect(fb); fb.connect(delay);
    delay.connect(wet); wet.connect(master);
  
    for (let i = 0; i < stringNotes.length; i++) {
      const ch = stringNotes[i];
      const next = stringNotes[i+1];
      const noteLen = (!isNaN(next) ? noteLengths[next] : musicLength);
  
      // skip digits/rests
      if (!ch || skipList.includes(ch)) continue;
  
      const when = ctx.currentTime + i * noteLen + 0.3;
      const off = when + noteLen;
  
      // Pitch mapping: n semitones from baseChar, then transpose
      const semis = (stringNotes.charCodeAt(i) - baseChar) + (transposeOctaves * 12) + transposeSemitones;
      const freq = baseHz * Math.pow(2, semis / 12);
  
      // Voice chain: osc -> (optional vibrato on frequency) -> filter -> amp -> (master + delay)
      const osc = ctx.createOscillator();
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, when);
  
      // Sub oscillator (one or two octaves below) for weight
      const sub = ctx.createOscillator();
      sub.type = (wave === "square" ? "sine" : wave); // usually smoother sub
      const subFreq = freq / Math.pow(2, subOctaves);
      sub.frequency.setValueAtTime(subFreq, when);
      const subGain = ctx.createGain();
      subGain.gain.value = subLevel;
  
      // Filter to darken
      const fil = ctx.createBiquadFilter();
      fil.type = "lowpass";
      fil.frequency.setValueAtTime(filterCutoff, when);
      fil.Q.setValueAtTime(filterQ, when);
  
      // Amplitude envelope
      const ampNode = ctx.createGain();
      ampNode.gain.setValueAtTime(0.0001, when);
      ampNode.gain.linearRampToValueAtTime(amp, when + attack);
      ampNode.gain.linearRampToValueAtTime(amp * sustain, when + attack + decay);
      ampNode.gain.setTargetAtTime(0.0001, Math.max(when, off - release), 0.15);
  
      // Vibrato (modulate frequency in cents)
      if (vibratoDepth > 0) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(vibratoRate, when);
        // cents -> frequency offset in Hz: f * (2^(cents/1200) - 1)
        const centsToHz = f => f * (Math.pow(2, vibratoDepth / 1200) - 1);
        lfoGain.gain.value = centsToHz(freq);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(when);
        lfo.stop(off + 0.1);
      }
  
      // Wiring
      osc.connect(fil);
      sub.connect(subGain); subGain.connect(fil);
      fil.connect(ampNode);
      ampNode.connect(master);
      ampNode.connect(delay);
  
      // Schedule
      osc.start(when);
      sub.start(when);
      osc.stop(off + 0.05);
      sub.stop(off + 0.05);
    }
  }


export const startSound = () => {
  // "a5-h5-g5-d5-c5-a5-a5--a5-h5-g5-d5-c5-k25-k25--o5-j5-k5-g5-h5-h5-c5--m5-g5-j5-c5-h3"

const music = ['m5', 'k5', 'h5', 'o5', 'g5', 'k3', 'h3', 'm3', 'k2', 'h2', 'm4']
const musicChunk = ["-m5-k5-h5-m5-","-m5-k5-h5-k5-","-o5-m5-k5-h5-","-h5-g5-k5-h5--", "-k3-h3-m5--k3-h3-m5--", "-m5-m5-k5-h5-m5--", '-a5-h5-g5-d5-c5-a5-a5-', '-a5-h5-g5-d5-c5-k25-k25-', '-o5-j5-k5-g5-h5-h5-c5-','-m5-g5-j5-c5-h3']

    

  let soundString = ''
  for (let index = 0; index < 200; index++) {
    const dash = Math.random() > 0.7 ? "---" : "--"
    const notes = Math.random() > 0.9 ? randArr(music) : randArr(musicChunk)
    soundString += (notes + dash)
  }

  sound(
    soundString,
    {
      wave: "sawtooth",
      musicLength: 0.4,
      transposeOctaves: -3,
      filterCutoff: 320, filterQ: 14,
      subLevel: 0.45, subOctaves: 2,
      attack: 0.03, decay: 0.2, sustain: 0.35, release: 0.6,
      vibratoRate: 4, vibratoDepth: 14,
      delayTime: 0.38, delayFeedback: 0.38, delayWet: 0.22,
      gain: 0.2
    }
  );
  
  
  // triangle square or sawtooth
}

 