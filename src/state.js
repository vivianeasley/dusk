import { genCards } from "./gen-cards";

export const phaseNames = ["deal", "take", "end"]

export const faceUpDict = {}

export const faceDownZones = ["deck", "opponentPlay", "opponentGoal", "pile1", "pile2", "pile3"];
export const faceUpZones = ["takeModal", "playerPlay",  "active", "playerGoal"];


// export const faceDownWinZones = ["deck", "pile1", "pile2", "pile3"];
// export const faceUpWinZones = ["takeModal", "playerPlay", "opponentPlay", "active", "playerGoal", "opponentGoal"];


const cards = genCards()

export const getGameState = () => {
  return new Promise((resolve)=> {
    resolve({
      isIntroSkipped: false,
      isUiHidden: true,
      storyIndex: 0,
      isStarted: false,
      isPhaseButtonDisabled: true,
      isPileToPlay: "deck",
      winner: undefined,
      activePlayer: "player",                  // "player" | "opponent"
      currentPhase: undefined,                 // index into phases
      phases: phaseNames,
      isModalOpen: false,
      ui: {},
      // deck: [...cards],
      cards: [...cards],                // 
      selectedPile: "pile1",
      pile1: [],
      pile2: [],
      pile3: [],
      player:   { id: 1, hand: [], play: [], isComputer: false },
      opponent: { id: 2, hand: [], play: [], isComputer: true  }
    })
  })
}

export const story = [
  '',
  'Well, well, well. Look what we have here?',
  'A small flicker of light at dusk.',
  'Delicious. I so rarely get guests',
  'I so rarely get any guests... guests.',
  `It's all so terrIBLY BORING I JUST WANT...`,
  `...I'm sorry I forget myself, forgot myself.`,
  'Welcome, you who stands at the edge twilight.',
  'Come, sit with me and play a game.',
  'It tastes like cards, and you wager yourself.',
  'The night is almost here... you get the first play.',
]
  
//   const methods = {
//     targetInPlay: async (isText, state) => {
//       if (isText) return 'Target a card in play';
//       const targetId = await getTarget('play', 'opponent')
//       return targetId
//     }, 
//     DiscardTarget: (isText, state, argsObj) => {
//       if (isText) return 'Discard that card';
//       const { targetArr } = findArrById(passedValue)
//       // remove from array and update state
//       return {...argsObj, targetArr}
//     },
//     TargetPlayerDraw: (isText, state, target, passedValue) => {
//       // if no target choose the player
//       if (isText) return 'Draw a card';
//       // passedValue cards from deck to hand
//       return passedValue
//     }
//   }
  