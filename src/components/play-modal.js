import { html } from '../sparse'

export function playModal (state) {
    return html`
        <div class="dialog">
            <div class="game-rules-wrapper">
                <div class="flex-col">
                    <div>Quick Rules</div>
                        <div>
                        <div>Win: End your turn with Goal card's goal met.</div>
                        <div>Lose: End your turn with 15+ cards in your Play Area. (Win checked before Loss)</div>
                        </div>

                        <div>
                        Setup: Shuffle deck. Each player takes 1 secret Goal Card.
                        </div>

                        <div>
                            Turn:
                            <ol>
                                <li>Deal 1 card to each Pile.</li>
                                <li>Choose 1 Pile. Order its cards.</li>
                                <li>Resolve all cards → bottom of deck (unless stated).</li>
                                <li>Check Goals (Win → Lose).</li>
                            </ol>
                        </div>

                        <div>
                            Terms:
                            <ul>
                                <li>Play Area - hidden set of drawn cards.</li>
                                <li>Exhausted - counts for Loss, not Goal</li>
                                <li>Flood - Opponent draws 1 into Play Area.</li>
                                <li>Return - Send back exhausted first, then oldest</li>
                            </ul>
                        </div>
                        <div>m Key: Turn on music</div>
                    <div><button class="jagged" onclick="methods.cancelPlayModal()">Start the Game</button></div>
                    <div><button class="jagged" onclick="methods.skipIntro()">Start & Skip Intro</button></div>
                </div>
            </div>
        </div>
  `
}
