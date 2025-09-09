import { initState } from './shape'
import { render } from './sparse'
import { createFlipAnimator } from './flipping.js';
import { animateEyesDialate, animateEyesWide, delay, filterByZone, randArr } from './utils.js';
import { gameArea } from './components/game-area.js'
import { getGameState, story } from './state.js';
import { eyes } from './components/eyes.js';
import { abilities } from './abilities.js';
import { startSound } from './sound.js';

const flip = createFlipAnimator();

import './style.css'

let _gameLoopStarted = false; 

// ---- Phase gate (drop near the top) ----
let _resolveDepth = 0;        // how many async resolution batches are active
let _advanceQueued = false;   // whether someone asked to advance while locked

/** --------------------------------------------------------------
 * Small utilities
 * -------------------------------------------------------------*/

const getZoneFromOrigin = (state, originZone) =>
  originZone.length > 1 ? state[originZone[0]][originZone[1]] : state[originZone[0]];

const appNode  = document.querySelector("#app");
const eyesNode = document.querySelector("#eyes");

/** --------------------------------------------------------------
 * App / Store Initialization
 * -------------------------------------------------------------*/
const initApp = async (state) => {
  flip.startFlip(state);
  render(appNode, () => gameArea(state));
  flip.endFlip(500, state);
};

setTimeout(() => {
  gameLoop()
}, 200);

async function gameLoop () {
  const beginResolutionBatch = () => { _resolveDepth++; };
  const endResolutionBatch   = () => {
  _resolveDepth = Math.max(0, _resolveDepth - 1);
  if (_resolveDepth === 0 && _advanceQueued) {
    _advanceQueued = false;
    // important: do NOT await here; we want queued callers to finish
    advancePhase(); 
  }
  };

  // Call this instead of advancePhase() directly.
  const requestAdvancePhase = async () => {
  if (_resolveDepth > 0) { _advanceQueued = true; return; }
  await advancePhase();
  };

  if (_gameLoopStarted) {
    return;
  } else {
    _gameLoopStarted = true
  }
  const gameState = await getGameState()
  const store = initState(gameState, initApp);
  listenForMKey();
  render(eyesNode, () => eyes());

  /** --------------------------------------------------------------
   * Helpers specific to game rules/flow
   * -------------------------------------------------------------*/
  const phaseName = () => {
    const s = store.get();
    return s.phases[s.currentPhase ?? 0];
  };
  const isPhase = (name) => phaseName() === name;

  /** Move by id with insertion control. */
  const moveById = (from, to, id, { toStart = false } = {}) => {
    const idx = from.findIndex((o) => o.id === id);
    if (idx === -1) return false;
    const [card] = from.splice(idx, 1);
    if (toStart) to.unshift(card);
    else to.push(card);
    return true;
  };

  /** Put resolved card onto the BOTTOM of the deck (index 0). */
  const moveToDeckBottom = (cardId) => {
    const s = store.get();
    const deck = filterByZone(s.cards, "deck")
    const orderVal = deck[0].zoneOrder
    const card = s.cards.find((data)=>data.id === cardId)
    if (s.isPileToPlay === "play") { // TODO do no include this card
      const playArea = s.activePlayer === "player" ? 'playerPlay' : 'opponentPlay'
      card.zone =playArea;
    } else {
      card.zone = "deck";
      card.zoneOrder = orderVal + 1;
    }
    if (s.isPileToPlay === "next") s.isPileToPlay = "play"
    store.set(s);
  };

  /** Deal 1 card to each pile from deck top. */
  const dealToPiles = async () => {
    for (let i = 1; i <= 3; i++) {
      const s = store.get();
      const deck = filterByZone(s.cards, "deck")

      const top = deck[deck.length - 1]
      if (!top) break;
      top.zone = `pile${i}`
      store.set(s);
    }
  };

  /** --------------------------------------------------------------
   * Abilities
   * -------------------------------------------------------------*/
  const resolveAbilities = async (activeCard, owner, locationPath) => {
    if (!activeCard || !Array.isArray(activeCard.abilityFunct)) return;

    beginResolutionBatch();
    for (let index = 0; index < activeCard.abilityFunct.length; index++) {
      const abilityString = activeCard.abilityFunct[index];

      const [key, raw] = String(abilityString).split(":");
      let value = raw ? parseInt(raw, 10) : 0;
      if (Number.isNaN(value)) value = raw;
      if (abilities[key]) {
        await abilities[key](store, owner, value);
      }
      
    }

    const s = store.get();
    let location;
    if (locationPath.length > 1) {
      location = s[locationPath[0]][locationPath[1]]
    } else {
      location = s[locationPath[0]]
    }
    const selected = location.find(card => card.id === activeCard.id)
    if (selected) {
      const deck = filterByZone(s.cards, "deck")
      selected.zone = 'deck';
      selected.zoneOrder = deck[deck.length - 1].zoneOrder + 1;
      store.set(s);
    }
    endResolutionBatch();
  };

  /** --------------------------------------------------------------
   * Core Phase Engine
   * -------------------------------------------------------------*/
  const setNewPhase = () => {
    const s = store.get();
    const nextIndex =
      s.currentPhase === undefined
        ? 0
        : s.currentPhase + 1 >= s.phases.length
        ? 0
        : s.currentPhase + 1;
    s.currentPhase = nextIndex;
    store.set(s);
    return s.phases[nextIndex];
  };

  async function advancePhase () {
    const s = store.get();
    if (s.winner) {
      alert(s.winner)
      return
    }
    const phase = setNewPhase();

    if (s.activePlayer === "player") {
      await runPlayerPhase(phase);
    } else {
      await runOpponentPhase(phase);
    }
  };

  const setIsPhaseButtonDisabled = (bool) => {
    const s = store.get();
    s.isPhaseButtonDisabled = bool
    store.set(s);
  }

  /** ----------------- Player Turn ----------------- */
  async function runPlayerPhase(phase) {
    setIsPhaseButtonDisabled(true)
    if (phase === "deal") {
      animateEyesWide(true)
      await await dealToPiles();
      await delay(500);
      await requestAdvancePhase();
    }

    if (phase === "take") {
      return;
    }

    if (phase === "end") {
      endPhase();
      await requestAdvancePhase();
    }
  }

  /** --------------- Opponent Turn ----------------- */
  async function runOpponentPhase(phase) {
    setIsPhaseButtonDisabled(true)
    if (phase === "deal") {
      animateEyesDialate(true)
      await dealToPiles();
      await delay(500);
      await requestAdvancePhase();
    }

    if (phase === "take") {
      await opponentTake();
      await delay(3000);
      setIsPhaseButtonDisabled(false)
    }

    if (phase === "end") {
      animateEyesDialate(false)
          //TODO happens to early sometimes
      endPhase();
      await requestAdvancePhase();
    }
  }

  async function opponentTake() {
    beginResolutionBatch();
    animateEyesWide()
    const s = store.get();
    const opponentPlay = filterByZone(s.cards, 'opponentPlay')
    const pile1 = filterByZone(s.cards, 'pile1')
    const pile1Dict = getTypeNumbers(pile1)
    const pile2 = filterByZone(s.cards, 'pile2')
    const pile2Dict = getTypeNumbers(pile2)
    const pile3 = filterByZone(s.cards, 'pile3')
    const pile3Dict = getTypeNumbers(pile3)
    s.selectedPile = randArr(['pile1', 'pile2', 'pile3'])
    if (opponentPlay.length >= 13) {
      if (checkMostType('echo')) s.selectedPile = checkMostType('echo');
    } else if (opponentPlay.length <= 7) {
      if (checkMostType('rift')) s.selectedPile = checkMostType('rift');
    } else {
      if (checkMostType('omen')) {
        const pileName = checkMostType('omen')
        s.selectedPile = pileName;
        const pileCards = filterByZone(s.cards, pileName)
        pileCards.forEach((data)=>{
          if (data.abilityFunct[0] === 'remianingCardsInPileGoToYourPlayArea') {
            data.zoneOrder = 100
          }
        })
      }
    }

    store.set(s);

    await delay(200);
    await takeMoveCards(); // resolves then sends to bottom of deck
    endResolutionBatch();
    await requestAdvancePhase();

    function checkMostType (type) {
      if (pile1Dict[type] > pile2Dict[type] && pile1Dict[type] > pile3Dict[type]) {
        return 'pile1'
      }
      if (pile2Dict[type] > pile1Dict[type] && pile2Dict[type] > pile3Dict[type]) {
        return 'pile2'
      }
      if (pile3Dict[type] > pile1Dict[type] && pile3Dict[type] > pile2Dict[type]) {
        return 'pile3'
      }
    }

    function getTypeNumbers (pile) {
      const pileDict = {
        rift: 0,
        echo: 0,
        omen: 0
      }
      pile.forEach((data)=>{
        if (data.types.includes('rift')) {
          pileDict.rift = pileDict.rift + 1
        }
        if (data.types.includes('echo')) {
          pileDict.echo = pileDict.echo + 1
        }
        if (data.types.includes('omen')) {
          pileDict.omen = pileDict.omen + 1
        }
      })
      return pileDict;
    }
  }

  /** TAKE: resolve the currently selected pile, one by one, then card -> bottom of deck. */
  async function takeMoveCards() {
    // keep draining the selected pile
    while (true) {
      const s = store.get();
      const pile = filterByZone(s.cards, s.selectedPile).reverse();
      if (!Array.isArray(pile) || pile.length === 0) break;

      const activeCard = pile[pile.length - 1];
      if (!activeCard) break;

      activeCard.isFaceUp = true;
      activeCard.zone = "active";
      store.set(s);

      await delay(2000);
      await resolveAbilities({...activeCard}, s.activePlayer, [s.selectedPile]);
      
      // Put onto BOTTOM of the deck
      moveToDeckBottom(activeCard.id);


      await delay(1000);
    }
    const state = store.get();
    state.isPileToPlay = "deck";
    state.player.play = state.player.play.sort((card)=>card.isExhausted)
    state.opponent.play = state.opponent.play.sort((card)=>card.isExhausted)
    store.set(state);
  }

  const cancelPlayModal = () => {
    animateEyesWide(false, 750)
    const state = store.get();
    state.isModalOpen = false;
    store.set(state);
    startStory ()
  };

  const skipIntro = () => {
    const state = store.get();
    state.isModalOpen = false;
    state.isStarted = true;
    state.storyIndex = story.length;
    store.set(state);
    window.methods.advancePhase();
  };

  function startStory () {
    const state = store.get();
    if (state.storyIndex >= story.length - 1) {
      state.isModalOpen = false;
      state.isStarted = true;
      store.set(state);
      window.methods.advancePhase();
    } else {
      state.storyIndex = state.storyIndex + 1;
      store.set(state);
      setTimeout(startStory, 3000);
      document.querySelector('.last-line')?.classList.add('visible')
    }
  }

  /** TAKE (Player modal): choose a pile then resolve -> deck bottom. */
  const submitTakeModal = async () => {
    const s = store.get();
    s.isModalOpen = false;
    const modalCards = filterByZone(s.cards, "takeModal")
    modalCards.forEach((card)=>card.zone = s.selectedPile)
    store.set(s);

    beginResolutionBatch();
    await delay(500);
    await takeMoveCards();
    await delay(500);

    endResolutionBatch();
    await requestAdvancePhase();
  };

  const cancelTakeModal = () => {
    if (!isPhase("take")) return;
    const s = store.get();
    if (s.activePlayer === "opponent") return
    const takeCards = filterByZone(s.cards, "takeModal") 
    s.isModalOpen = false;
    takeCards.forEach((data)=>{
      data.zone = s.selectedPile
    })
    store.set(s);
  };

  /** --------------------------------------------------------------
   * End phase / victory check
   * -------------------------------------------------------------*/
  function endPhase() {
    const s = store.get();

    const pCards = filterByZone(s.cards, 'playerPlay');
    const oCards = filterByZone(s.cards, 'opponentPlay');

    const pGoal = filterByZone(s.cards, 'playerGoal');
    const oGoal = filterByZone(s.cards, 'opponentGoal');

    const pGoalType = pGoal[0].types[0]
    const oGoalType = oGoal[0].types[0]

    const pGoalTypeCards = pCards.filter((data)=>data.isExhausted === false && data.types.includes(pGoalType))
    const oGoalTypeCards = oCards.filter((data)=>data.isExhausted === false && data.types.includes(oGoalType))

    if (s.activePlayer === "opponent" && oGoalTypeCards.length > 7) {
      s.winner = "You lost because your opponent completed their goal card!";
    } else if (s.activePlayer === "player" && pGoalTypeCards.length > 7) {
      s.winner = "You won for completeing your goal card!";
    }else if (s.activePlayer === "player" && pCards.length >= 15) {
      s.winner = "You lost because you had 15 or more cards in your play area!";
    } else if (s.activePlayer === "opponent" && oCards.length >= 15) {
      s.winner = "You won because your opponent had 15 or more cards in their play area!";
    }

    // swap active player
    s.activePlayer = s.activePlayer === "player" ? "opponent" : "player";
    store.set(s);
  }

  /** --------------------------------------------------------------
   * UI helpers
   * -------------------------------------------------------------*/
  const viewPile = (pileName) => {
    if (!isPhase("take")) return;
    const s = store.get();
    if (s.activePlayer === "opponent") return
    const pileCards = filterByZone(s.cards, pileName) 
    s.selectedPile = pileName;
    s.isModalOpen = true;
    pileCards.forEach((data)=>{
      data.zone = "takeModal"
    })
    store.set(s);
  };

  const setSelected = (originZone, id) => {
    const s = store.get();
    const zone = getZoneFromOrigin(s, originZone);
    const card = zone?.find((c) => c.id === id);
    if (!card) return;
    card.isSelected = !card.isSelected;
    store.set(s);
  };

  const orderCards = (id, moveRight) => {
    const s = store.get();
    const cards = filterByZone(s.cards, "takeModal");
    cards.forEach((card, i) => {
      if (card.id === id) {
        // Nudge target card left or right
        card.zoneOrder = moveRight ? i + 1.5 : i - 1.5;
      } else {
        // Everyone else stays in order
        card.zoneOrder = i;
      }
    });

    // Sort by the nudged order, then normalize to 1..N
    cards
      .sort((a, b) => a.zoneOrder - b.zoneOrder)
      .reverse()
      .forEach((c, i) => { c.zoneOrder = i + 1; });

    store.set(s);
  };

  /** --------------------------------------------------------------
   * Expose methods for UI
   * -------------------------------------------------------------*/
  window.methods = {
    advancePhase,
    submitTakeModal,
    cancelTakeModal,
    // submitPlayModal,
    cancelPlayModal,
    setSelected,
    viewPile,
    orderCards,
    skipIntro,
  };
}

function listenForMKey() {
  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "m") {
      startSound()
    }
  });
}






























// Slightly augmented version of XEMs nifty little music player https://xem.github.io/alphabet-piano/
//type: sine triangle square or sawtooth -> "-" pause "a-zA-Z" sounds "1-5" previous note length




// function sound (stringNotes, type, musicLength) { 
//   let noteLength;
//   let noteLengths = {
//     '5': 0.4, // full
//     '4': 0.3, // 3 quarters
//     '3': 0.2,
//     '2': 0.1,
//     '1': 0.05,
//   }
//   let skipList = Object.keys(noteLengths);
//   skipList.push('-')
//   window.AudioContext = window.AudioContext||window.webkitAudioContext;
//   let ctx = new AudioContext();
//   let gainNode=ctx.createGain();
//   for(let i=0;i<stringNotes.length;i++) {
//     noteLength = !isNaN(stringNotes[i+1]) ? noteLengths[stringNotes[i+1]] : musicLength ? musicLength : 0.1;
//     let oscNode = ctx.createOscillator();
//     if(stringNotes[i=+i]&&!skipList.includes(stringNotes[i])) {
//       oscNode.connect(gainNode);
//       gainNode.connect(ctx.destination);
//       oscNode.start(i*noteLength+.3);
//       oscNode.frequency.setValueAtTime(440*1.06**(-105+stringNotes.charCodeAt(i)),i*noteLength+.3);
//       oscNode.type= type ? type : 'sine';           
//       gainNode.gain.setValueAtTime(.5,i*noteLength+.3);
//       gainNode.gain.setTargetAtTime(.001,i*noteLength+.3+.1,.05);
//       oscNode.stop(i*noteLength+.3+noteLength-.01);
//     }
//   }
// }






