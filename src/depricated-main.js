import { initState } from './shape'
import { render, html, mapList } from './sparse'
import { createFlipAnimator } from './flipping.js';

const flip = createFlipAnimator();

import './style.css'
import { dealPhase, move, shuffleArray } from './utils.js';
import { genCards } from './gen-cards.js';
import { gameArea } from './components/game-area.js'
import { gameState } from './state.js';

const appNode = document.querySelector('#app')

// const Greeting = (state) => html`
//   <p>Hello, <strong>${state.name || 'stranger'}</strong>!</p>
// `

// const TodoItem = (todo, i) => html`
//   <li data-flip=${todo}>
//     ${todo}
//     <button onclick="methods.removeElement(${i})">❌</button>
//   </li>
// `

// const initApp = (state) => {
//   flip.startFlip();
//   render(appNode, () => html`
//   <div>
//     <h1>Tinyview Greeting Component Test</h1>
//     ${Greeting(state)}

//     <h2>Element Test</h2>
//     <button onclick="methods.addElement()">Add</button>

//     <ul>
//       ${mapList(state.todos, (todo, i) => TodoItem(todo, i))}
//     </ul>
//   </div>
// `)
//   flip.endFlip(400).then(() => {
//     console.log("Animation done!");
//   });
// }

const initApp = (state) => {
  flip.startFlip();
  render(appNode, ()=> gameArea(state))
  // TODO needs to include flip face up if that change
  flip.endFlip(400).then(() => {
    // console.log("Animation done!");
  });
}
const store = initState(gameState, initApp)
// const store = initState({ name: 'test', newTodo: 'hi', todos: ['this', 'is', 'a', 'test'] }, initApp)


// const addElement = () => {
//   const state = store.get()
//   console.log(state.newTodo)
//   if (state.newTodo.trim()) {
//     state.todos.push(state.newTodo.trim())
//     const test = ['this', 'is', 'a', 'test']
//     store.set("newTodo", test[Math.floor(Math.random() * test.length)])
//   }
// }

// const removeElement = (i) => {
//   const state = store.get()
//   /* Using splice doesn't work because it mutates the array, but Proxy traps (set, deleteProperty, etc.) don’t fire for internal changes to arrays like .splice() or .push(). So state.todos.splice(i, 1) mutates the array in-place, and the Proxy doesn't notice, so no re-render. You can always trigger a rerender with tinyview.state = state. */
//   state.todos = [...state.todos.slice(0, i), ...state.todos.slice(i + 1)]
//   const newArr = shuffleArray(state.todos)
//   store.set("todos", newArr)
// }
// function moveItems(source, destination, predicate) {
//   for (let i = source.length - 1; i >= 0; i--) {
//     if (predicate(source[i], i)) {
//       destination.push(source[i]);
//       source.splice(i, 1);
//     }
//   }
// }

const advancePhase = () => {
  const phase = setNewPhase()

  if (phase === "deal") {
    deal()
    setTimeout(() => {
      setNewPhase()
    }, 500);
  } else if (phase === "play") {
      const phaseStatePhase = store.get()
      phaseStatePhase.isModalOpen = true
      store.set(phaseStatePhase)
  } else if (phase === "end") {
    // TODO: Allow for multiple players
    const endStatePhase = store.get()
    if (endStatePhase.player.play.length > 15 && endStatePhase.opponent.play.length > 15) {
      alert("It's a draw")
    } else if (endStatePhase.player.play.length > 15) {
      alert("Player 2 wins")
    } else if (endStatePhase.opponent.play.length > 15) {
      alert("Player 1 wins")
    } else {
      // switch to opponent
      setNewPhase()
      deal()
      setTimeout(() => {
        setNewPhase()
      }, 500);
    }
  }

  const deal = () => {
    for (let index = 0; index < 3; index++) {
      const stateDealPhase = store.get()
      move(stateDealPhase.deck, stateDealPhase["pile"+(index+1)], stateDealPhase.deck[stateDealPhase.deck.length - 1].id)
      store.set(stateDealPhase)
    }
  }

  function setNewPhase () {
    const statePhase = store.get()
    const currentPhaseIndex = statePhase.currentPhase
    const phaseIndex = currentPhaseIndex !== undefined ? currentPhaseIndex + 1 >= statePhase.phases.length ? 0 : currentPhaseIndex + 1 : 0
    const updatedPhase = statePhase.phases[phaseIndex]
    statePhase.currentPhase = phaseIndex
    console.log(statePhase.currentPhase)
    store.set(statePhase)
    return updatedPhase
  }
  

  // if deal, disable UI wait 200ms then advance
  // disable UI -> noCardClick: true and noAdvancePhase: true



  // advance currentPhase
  // if start await promise
  // if deal ->

  // move(state.deck, state.pile2, state.deck[state.deck.length - 1])
  // store.set(state)
  // move(state.deck, state.pile3, state.deck[state.deck.length - 1])
  // store.set(state)
    // await deal promise
  // if take await take promise
  // if action await promise
  // if build await promise
  // if discard await promise
}

const submitTakeModal = () => {
  const genState = store.get()
  genState.isModalOpen = false
  store.set(genState)

  activateMoveCard(0)
  
  function activateMoveCard () {
    const addState = store.get()
    const pile = addState[addState.selectedPile]
    if (pile.length > 0) {
      const activeCard = pile[0]
      // actvate card
      console.log("activate")
      const activePlayer = addState[addState.activePlayer]
      activeCard.isFaceUp = true
      move(pile, activePlayer.hand, activeCard.id)
      store.set(addState)
      setTimeout(() => {
        activateMoveCard()
      }, 500);
    } else {
      advancePhase()
    }
  }
}

const cancelTakeModal = () => {
  const state = store.get()
  state.isModalOpen = false
  store.set(state)
}

const submitPlayModal = () => {
  const state = store.get()
  state.isModalOpen = false
  activateMoveCard()

  function activateMoveCard () {
    const addState = store.get()
    const hand = addState.player.hand
    const play = addState.player.play
    const selectedCard = hand.find((tmpCard)=>tmpCard.isSelected === true)

    if (selectedCard) {
      // actvate card
      selectedCard.isFaceUp = true
      move(hand, play, selectedCard.id)
      selectedCard.isSelected = false
      store.set(addState)
      setTimeout(() => {
        activateMoveCard()
      }, 500);
    } else {
      advancePhase()
    }
  }
  
  store.set(state)
}

const cancelPlayModal = () => {
  const state = store.get()
  state.isModalOpen = false
  store.set(state)
}

const viewPile = (pileName) => {
  const state = store.get()
  if (state.currentPhase !== 1) return
  state.selectedPile = pileName
  state.isModalOpen = true
  store.set(state)
}

const setSelected = (originZone, id) => {
  const addState = store.get()
  // const card
  let tmpZone;
  if (originZone.length > 1) {
    tmpZone = addState[originZone[0]][originZone[1]]
  } else {
    tmpZone = addState[originZone[0]]
  }
  const selectedCard = tmpZone.find((card)=>card.id === id)
  selectedCard.isSelected = !selectedCard.isSelected
  store.set(addState)
}

window.methods = {
  advancePhase,
  submitTakeModal,
  cancelTakeModal,
  submitPlayModal,
  cancelPlayModal,
  setSelected,
  viewPile,
}

window.methods.advancePhase()


// // start (check if cards in play for either player have start ability) trigger. Do for all phases.

// const test = () => console.log("turn 2")
// // yield*
// function* turn () {
//   yield dealPhase(store) // setTimeout then iterator.next() // iterator.next().value

//   // If player reveal cards and activate selection and submit
//   // If comp select cards to play and submit
  
//   // Resolve selected cards
//     // If player reveal cards and activate selection and submit
//     // If comp select cards to play and submit
//     // Put those cards in to play

//   // End turn and flip player

//   yield test()


// }

// export const iterator = turn();

// // iterator.next() to start turn




function emojiLowPoly(emoji, {
  size=256, cell=14, jitter=0.85, target=document.body
}={}) {
  const S=size, NS="http://www.w3.org/2000/svg";
  const clamp=(v)=>Math.max(0, Math.min(S-1, v));
  const c=document.createElement('canvas'), x=c.getContext('2d', {willReadFrequently:true});
  c.width=c.height=S;

  function drawOnce(str, fontFamily) {
    x.clearRect(0,0,S,S);
    x.textAlign='center';
    x.textBaseline='middle';
    x.font=`${S*0.78}px ${fontFamily}`;
    x.fillStyle='#000';
    x.fillText(str, S/2, S/2);
  }
  function hasInk() {
    const d=x.getImageData(0,0,S,S).data;
    for (let i=3;i<d.length;i+=4) if (d[i]!==0) return true;
    return false;
  }

  // Try to render the emoji (color if possible, fallback to mono glyphs)
  const fonts = [
    `"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`,
    `"Segoe UI Emoji","Noto Color Emoji","Apple Color Emoji",sans-serif`,
    `sans-serif`
  ];
  let drawn=false, str=emoji;
  for (let attempt=0; attempt<3 && !drawn; attempt++) {
    drawOnce(str, fonts[attempt]);
    drawn = hasInk();
    if (!drawn && attempt===0 && !/\uFE0F/.test(str)) {
      // Try forcing emoji presentation form
      str = emoji + '\uFE0F';
      attempt--; // retry attempt 0 with VS16
    }
  }
  if (!drawn) {
    // As a last resort, draw a black square so you at least see triangles
    x.clearRect(0,0,S,S);
    x.fillStyle='#000'; x.fillRect(S*0.25,S*0.25,S*0.5,S*0.5);
  }

  // Build jittered grid
  const pts=[], jMag=cell*jitter*0.5;
  for (let y=0; y<=S; y+=cell) {
    const row=[];
    for (let x0=0; x0<=S; x0+=cell) {
      const jx = (x0>0&&x0<S) ? (Math.random()*2-1)*jMag : 0;
      const jy = (y>0&&y<S) ? (Math.random()*2-1)*jMag : 0;
      row.push([clamp(x0+jx), clamp(y+jy)]);
    }
    pts.push(row);
  }

  const svg=document.createElementNS(NS,'svg');
  svg.setAttribute('viewBox',`0 0 ${S} ${S}`);
  svg.setAttribute('width',S); svg.setAttribute('height',S);

  const tri=(a,b,cpt)=>{
    const cx=clamp(((a[0]+b[0]+cpt[0])/3)|0), cy=clamp(((a[1]+b[1]+cpt[1])/3)|0);
    const d=x.getImageData(cx,cy,1,1).data;
    if (d[3] < 1) return; // extremely permissive cutoff
    const p=document.createElementNS(NS,'polygon');
    p.setAttribute('points', `${a} ${b} ${cpt}`);
    p.setAttribute('fill', `rgba(${d[0]},${d[1]},${d[2]},${(d[3]/255).toFixed(3)})`);
    svg.appendChild(p);
  };

  for (let j=0;j<pts.length-1;j++) {
    for (let i=0;i<pts[j].length-1;i++) {
      const p00=pts[j][i], p10=pts[j][i+1], p01=pts[j+1][i], p11=pts[j+1][i+1];
      if (Math.random()<0.5) { tri(p00,p10,p11); tri(p00,p11,p01); }
      else                   { tri(p00,p10,p01); tri(p10,p11,p01); }
    }
  }

  (target||document.body).appendChild(svg);
  return svg;
}

// demo
// emojiLowPoly('🦊', { size:100, cell:6, jitter:0.9, target: document.querySelector('#out') });

