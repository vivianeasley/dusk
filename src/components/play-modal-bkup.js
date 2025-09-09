import { html, mapList } from '../sparse'
import { card } from './card'

export function playModal (state) {
    return html`
        <div class="dialog">
            <div>Select cards to play by clicking on them then hit the play button.</div>
            <div class="flex-col">
                Play
                <div class="flex-cards">
                ${  
                    mapList(state.player.hand, (cardData, i) => cardData.isSelected === true ? html`<div><div onclick="methods.setSelected(['player', 'hand'], ${cardData.id})" class="deck-card-wrapper" style="${"bottom:"+(Math.floor(i/3))+"px;right:"+(Math.floor(i/6))+"px"}">${card(cardData, true, true, true)}</div><button class="jagged" onclick="methods.orderCards(['player', 'hand'], ${cardData.id}, false)">⬅</button><button class="jagged" onclick="methods.orderCards(['player', 'hand'], ${cardData.id}, true)">⮕</button></div>` : null)
                }
                </div>
                ${
                    Boolean(state.player.hand.find((crd)=>crd.isSelected === true)) ? html`<div><button class="jagged" onclick="methods.submitPlayModal()">Play & Advance</button></div>` : ''
                }
                
                Hand
                <div class="flex-cards">
                ${  
                    mapList(state.player.hand, (cardData, i) => cardData.isSelected === false ? html`<div onclick="methods.setSelected(['player', 'hand'], ${cardData.id})" class="deck-card-wrapper" style="${"bottom:"+(Math.floor(i/3))+"px;right:"+(Math.floor(i/6))+"px"}">${card(cardData, true, true, true)}</div>` : null)
                }
                </div>
                <div><button class="jagged" onclick="methods.cancelPlayModal()">Pass & Advance</button></div>
            </div>
        </div>
  `
}
