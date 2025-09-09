import { faceDownZones, faceUpZones } from "./state";

const prevState = new Map();
const prevCardZones = new Map();

export function createFlipAnimator({
  containerSelector = '.card-container',
  faceUpClass = 'face-up',
  faceDownClass = 'face-down',
} = {}) {
  // Map<string, {rect: DOMRect, side: 'up'|'down'|null}>

  return {
    /**
     * Capture starting positions AND prior sides.
     * Call BEFORE DOM changes.
     */
    startFlip(state) {
      
      prevState.clear();
      document.querySelectorAll('[data-flip]').forEach(el => {
        const id = el.getAttribute('data-flip');
        if (!id) return;
        const rect = el.getBoundingClientRect();
        prevState.set(id, rect);

        // const card = state.cards.find((data)=>data.id === parseInt(id, 10))

        // if (card) console.log("++++---", id,  card.zone)
        // if (card) prevCardZones.set(id, card.zone)
      });
    },

    /**
     * Animate move + (if needed) flip.
     * Call AFTER DOM changes.
     * @param {number} duration ms (default 200)
     */
    endFlip(duration = 200, state) {
      return new Promise(resolve => {
        const willTranslate = [];

        document.querySelectorAll('[data-flip]').forEach(el => {
          const id = el.getAttribute('data-flip');
          if (!id) return;

          const prev = prevState.get(id);
          if (!prev) return; // new element; nothing to animate from

          // 1) FLIP (First-Last Invert Play) translate
          const next = el.getBoundingClientRect();
          const dx = prev.left - next.left;
          const dy = prev.top - next.top;

          if (dx || dy) {
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            willTranslate.push(el);
          }

          const cardObj = state.cards.find((data)=>data.id === parseInt(id, 10))
          const currZone = cardObj?.zone 
    
          const prevZone = prevCardZones.get(id);

          // TODO create an active zone in middle of screen

          // if (currZone !== prevZone) {

            const container = el.querySelector(containerSelector);

            // TODO: Remove!
            if (container) {

              if (faceDownZones.includes(prevZone) && faceUpZones.includes(currZone)) {
                container.classList.remove(faceDownClass);
                container.classList.add(faceUpClass);
              } else if (faceUpZones.includes(prevZone) && faceDownZones.includes(currZone)) {
                container.classList.remove(faceUpClass);
                container.classList.add(faceDownClass);
              }
            }
          // }
          prevCardZones.set(id, currZone)
        });

        document.querySelectorAll('[data-face]').forEach(el => {
          const id = el.getAttribute('data-face');
          if (!id) return;

          const currZone = state.cards.find((data)=>data.id === parseInt(id, 10))?.zone
          const prevZone = prevCardZones.get(id);

          if (!prevZone) return;

          // TODO create an active zone in middle of screen

          if ( currZone !== prevZone) {

              if (faceDownZones.includes(prevZone) && faceUpZones.includes(currZone)) {
                el.classList.remove(faceDownClass);
                el.classList.add(faceUpClass);
              }
  
              if (faceUpZones.includes(prevZone) && faceDownZones.includes(currZone)) {
                el.classList.remove(faceUpClass);
                el.classList.add(faceDownClass);
              }
            }

          prevCardZones.set(id, currZone)
        });

        // Next frame: play the movement transition by removing the transform
        requestAnimationFrame(() => {
          // Ensure movement uses a timed transition
          willTranslate.forEach(el => {
            el.style.transition = `transform ${duration}ms ease`;
            // Trigger the invert -> play by clearing transform
            // (The flip class change was already applied above.)
            el.style.transform = '';
          });

          // Cleanup after duration
          setTimeout(() => {
            willTranslate.forEach(el => {
              el.style.transition = '';
            });
            prevState.clear();
            resolve();
          }, duration);
        });
      });
    }
  };
}
