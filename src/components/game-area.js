import { html, mapList, mapZoneList } from '../sparse'
import { phaseNames, story } from '../state'
import { filterByZone } from '../utils'
import { card } from './card'
import { playModal } from './play-modal'
import { takeModal } from './take-modal'

export function gameArea (state) {
    const phase = phaseNames[state.currentPhase]
    const flipPlayer = state.currentPhase ? [ "play", "end"] : ["take", "end"]
    const currentPlayer = flipPlayer.includes(phase) ? state.activePlayer === "player" ? "opponent" : "player" : state.activePlayer
    
    return html`
    <div class="${state.isStarted ? "hidden" : ""}" id="story-wrapper">
        ${
            mapList(story, (text, i) => {
                if (i > state.storyIndex) return null
                if(i === state.storyIndex) return html`<div class="last-line">${text}</div>`
               return html`<div>${text}</div>`
            })
        }
    </div>
    <div class="${state.isStarted ? "" : "ui-wrapper"}">
        <div>
            <div class="phases-wrapper ${currentPlayer !== "player" ? "void-phase jagged" : ""}">
                ${currentPlayer === "player" ? "YOUR TURN: " : "VOID'S TURN: "}
                ${mapList(state.phases, (phase, i) => html`<div class="phase-wrapper ${state.currentPhase === i ? "active" : ""}">${phase.toUpperCase()}</div>`)}
            </div>
            <div class="game-area-wrapper">
                <div class="deck-dealt-wrapper">
                    <div class="deck-wrapper">${
                        mapZoneList(state.cards, "deck", (cardData, i) => html`<div class="deck-card-wrapper" style="${"bottom:"+(Math.floor(i/3))+"px;right:"+(Math.floor(i/6))+"px"}">${card(cardData,false, false, false)}</div>`)
                    }</div>
                    <div class="pile-wrapper pile-1-wrapper">${
                        mapZoneList(state.cards, 'pile1', (cardData, i) => html`<div onclick="methods.viewPile('pile1')" class="pile" style="${"bottom:"+(i*2)+"px;right:"+(i*2)+"px"}">${card(cardData, false, false, true)}</div>`)
                    }</div>
                    <div class="pile-wrapper pile-2-wrapper">${
                        mapZoneList(state.cards, 'pile2', (cardData, i) => html`<div onclick="methods.viewPile('pile2')" class="pile" style="${"bottom:"+(i*2)+"px;right:"+(i*2)+"px"}">${card(cardData, false, false, true)}</div>`)
                    }</div>
                    <div class="pile-wrapper pile-3-wrapper">${
                        mapZoneList(state.cards, 'pile3', (cardData, i) => html`<div onclick="methods.viewPile('pile3')" class="pile" style="${"bottom:"+(i*2)+"px;right:"+(i*2)+"px"}">${card(cardData, false, false, true)}</div>`)
                    }</div>
                </div>
                
            </div>

        </div>
        <div class="flex-row-top">
            <div class="play-area-wrapper area-wrappers play-area-min-height">
                <div class="play-area-header">⚪ YOUR PLAY AREA (${filterByZone(state.cards, "playerPlay").length})</div>
                <div class="flex-cards">
                ${
                    mapZoneList(state.cards, "playerGoal", (cardData, i) => html`<div>${card(cardData, true, true)}</div>`)
                }
                ${
                    mapZoneList(state.cards, "playerPlay", (cardData, i) => html`<div>${card(cardData, false, false, false, true)}</div>`)
                }
                </div>
            </div>

            <div class="play-area-wrapper area-wrappers play-area-min-height">
                <div class="play-area-header">⚫ THE VOIDS'S PLAY AREA (${filterByZone(state.cards, "opponentPlay").length})</div>
                <div class="flex-cards">
                    ${
                        mapZoneList(state.cards, "opponentGoal", (cardData, i) => html`<div>${card(cardData, true, state.winner ? true : false)}</div>`)
                    }
                    ${
                        mapZoneList(state.cards, "opponentPlay", (cardData, i) => html`<div class="pile">${card(cardData, false, state.winner ? true : false, false)}</div>`)
                    }
                </div>
            </div>    
        
        </div>
        </div>  
        <div class="dialog-wrapper ${state.isModalOpen || state.storyIndex === 0 ? "" : "hidden"}">
            ${
                state.storyIndex === 0 ? playModal(state) : null
            }
            ${
                state.currentPhase === 1 && state.isStarted === true ?
                takeModal(state) : null

            }
        </div>
        <div class="active-card-wrapper flex-row">
            ${
                mapZoneList(state.cards, "active", (cardData, i) => html`<div class="pile">${card(cardData, false, false, false, true)}</div>`)
            }
        </div>
 
  `
}