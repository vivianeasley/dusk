(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const Me=(e,n)=>{let r=structuredClone(e),s=!1;const t=()=>structuredClone(r),o=l=>{n(l),r=l};return s===!1&&(n(e),s=!0),{get:t,set:o}},R=e=>new Promise(n=>setTimeout(n,e)),pe=e=>{for(let n=e.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[e[n],e[r]]=[e[r],e[n]]}return e},fe=e=>e[Math.floor(Math.random()*e.length)],Se=e=>Math.floor(Math.random()*e)+1,xe=(e,n,r={})=>{var m,b;const s=e.getAttribute("d");if(!s)throw new Error(`Element "${id}" has no 'd' attribute`);const t=/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,o=(m=s.match(t))==null?void 0:m.map(Number),l=(b=n.match(t))==null?void 0:b.map(Number);if(!o||!l||o.length!==l.length)throw new Error("Start and target paths must have identical command structure and number count.");const c=r.easing||(k=>.5-.5*Math.cos(Math.PI*k)),f=Math.max(1,r.duration||800);return new Promise(k=>{const T=(E,A,M)=>E+(A-E)*M;let C;function O(E){C??(C=E);const A=Math.min(1,(E-C)/f),M=c(A),d=o.map((x,I)=>T(x,l[I],M)),v=s.replace(t,()=>{const x=d.shift();return Math.abs(x)<1e-6?"0":x.toFixed(3).replace(/\.?0+$/,"")});e.setAttribute("d",v),A<1?requestAnimationFrame(O):k()}requestAnimationFrame(O)})},le=(e,n)=>{const r=document.querySelectorAll(".upper-brow"),s=e?600:600+Se(200),t=`m-6,0l649,0l0,${n||s}c-119.17,-95.85 -41.92,-306.25 -163.12,-392.89c-104.61,-77.09 -381.27,-13.02 -485.88,-90.11z`;for(let o=0;o<r.length;o++)xe(r[o],t,{duration:200+s*3})},he=e=>{const n=document.querySelectorAll(".iris"),r=e?"m345.22,45c-188.76,49.98 -199.63,117.3 -216.1,197.88c2.69,140.76 156.4,202.98 220.35,210.12c2.13,0 200.44,-22.44 196.5,-210.12c-5.14,-149.94 -200.76,-197.88 -200.76,-197.88z":"m330.55,45c-23.96,49.98 -25.34,117.3 -27.43,197.88c0.34,140.76 19.85,202.98 27.97,210.12c0.27,0 25.44,-22.44 24.94,-210.12c-0.65,-149.94 -25.48,-197.88 -25.48,-197.88z";for(let s=0;s<n.length;s++)setTimeout(()=>{xe(n[s],r,{duration:500})},2200)},h=(e,n)=>e.filter(r=>r.zone===n).sort((r,s)=>r.zoneOrder-s.zoneOrder).reverse(),L=(e,{size:n=180,cell:r=14,jitter:s=.85}={})=>{const t=n,o=d=>Math.max(0,Math.min(t-1,d)),l=document.createElement("canvas");l.width=l.height=t;const c=l.getContext("2d",{willReadFrequently:!0});function f(d,v){c.clearRect(0,0,t,t),c.textAlign="center",c.textBaseline="middle",c.font=`${t}px ${v}`,c.fillStyle="#000",c.fillText(d,t/2,t/1.59)}function m(){const d=c.getImageData(0,0,t,t).data;for(let v=3;v<d.length;v+=4)if(d[v]!==0)return!0;return!1}const b=['"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif','"Segoe UI Emoji","Noto Color Emoji","Apple Color Emoji",sans-serif',"sans-serif"];let k=!1,T=e;for(let d=0;d<3&&!k;d++)f(T,b[d]),k=m(),!k&&d===0&&!/\uFE0F/.test(T)&&(T=e+"️",d--);k||(c.clearRect(0,0,t,t),c.fillStyle="#000",c.fillRect(t,t,t,t));const C=[],O=r*s*.5;for(let d=0;d<=t;d+=r){const v=[];for(let x=0;x<=t;x+=r){const I=x>0&&x<t?(Math.random()*2-1)*O:0,G=d>0&&d<t?(Math.random()*2-1)*O:0;v.push([o(x+I),o(d+G)])}C.push(v)}const E=document.createElement("canvas");E.width=t,E.height=t+20;const A=E.getContext("2d");function M(d,v,x){const I=o((d[0]+v[0]+x[0])/3|0),G=o((d[1]+v[1]+x[1])/3|0),F=c.getImageData(I,G,1,1).data;F[3]<1||(A.beginPath(),A.moveTo(d[0],d[1]),A.lineTo(v[0],v[1]),A.lineTo(x[0],x[1]),A.closePath(),A.fillStyle=`rgba(${F[0]},${F[1]},${F[2]},${(F[3]/255).toFixed(3)})`,A.fill())}for(let d=0;d<C.length-1;d++)for(let v=0;v<C[d].length-1;v++){const x=C[d][v],I=C[d][v+1],G=C[d+1][v],F=C[d+1][v+1];Math.random()<.5?(M(x,I,F),M(x,F,G)):(M(x,I,G),M(I,F,G))}return E.toDataURL("image/png")},$=(e,...n)=>e.reduce((r,s,t)=>r+s+(n[t]??""),""),me=(e,n)=>e.map(n).join(""),D=(e,n,r)=>h(e,n).map(r).join(""),Ae=(e,n)=>{e.innerHTML=n()},ce=["c","c","c","c","c","c","c","c","c","u","u","u","u","r"],Re=["rift","echo","omen"],ae=["🦀","🔥","🥩","🧣"],se=["🫐","🦋","🌀","❄️"],ne=["🪙","⚙️","🪞","📓"],ve=(e,n)=>{let r=ne[3];return e==="rift"&&(r=ae[3]),e==="echo"&&(r=se[3]),{name:`${String(e).charAt(0).toUpperCase()+String(e).slice(1)} Goal Card`,types:[e],zone:n+"Goal",abilityFunct:[],abilityRule:[`At the end of your turn if you have 7 or more other ${e} cards in your play area you win.`],cardArt:L(r,{size:100,cell:10})}},J={blank:{name:"Eclipse Void",types:["rift","echo","omen"],abilityFunct:[],abilityRule:[],cardArt:L("🎭",{size:100,cell:10})},cRift:{name:"Stellar Crypt",types:["rift"],abilityFunct:["floodOpponent$Time:2"],abilityRule:["Flood your opponent 2 times."],cardArt:L(ae[0],{size:100,cell:10})},uRift:{name:"Grave Haunt",types:["rift"],abilityFunct:["floodOpponent$Time:3"],abilityRule:["Flood your opponent 3 times."],cardArt:L(ae[1],{size:100,cell:10})},rRift:{name:"Chasm Infernal",types:["rift"],abilityFunct:["floodAllPlayers$Time:2"],abilityRule:["Flood all players 2 times."],cardArt:L(ae[2],{size:100,cell:10})},cEcho:{name:"Ethereal Nebula",types:["echo"],abilityFunct:["return$Time:1"],abilityRule:["Return a card 1 time."],cardArt:L(se[0],{size:100,cell:10})},uEcho:{name:"Cosmic Lunar",types:["echo"],abilityFunct:["returnAllExhaustedCards"],abilityRule:["Return all your exhuasted cards."],cardArt:L(se[1],{size:100,cell:10})},rEcho:{name:"Umbral Aster",types:["echo"],abilityFunct:["unexhaustAllYourExhaustedCards"],abilityRule:["Unexhaust all your exhuasted cards."],cardArt:L(se[2],{size:100,cell:10})},cOmen:{name:"Orbit Crypt",types:["omen"],abilityFunct:["remianingCardsInPileGoToYourPlayArea"],abilityRule:["The remaining cards in this pile go to your play area."],cardArt:L(ne[0],{size:100,cell:10})},uOmen:{name:"Nebula Specter",types:["omen"],abilityFunct:["exhaust$OfYourOpponentsUnexhaustedCardsAtRandom:2"],abilityRule:["Exhaust 2 random unexhausted cards in your opponents play area."],cardArt:L(ne[1],{size:100,cell:10})},rOmen:{name:"Shadow Singularity",types:["omen"],abilityFunct:["exhaust$OfYourOpponentsUnexhaustedCardsAtRandom:4"],abilityRule:["Exhaust 4 random unexhausted cards in your opponents play area."],cardArt:L(ne[2],{size:100,cell:10})}},X=(e,n,r)=>({id:n,zoneOrder:0,zone:"deck",isSelected:!1,isActive:!1,isExhausted:!1,rarity:r,...e}),Ie=()=>{const e=[];for(let s=0;s<5;s++){const t=J.blank;e.push(X(t,e.length+1,"U"))}const n=pe(Re);return e.push(ve(n[0],"player")),e.push(ve(n[1],"opponent")),ce.forEach(s=>{const t=J[s+"Rift"];e.push(X(t,e.length+1,s))}),ce.forEach(s=>{const t=J[s+"Echo"];e.push(X(t,e.length+1,s))}),ce.forEach(s=>{const t=J[s+"Omen"];e.push(X(t,e.length+1,s))}),pe(e).map((s,t)=>(s.zoneOrder=t,s))},$e=["deal","take","end"],W=["deck","opponentPlay","opponentGoal","pile1","pile2","pile3"],Z=["takeModal","playerPlay","active","playerGoal"],Fe=Ie(),Le=()=>new Promise(e=>{e({isIntroSkipped:!1,isUiHidden:!0,storyIndex:0,isStarted:!1,isPhaseButtonDisabled:!0,isPileToPlay:"deck",winner:void 0,activePlayer:"player",currentPhase:void 0,phases:$e,isModalOpen:!1,ui:{},cards:[...Fe],selectedPile:"pile1",pile1:[],pile2:[],pile3:[],player:{id:1,hand:[],play:[],isComputer:!1},opponent:{id:2,hand:[],play:[],isComputer:!0}})}),ye=["","Well, well, well. Look what we have here?","A small flicker of light at dusk.","Delicious. I so rarely get guests","I so rarely get any guests... guests.","It's all so terrIBLY BORING I JUST WANT...","...I'm sorry I forget myself, forgot myself.","Welcome, you who stands at the edge twilight.","Come, sit with me and play a game.","It tastes like cards, and you wager yourself.","The night is almost here... you get the first play."],ee=new Map,te=new Map;function Ge({containerSelector:e=".card-container",faceUpClass:n="face-up",faceDownClass:r="face-down"}={}){return{startFlip(s){ee.clear(),document.querySelectorAll("[data-flip]").forEach(t=>{const o=t.getAttribute("data-flip");if(!o)return;const l=t.getBoundingClientRect();ee.set(o,l)})},endFlip(s=200,t){return new Promise(o=>{const l=[];document.querySelectorAll("[data-flip]").forEach(c=>{const f=c.getAttribute("data-flip");if(!f)return;const m=ee.get(f);if(!m)return;const b=c.getBoundingClientRect(),k=m.left-b.left,T=m.top-b.top;(k||T)&&(c.style.transform=`translate(${k}px, ${T}px)`,l.push(c));const C=t.cards.find(M=>M.id===parseInt(f,10)),O=C==null?void 0:C.zone,E=te.get(f),A=c.querySelector(e);A&&(W.includes(E)&&Z.includes(O)?(A.classList.remove(r),A.classList.add(n)):Z.includes(E)&&W.includes(O)&&(A.classList.remove(n),A.classList.add(r))),te.set(f,O)}),document.querySelectorAll("[data-face]").forEach(c=>{var k;const f=c.getAttribute("data-face");if(!f)return;const m=(k=t.cards.find(T=>T.id===parseInt(f,10)))==null?void 0:k.zone,b=te.get(f);b&&(m!==b&&(W.includes(b)&&Z.includes(m)&&(c.classList.remove(r),c.classList.add(n)),Z.includes(b)&&W.includes(m)&&(c.classList.remove(n),c.classList.add(r))),te.set(f,m))}),requestAnimationFrame(()=>{l.forEach(c=>{c.style.transition=`transform ${s}ms ease`,c.style.transform=""}),setTimeout(()=>{l.forEach(c=>{c.style.transition=""}),ee.clear(),o()},s)})})}}}const je=L("🌌",{size:500,cell:15}),ge=new Map;function Y(e,n,r=!1,s){var m,b,k;let t=e.types[0];(e.zone==="playerGoal"||e.zone==="opponentGoal"||e.types.length>1)&&(t="multi");const o=ge.get(e.id),l=e.zone;let c="face-down";o&&l&&(Z.includes(o)&&Z.includes(l)?c="face-up":W.includes(o)&&W.includes(l)&&(c="face-down")),r===!0&&(c="face-up"),ge.set(e.id,l);const f=e!=null&&e.rarity?((m=e==null?void 0:e.rarity)==null?void 0:m.toUpperCase())+" - ":"";return $`
    <div class="card-wrapper ${e.zone==="active"?"active-card":""} ${e.isExhausted?"played":""}" ${n?"":"data-flip="+e.id}>
      <div class="card-container ${c}" data-face="${e.id}">
        <div class="card ${s?"pulse-border":""}">
          <div class="card-face front ${t}">
            <div class="card-inner-front">
              <div class="card-name">${e.name}</div>
              <img class="card-image" src="${e.cardArt}">
              ${e.isExhausted?"":$`<div class="card-type">${f+((b=e.types)==null?void 0:b.join(" - "))}</div>`}
              <div class="card-rules">${(k=e.abilityRule)==null?void 0:k.join(`
`)}</div>
            </div>

          </div>

          <div class="card-face back">
          <img class="back-pattern" src="${je}" />
          </div>
        </div>
      </div>
    </div>
  `}function qe(e){return $`
        <div class="dialog">
            <div class="game-rules-wrapper">
                <div class="flex-col">
                    <div>Quick Rules</div>
                        <div>
                        <div>Win: End your turn with Goal card's goal met.</div>
                        <div>Lose: End your turn with 15+ cards in your Play Area.</div>
                        <div>(Win checked before Loss)</div>
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
  `}function Ne(e){return $`
        <div class="dialog">
            <div>
                <div>Select this pile of cards by clicking the take button. Cards resolve in numerical order.</div>
                <div>Played cards go to the bottom of the deck after resolving.</div>
            </div>
            <div class="flex-column">
                <div class="flex-cards">
                ${D(e.cards,"takeModal",(n,r)=>{var s;return $`
                        <div>
                            <div class="deck-card-wrapper">${Y(n,!0,!1,!1)}</div>
                        ${((s=h(e.cards,"takeModal"))==null?void 0:s.length)>1?$`<div class="number-buttons-wrapper"><button class="jagged" onclick="methods.orderCards(${n.id}, false)">⬅</button><div class="number">${r+1}</div><button class="jagged" onclick="methods.orderCards(${n.id}, true)">⮕</button></div>`:""}
                        </div>`})}
                </div>

            </div>
            <div class="flex-row dialog-ui">
                <button class="jagged" onclick="methods.cancelTakeModal()">Close</button>
                <button class="jagged" onclick="methods.submitTakeModal()">Play & Pass</button>
            </div>
        </div>
  `}function De(e){const n=$e[e.currentPhase],s=(e.currentPhase?["play","end"]:["take","end"]).includes(n)?e.activePlayer==="player"?"opponent":"player":e.activePlayer;return $`
    <div class="${e.isStarted?"hidden":""}" id="story-wrapper">
        ${me(ye,(t,o)=>o>e.storyIndex?null:o===e.storyIndex?$`<div class="last-line">${t}</div>`:$`<div>${t}</div>`)}
    </div>
    <div class="${e.isStarted?"":"ui-wrapper"}">
        <div>
            <div class="phases-wrapper ${s!=="player"?"void-phase jagged":""}">
                ${s==="player"?"YOUR TURN: ":"VOID'S TURN: "}
                ${me(e.phases,(t,o)=>$`<div class="phase-wrapper ${e.currentPhase===o?"active":""}">${t.toUpperCase()}</div>`)}
            </div>
            <div class="game-area-wrapper">
                <div class="deck-dealt-wrapper">
                    <div class="deck-wrapper">${D(e.cards,"deck",(t,o)=>$`<div class="deck-card-wrapper" style="${"bottom:"+Math.floor(o/3)+"px;right:"+Math.floor(o/6)+"px"}">${Y(t,!1,!1,!1)}</div>`)}</div>
                    <div class="pile-wrapper pile-1-wrapper">${D(e.cards,"pile1",(t,o)=>$`<div onclick="methods.viewPile('pile1')" class="pile" style="${"bottom:"+o*2+"px;right:"+o*2+"px"}">${Y(t,!1,!1,!0)}</div>`)}</div>
                    <div class="pile-wrapper pile-2-wrapper">${D(e.cards,"pile2",(t,o)=>$`<div onclick="methods.viewPile('pile2')" class="pile" style="${"bottom:"+o*2+"px;right:"+o*2+"px"}">${Y(t,!1,!1,!0)}</div>`)}</div>
                    <div class="pile-wrapper pile-3-wrapper">${D(e.cards,"pile3",(t,o)=>$`<div onclick="methods.viewPile('pile3')" class="pile" style="${"bottom:"+o*2+"px;right:"+o*2+"px"}">${Y(t,!1,!1,!0)}</div>`)}</div>
                </div>
                
            </div>

        </div>
        <div class="flex-row-top">
            <div class="play-area-wrapper area-wrappers play-area-min-height">
                <div class="play-area-header">⚪ YOUR PLAY AREA (${h(e.cards,"playerPlay").length})</div>
                <div class="flex-cards">
                ${D(e.cards,"playerGoal",(t,o)=>$`<div>${Y(t,!0,!0)}</div>`)}
                ${D(e.cards,"playerPlay",(t,o)=>$`<div>${Y(t,!1,!1,!1)}</div>`)}
                </div>
            </div>

            <div class="play-area-wrapper area-wrappers play-area-min-height">
                <div class="play-area-header">⚫ THE VOIDS'S PLAY AREA (${h(e.cards,"opponentPlay").length})</div>
                <div class="flex-cards">
                    ${D(e.cards,"opponentGoal",(t,o)=>$`<div>${Y(t,!0,!!e.winner)}</div>`)}
                    ${D(e.cards,"opponentPlay",(t,o)=>$`<div class="pile">${Y(t,!1,!!e.winner,!1)}</div>`)}
                </div>
            </div>    
        
        </div>
        </div>  
        <div class="dialog-wrapper ${e.isModalOpen||e.storyIndex===0?"":"hidden"}">
            ${e.storyIndex===0?qe():null}
            ${e.currentPhase===1&&e.isStarted===!0?Ne(e):null}
        </div>
        <div class="active-card-wrapper flex-row">
            ${D(e.cards,"active",(t,o)=>$`<div class="pile">${Y(t,!1,!1,!1)}</div>`)}
        </div>
 
  `}const Ye=L("😶",{size:500,cell:20}),we=e=>$`
        <div class="eye-wrapper" ${e?"style='transform: scaleX(-1)'":""}>
            <img class="eye-background" src="${Ye}">
            <svg class="eye-layer" viewBox="0 0 622 500" preserveAspectRatio="xMaxYMin">
                <g class="layer">
                <path class="upper-brow" d="m-6,0l649,0l0,890c-119.17,-95.85 -41.92,-306.25 -163.12,-392.89c-104.61,-77.09 -381.27,-13.02 -485.88,-90.11z" fill="#000000" id="svg_16" stroke="#000000" stroke-width="0"/>
                <path d="m-3,-1c0.68,161 1.35,322 2.03,483l642.97,0c-94.8,-70.22 -336.89,9.59 -431.69,-60.63c-120.2,-90.78 -93.11,-331.59 -213.31,-422.37z" fill="#000000" id="svg_17" stroke="#000000" stroke-width="0"/>
                <path class="iris" d="m330.55,45c-23.96,49.98 -25.34,117.3 -27.43,197.88c0.34,140.76 19.85,202.98 27.97,210.12c0.27,0 25.44,-22.44 24.94,-210.12c-0.65,-149.94 -25.48,-197.88 -25.48,-197.88z" fill="#000000" stroke="#000000" stroke-width="0"/>
                </g>
            </svg>
        </div>
    `,Be=()=>$`
        <div class="eyes-wrapper">
            ${we(!1)}
            ${we(!0)}
        </div>
    `,Ce=(e,n)=>{if(typeof n!="number"||n<=0){const r=e.get(),s=r.activePlayer==="player"?"player":"opponent";let t=0;for(let o=0;o<r[s].play.length;o++)r[s].play[o].types.includes(n)&&r[s].play[o].isExhausted===!1&&t++;return t}return n},Ee=async(e,n)=>{for(let r=0;r<e&&await n(r)!==!1;r++);};async function de(e,n,r){const s=Ce(e,r);await Ee(s,async()=>{const t=e.get(),o=h(t.cards,"deck"),l=o[o.length-1];if(!l)return!1;l.zone=`${n}Play`,e.set(t),await R(1e3)})}async function Ue(e,n,r){const s=Ce(e,r);await Ee(s,async()=>{const t=e.get(),o=`${n}Play`,l=h(t.cards,o);if(!l.length)return!1;const f=l.find(b=>b.isExhausted)??l[l.length-1];if(!f||f.zone==="playerGoal"||f.zone==="opponentGoal")return!1;const m=h(t.cards,"deck");f.zone="deck",f.zoneOrder=m[m.length-1].zoneOrder+1,f.isExhausted=!1,e.set(t),await R(1e3)})}const be={floodOpponent$Time:async(e,n,r)=>{await de(e,n==="player"?"opponent":"player",r)},floodAllPlayers$Time:async(e,n,r)=>{await de(e,"player",r),await de(e,"opponent",r)},return$Time:async(e,n,r)=>{await Ue(e,n,r)},returnAllExhaustedCards:async(e,n,r)=>{await R(1e3);const s=e.get();let t=s.activePlayer==="player"?h(s.cards,"playerPlay"):h(s.cards,"opponentPlay");const o=h(s.cards,"deck");for(let l=0;l<t.length;l++){const c=t[l];c.isExhausted&&(c.zone=o,c.zoneOrder=o[o.length-1].zoneOrder+1)}e.set(s)},unexhaustAllYourExhaustedCards:async(e,n,r)=>{await R(1e3);const s=e.get();let t=s.activePlayer==="player"?h(s.cards,"playerPlay"):h(s.cards,"opponentPlay");for(let o=0;o<t.length;o++){const l=t[o];l.isExhausted&&(l.isExhausted=!1)}e.set(s)},remianingCardsInPileGoToYourPlayArea:async(e,n,r)=>{await R(1e3);const s=e.get();s.isPileToPlay="next",e.set(s)},exhaust$OfYourOpponentsUnexhaustedCardsAtRandom:async(e,n,r)=>{await R(1e3);const s=e.get();let o=s.activePlayer==="opponent"?h(s.cards,"playerPlay"):h(s.cards,"opponentPlay");const l=o.map(m=>m.id),c=pe(l);let f=0;for(let m=0;m<c.length;m++){const b=o.find(k=>k.id===c[m]);if(!b.isExhausted&&(b.zone!=="playerGoal"||b.zone!=="opponentGoal")&&(b.isExhausted=!0,f++),f>=r)break}e.set(s)}},Ve=(e,n,r)=>{const s=typeof n=="object"&&n?n:{wave:typeof n=="string"?n:"sine",musicLength:void 0},t=s.wave||"sine",o=s.musicLength??.1,l=s.transposeOctaves??-2,c=s.transposeSemitones??0,f=s.baseHz??440,m=s.baseCharCode??105,b=s.filterCutoff??450,k=s.filterQ??10,T=s.subLevel??.35,C=s.subOctaves??1,O=s.gain??.45,E=s.attack??.01,A=s.decay??.12,M=s.sustain??.2,d=s.release??.3,v=s.vibratoRate??5,x=s.vibratoDepth??12,I=s.delayTime??.23,G=s.delayFeedback??.33,F=s.delayWet??.25,_={5:.4,4:.3,3:.2,2:.1,1:.05},oe=[...Object.keys(_),"-"];window.AudioContext=window.AudioContext||window.webkitAudioContext;const a=new AudioContext,i=a.createGain();i.gain.value=.9,i.connect(a.destination);const u=a.createDelay(1.5);u.delayTime.value=I;const p=a.createGain();p.gain.value=G;const g=a.createGain();g.gain.value=F,u.connect(p),p.connect(u),u.connect(g),g.connect(i);for(let y=0;y<e.length;y++){const z=e[y],j=e[y+1],S=isNaN(j)?o:_[j];if(!z||oe.includes(z))continue;const w=a.currentTime+y*S+.3,P=w+S,q=e.charCodeAt(y)-m+l*12+c,N=f*Math.pow(2,q/12),U=a.createOscillator();U.type=t,U.frequency.setValueAtTime(N,w);const H=a.createOscillator();H.type=t==="square"?"sine":t;const Te=N/Math.pow(2,C);H.frequency.setValueAtTime(Te,w);const re=a.createGain();re.gain.value=T;const V=a.createBiquadFilter();V.type="lowpass",V.frequency.setValueAtTime(b,w),V.Q.setValueAtTime(k,w);const B=a.createGain();if(B.gain.setValueAtTime(1e-4,w),B.gain.linearRampToValueAtTime(O,w+E),B.gain.linearRampToValueAtTime(O*M,w+E+A),B.gain.setTargetAtTime(1e-4,Math.max(w,P-d),.15),x>0){const K=a.createOscillator(),ie=a.createGain();K.frequency.setValueAtTime(v,w);const ze=Oe=>Oe*(Math.pow(2,x/1200)-1);ie.gain.value=ze(N),K.connect(ie),ie.connect(U.frequency),K.start(w),K.stop(P+.1)}U.connect(V),H.connect(re),re.connect(V),V.connect(B),B.connect(i),B.connect(u),U.start(w),H.start(w),U.stop(P+.05),H.stop(P+.05)}},We=()=>{const e=["m5","k5","h5","o5","g5","k3","h3","m3","k2","h2","m4"],n=["-m5-k5-h5-m5-","-m5-k5-h5-k5-","-o5-m5-k5-h5-","-h5-g5-k5-h5--","-k3-h3-m5--k3-h3-m5--","-m5-m5-k5-h5-m5--","-a5-h5-g5-d5-c5-a5-a5-","-a5-h5-g5-d5-c5-k25-k25-","-o5-j5-k5-g5-h5-h5-c5-","-m5-g5-j5-c5-h3"];let r="";for(let s=0;s<200;s++){const t=Math.random()>.7?"---":"--",o=Math.random()>.9?fe(e):fe(n);r+=o+t}Ve(r,{wave:"sawtooth",musicLength:.4,transposeOctaves:-3,filterCutoff:320,filterQ:14,subLevel:.45,subOctaves:2,attack:.03,decay:.2,sustain:.35,release:.6,vibratoRate:4,vibratoDepth:14,delayTime:.38,delayFeedback:.38,delayWet:.22,gain:.2})},Pe=Ge();let ke=!1,Q=0,ue=!1;const Ze=(e,n)=>n.length>1?e[n[0]][n[1]]:e[n[0]],He=document.querySelector("#app"),Qe=document.querySelector("#eyes"),_e=async e=>{Pe.startFlip(e),Ae(He,()=>De(e)),Pe.endFlip(500,e)};setTimeout(()=>{Ke()},200);async function Ke(){const e=()=>{Q++},n=()=>{Q=Math.max(0,Q-1),Q===0&&ue&&(ue=!1,k())},r=async()=>{if(Q>0){ue=!0;return}await k()};if(ke)return;ke=!0;const s=await Le(),t=Me(s,_e);Je(),Ae(Qe,()=>Be());const o=()=>{const a=t.get();return a.phases[a.currentPhase??0]},l=a=>o()===a,c=a=>{const i=t.get(),p=h(i.cards,"deck")[0].zoneOrder,g=i.cards.find(y=>y.id===a);if(i.isPileToPlay==="play"){const y=i.activePlayer==="player"?"playerPlay":"opponentPlay";g.zone=y}else g.zone="deck",g.zoneOrder=p+1;i.isPileToPlay==="next"&&(i.isPileToPlay="play"),t.set(i)},f=async()=>{for(let a=1;a<=3;a++){const i=t.get(),u=h(i.cards,"deck"),p=u[u.length-1];if(!p)break;p.zone=`pile${a}`,t.set(i)}},m=async(a,i,u)=>{if(!a||!Array.isArray(a.abilityFunct))return;e();for(let z=0;z<a.abilityFunct.length;z++){const j=a.abilityFunct[z],[S,w]=String(j).split(":");let P=w?parseInt(w,10):0;Number.isNaN(P)&&(P=w),be[S]&&await be[S](t,i,P)}const p=t.get();let g;u.length>1?g=p[u[0]][u[1]]:g=p[u[0]];const y=g.find(z=>z.id===a.id);if(y){const z=h(p.cards,"deck");y.zone="deck",y.zoneOrder=z[z.length-1].zoneOrder+1,t.set(p)}n()},b=()=>{const a=t.get(),i=a.currentPhase===void 0||a.currentPhase+1>=a.phases.length?0:a.currentPhase+1;return a.currentPhase=i,t.set(a),a.phases[i]};async function k(){const a=t.get();if(a.winner){alert(a.winner);return}const i=b();a.activePlayer==="player"?await C(i):await O(i)}const T=a=>{const i=t.get();i.isPhaseButtonDisabled=a,t.set(i)};async function C(a){T(!0),a==="deal"&&(le(!0),await await f(),await R(500),await r()),a!=="take"&&a==="end"&&(G(),await r())}async function O(a){T(!0),a==="deal"&&(he(!0),await f(),await R(500),await r()),a==="take"&&(await E(),await R(3e3),T(!1)),a==="end"&&(he(!1),G(),await r())}async function E(){e(),le();const a=t.get(),i=h(a.cards,"opponentPlay"),u=h(a.cards,"pile1"),p=w(u),g=h(a.cards,"pile2"),y=w(g),z=h(a.cards,"pile3"),j=w(z);if(a.selectedPile=fe(["pile1","pile2","pile3"]),i.length>=13)S("echo")&&(a.selectedPile=S("echo"));else if(i.length<=7)S("rift")&&(a.selectedPile=S("rift"));else if(S("omen")){const P=S("omen");a.selectedPile=P,h(a.cards,P).forEach(N=>{N.abilityFunct[0]==="remianingCardsInPileGoToYourPlayArea"&&(N.zoneOrder=100)})}t.set(a),await R(200),await A(),n(),await r();function S(P){if(p[P]>y[P]&&p[P]>j[P])return"pile1";if(y[P]>p[P]&&y[P]>j[P])return"pile2";if(j[P]>p[P]&&j[P]>y[P])return"pile3"}function w(P){const q={rift:0,echo:0,omen:0};return P.forEach(N=>{N.types.includes("rift")&&(q.rift=q.rift+1),N.types.includes("echo")&&(q.echo=q.echo+1),N.types.includes("omen")&&(q.omen=q.omen+1)}),q}}async function A(){for(;;){const i=t.get(),u=h(i.cards,i.selectedPile).reverse();if(!Array.isArray(u)||u.length===0)break;const p=u[u.length-1];if(!p)break;p.isFaceUp=!0,p.zone="active",t.set(i),await R(2e3),await m({...p},i.activePlayer,[i.selectedPile]),c(p.id),await R(1e3)}const a=t.get();a.isPileToPlay="deck",a.player.play=a.player.play.sort(i=>i.isExhausted),a.opponent.play=a.opponent.play.sort(i=>i.isExhausted),t.set(a)}const M=()=>{le(!1,750);const a=t.get();a.isModalOpen=!1,t.set(a),v()},d=()=>{const a=t.get();a.isModalOpen=!1,a.isStarted=!0,a.storyIndex=ye.length,t.set(a),window.methods.advancePhase()};function v(){var i;const a=t.get();a.storyIndex>=ye.length-1?(a.isModalOpen=!1,a.isStarted=!0,t.set(a),window.methods.advancePhase()):(a.storyIndex=a.storyIndex+1,t.set(a),setTimeout(v,3e3),(i=document.querySelector(".last-line"))==null||i.classList.add("visible"))}const x=async()=>{const a=t.get();a.isModalOpen=!1,h(a.cards,"takeModal").forEach(u=>u.zone=a.selectedPile),t.set(a),e(),await R(500),await A(),await R(500),n(),await r()},I=()=>{if(!l("take"))return;const a=t.get();if(a.activePlayer==="opponent")return;const i=h(a.cards,"takeModal");a.isModalOpen=!1,i.forEach(u=>{u.zone=a.selectedPile}),t.set(a)};function G(){const a=t.get(),i=h(a.cards,"playerPlay"),u=h(a.cards,"opponentPlay"),p=h(a.cards,"playerGoal"),g=h(a.cards,"opponentGoal"),y=p[0].types[0],z=g[0].types[0],j=i.filter(w=>w.isExhausted===!1&&w.types.includes(y)),S=u.filter(w=>w.isExhausted===!1&&w.types.includes(z));a.activePlayer==="opponent"&&S.length>7?a.winner="You lost because your opponent completed their goal card!":a.activePlayer==="player"&&j.length>7?a.winner="You won for completeing your goal card!":a.activePlayer==="player"&&i.length>=15?a.winner="You lost because you had 15 or more cards in your play area!":a.activePlayer==="opponent"&&u.length>=15&&(a.winner="You won because your opponent had 15 or more cards in their play area!"),a.activePlayer=a.activePlayer==="player"?"opponent":"player",t.set(a)}const F=a=>{if(!l("take"))return;const i=t.get();if(i.activePlayer==="opponent")return;const u=h(i.cards,a);i.selectedPile=a,i.isModalOpen=!0,u.forEach(p=>{p.zone="takeModal"}),t.set(i)},_=(a,i)=>{const u=t.get(),p=Ze(u,a),g=p==null?void 0:p.find(y=>y.id===i);g&&(g.isSelected=!g.isSelected,t.set(u))},oe=(a,i)=>{const u=t.get(),p=h(u.cards,"takeModal");p.forEach((g,y)=>{g.id===a?g.zoneOrder=i?y+1.5:y-1.5:g.zoneOrder=y}),p.sort((g,y)=>g.zoneOrder-y.zoneOrder).reverse().forEach((g,y)=>{g.zoneOrder=y+1}),t.set(u)};window.methods={advancePhase:k,submitTakeModal:x,cancelTakeModal:I,cancelPlayModal:M,setSelected:_,viewPile:F,orderCards:oe,skipIntro:d}}function Je(){document.addEventListener("keydown",e=>{e.key.toLowerCase()==="m"&&We()})}
