import { faceDownZones, faceUpZones } from '../state';
import { html } from '../sparse'
import { emojiLowPolyPNGString } from '../utils';

const bkgrdImg = emojiLowPolyPNGString('🌌', { size: 500, cell: 15 });

const prevCardZones = new Map();

export function card (data, isFlipDisabled, isVisible=false, isPulsing) {

    let cardType = data.types[0];
    if (data.zone === "playerGoal" || data.zone === "opponentGoal" || data.types.length > 1) cardType = "multi"

    const prevZone = prevCardZones.get(data.id);
    const currZone = data.zone;

    let faceClassName = 'face-down';
    if (prevZone && currZone) {
      if (faceUpZones.includes(prevZone) && faceUpZones.includes(currZone)) {
        faceClassName = 'face-up'
      } else if (faceDownZones.includes(prevZone) && faceDownZones.includes(currZone)) {
        faceClassName = 'face-down'
      }
    }
    if (isVisible === true) faceClassName = 'face-up'

    prevCardZones.set(data.id, currZone)
    const rarity = data?.rarity ? data?.rarity?.toUpperCase() + ' - ' : ''
    
    return html`
    <div class="card-wrapper ${data.zone === "active" ? "active-card" : ""} ${data.isExhausted ? "played" : ""}" ${isFlipDisabled ? "" : "data-flip="+data.id}>
      <div class="card-container ${faceClassName}" data-face="${data.id}">
        <div class="card ${ isPulsing ? "pulse-border" : ""}">
          <div class="card-face front ${cardType}">
            <div class="card-inner-front">
              <div class="card-name">${data.name}</div>
              <img class="card-image" src="${data.cardArt}">
              ${
                data.isExhausted ? "" : html`<div class="card-type">${ rarity + data.types?.join(" - ")}</div>`
              }
              <div class="card-rules">${data.abilityRule?.join("\n")}</div>
            </div>

          </div>

          <div class="card-face back">
          <img class="back-pattern" src="${bkgrdImg}" />
          </div>
        </div>
      </div>
    </div>
  `
}