import { html, mapZoneList } from '../sparse'
import { filterByZone } from '../utils'
import { card } from './card'

export function takeModal (state) {
    return html`
        <div class="dialog">
            <div>
                <div>Select this pile of cards by clicking the take button. Cards resolve in numerical order.</div>
                <div>Played cards go to the bottom of the deck after resolving.</div>
            </div>
            <div class="flex-column">
                <div class="flex-cards">
                ${  
                    mapZoneList(state.cards, "takeModal",  (cardData, i) => {
                        return html`
                        <div>
                            <div class="deck-card-wrapper">${card(cardData, true, false, false)}</div>
                        ${
                            filterByZone(state.cards, "takeModal")?.length > 1 ?
                            html`<div class="number-buttons-wrapper"><button class="jagged" onclick="methods.orderCards(${cardData.id}, false)">⬅</button><div class="number">${i+1}</div><button class="jagged" onclick="methods.orderCards(${cardData.id}, true)">⮕</button></div>` : ''
                        }
                        </div>`
                    })
                }
                </div>

            </div>
            <div class="flex-row dialog-ui">
                <button class="jagged" onclick="methods.cancelTakeModal()">Close</button>
                <button class="jagged" onclick="methods.submitTakeModal()">Play & Pass</button>
            </div>
        </div>
  `
}
