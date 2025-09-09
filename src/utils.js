// import { iterator } from "./main";
// import { getPathArray } from "./shape";

export const delay = (ms) => new Promise(r => setTimeout(r, ms));

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  export const camelToText = (s) => {
    if (!s) return "";
  
    // Insert space before caps or numbers
    let str = s.replace(/([a-z])([A-Z0-9])/g, "$1 $2");
  
    // Lowercase everything
    str = str.toLowerCase();
  
    // Capitalize first letter
    str = str.charAt(0).toUpperCase() + str.slice(1);
  
    // Add period if not present
    if (!/[.!?]$/.test(str)) {
      str += ".";
    }
  
    return str;
  };


export const randArr = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const rand = () => Math.random();

export const randBetween = (max) => Math.floor(Math.random() * max) + 1

export const move = (from, to, id, isAddedToBottom) => {
    const index = from.findIndex(obj => obj.id === id);
    if (index !== -1) {
        if (isAddedToBottom) {
            to.unshift(from[index]);
        } else {
            console.log("test")
            to.push(from[index]);
        }
        from.splice(index, 1);
    }
}

// export const deal = (store) => {
//     for (let index = 0; index < 3; index++) {
//         // setTimeout?
//         move('deck', 'pile'+(index+1), undefined, store) 
//     }
// }

export const dealPhase = (store) => {
    deal(store)
    // setTimeout(iterator.next.bind(iterator), 5000)
}

export const draw = (num, fromPath, toPath, id, store) => {
    for (let index = 0; index < num; index++) {
        // setTimeout?
        move(fromPath, toPath, undefined, store) 
    }
}


export const morphPath = (el, toD, opts = {}) => {
    const fromD = el.getAttribute('d');
    if (!fromD) throw new Error(`Element "${id}" has no 'd' attribute`);
  
    // pull all numbers from both paths
    const numRE = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
    const a = fromD.match(numRE)?.map(Number);
    const b = toD.match(numRE)?.map(Number);
    if (!a || !b || a.length !== b.length) {
      throw new Error('Start and target paths must have identical command structure and number count.');
    }
  
    // default ease-in-out via cosine (smooth, small code)
    const ease = opts.easing || (t => 0.5 - 0.5 * Math.cos(Math.PI * t));
    const dur = Math.max(1, opts.duration || 800);
  
    return new Promise(resolve => {
      const lerp = (x, y, t) => x + (y - x) * t;
      let start;
  
      function frame(ts) {
        start ??= ts;
        const t = Math.min(1, (ts - start) / dur);
        const te = ease(t);
  
        // interpolate all numbers and splice back into original template
        const nums = a.map((v, i) => lerp(v, b[i], te));
        const d = fromD.replace(numRE, () => {
          const n = nums.shift();
          // keep path compact; adjust precision to taste
          return Math.abs(n) < 1e-6 ? '0' : n.toFixed(3).replace(/\.?0+$/,'');
        });
  
        el.setAttribute('d', d);
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }


export const animateEyesWide = (isReset, amount) => {
    const upperBrowEl = document.querySelectorAll('.upper-brow');
    const value = isReset ? 600 : 600 + randBetween(200)

    const template = `m-6,0l649,0l0,${amount ? amount : value}c-119.17,-95.85 -41.92,-306.25 -163.12,-392.89c-104.61,-77.09 -381.27,-13.02 -485.88,-90.11z`

    for (let browIndex = 0; browIndex < upperBrowEl.length; browIndex++) {    
        morphPath(upperBrowEl[browIndex], template, { duration: 200 + value*3 });
      }
}

export const animateEyesDialate = (isBig) => {
    const irisEl = document.querySelectorAll('.iris');
    const path = isBig ? "m345.22,45c-188.76,49.98 -199.63,117.3 -216.1,197.88c2.69,140.76 156.4,202.98 220.35,210.12c2.13,0 200.44,-22.44 196.5,-210.12c-5.14,-149.94 -200.76,-197.88 -200.76,-197.88z" : "m330.55,45c-23.96,49.98 -25.34,117.3 -27.43,197.88c0.34,140.76 19.85,202.98 27.97,210.12c0.27,0 25.44,-22.44 24.94,-210.12c-0.65,-149.94 -25.48,-197.88 -25.48,-197.88z"

    for (let irisIndex = 0; irisIndex < irisEl.length; irisIndex++) {
        setTimeout(() => {
          morphPath(irisEl[irisIndex], path, { duration: 500 });
        }, 2200);
    }
}

export const filterByZone = (cards, zone) => {
    return cards.filter((card)=>card.zone === zone).sort(((cardA, cardB) => cardA.zoneOrder - cardB.zoneOrder)).reverse()
}

// export const sortCardZone = (cards, zone) => {
//     return cards.filter((card)=>card.zone !== zone)
// }

// Returns a PNG data URL string you can splice into innerHTML
export const emojiLowPolyPNGString = (emoji, {
    size = 180, cell = 14, jitter = 0.85 // e.g. '#fff' to force opaque
  } = {}) => {
    const S = size;
    const clamp = v => Math.max(0, Math.min(S - 1, v));
  
    // Source canvas to render the emoji for sampling
    const src = document.createElement('canvas');
    src.width = src.height = S;
    const sx = src.getContext('2d', { willReadFrequently: true });
  
    function drawOnce(text, fontFamily) {
      sx.clearRect(0, 0, S, S);
    
      // Scale for device pixels so nothing looks clipped when rasterized
      const dpr = window.devicePixelRatio || 1;
      if (sx.canvas.width !== S * dpr || sx.canvas.height !== S * dpr) {
        sx.canvas.width = S * dpr;
        sx.canvas.height = S * dpr;
        sx.canvas.style.width = S + "px";
        sx.canvas.style.height = S + "px";
      }
      sx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
      sx.font = `${S}px ${fontFamily}`;
      sx.textAlign = "center";
      sx.textBaseline = "alphabetic"; // we’ll place the baseline ourselves
      sx.fillStyle = "#000";
    
      const m = sx.measureText(text);
    
      // Prefer ink bbox; then font bbox; then heuristic
      let asc = m.actualBoundingBoxAscent;
      let desc = m.actualBoundingBoxDescent;
    
      if (!(asc > 0 || desc > 0)) {
        // Safari often exposes fontBoundingBox* even when actual* are 0
        asc = m.fontBoundingBoxAscent ?? 0;
        desc = m.fontBoundingBoxDescent ?? 0;
      }
      if (!(asc > 0 || desc > 0)) {
        // Heuristic fallback if both are missing (rare)
        // Estimate ascent≈0.8 em, descent≈0.2 em
        asc = 0.8 * S;
        desc = 0.2 * S;
      }
    
      // Baseline so that the *ink bbox* is vertically centered:
      // top = y - asc; bottom = y + desc -> center when y = C + (asc - desc)/2
      const x = S / 2;
      const y = S / 2 + (asc - desc) / 2;
    
      sx.fillText(text, x, y);
    }

    // Render the emoji (try color emoji stacks; fall back to mono)
    // function drawOnce(str, fontFamily) {
    //   sx.clearRect(0, 0, S, S);
    //   sx.textAlign = "center";
    //   sx.textBaseline = "middle";
    //   sx.font = `${S}px ${fontFamily}`;
    //   sx.fillStyle = '#000';
    //   sx.fillText(str, S/2, S/1.59);
    // }
    
    function hasInk() {
      const d = sx.getImageData(0, 0, S, S).data;
      for (let i = 3; i < d.length; i += 4) if (d[i] !== 0) return true;
      return false;
    }
  
    const fonts = [
      `"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`,
      `"Segoe UI Emoji","Noto Color Emoji","Apple Color Emoji",sans-serif`,
      `sans-serif`
    ];
    let drawn = false, str = emoji;
    for (let attempt = 0; attempt < 3 && !drawn; attempt++) {
      drawOnce(str, fonts[attempt]);
      drawn = hasInk();
      if (!drawn && attempt === 0 && !/\uFE0F/.test(str)) {
        str = emoji + '\uFE0F'; // force emoji presentation (VS16)
        attempt--;
      }
    }
    if (!drawn) {
      sx.clearRect(0, 0, S, S);
      sx.fillStyle = '#000';
      sx.fillRect(S, S, S, S);
    }
  
    // Build jittered grid
    const pts = [], jMag = cell * jitter * 0.5;
    for (let y = 0; y <= S; y += cell) {
      const row = [];
      for (let x0 = 0; x0 <= S; x0 += cell) {
        const jx = (x0 > 0 && x0 < S) ? (Math.random() * 2 - 1) * jMag : 0;
        const jy = (y > 0 && y < S) ? (Math.random() * 2 - 1) * jMag : 0;
        row.push([clamp(x0 + jx), clamp(y + jy)]);
      }
      pts.push(row);
    }
  
    // Output canvas to paint triangles
    const out = document.createElement('canvas');
    out.width = S
    out.height = S+20;
    const ox = out.getContext('2d');
  
    // Helper: paint one triangle using centroid color from src
    function tri(a, b, c) {
      const cx = clamp(((a[0] + b[0] + c[0]) / 3) | 0);
      const cy = clamp(((a[1] + b[1] + c[1]) / 3) | 0);
      const d = sx.getImageData(cx, cy, 1, 1).data;
      if (d[3] < 1) return; // skip fully transparent
      ox.beginPath();
      ox.moveTo(a[0], a[1]);
      ox.lineTo(b[0], b[1]);
      ox.lineTo(c[0], c[1]);
      ox.closePath();
      ox.fillStyle = `rgba(${d[0]},${d[1]},${d[2]},${(d[3] / 255).toFixed(3)})`;
      ox.fill();
    }
  
    // Paint triangles
    for (let j = 0; j < pts.length - 1; j++) {
      for (let i = 0; i < pts[j].length - 1; i++) {
        const p00 = pts[j][i],     p10 = pts[j][i + 1];
        const p01 = pts[j + 1][i], p11 = pts[j + 1][i + 1];
        if (Math.random() < 0.5) { tri(p00, p10, p11); tri(p00, p11, p01); }
        else                     { tri(p00, p10, p01); tri(p10, p11, p01); }
      }
    }
  
    // Rasterized PNG as data URL string
    return out.toDataURL('image/png'); // "data:image/png;base64,...."
  }
  
  
