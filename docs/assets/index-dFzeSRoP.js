(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const be=(e,t)=>{let a=structuredClone(e),n=!1;const s=()=>structuredClone(a),i=l=>{t(l),a=l};return n===!1&&(t(e),n=!0),{get:s,set:i}},f=(e,...t)=>e.reduce((a,n,s)=>a+n+(t[s]??""),""),k=(e,t)=>e.map(t).join(""),te=(e,t)=>{e.innerHTML=t()};function xe(){const e=new Map;return{startFlip(){e.clear(),document.querySelectorAll("[data-flip]").forEach(t=>{const a=t.getAttribute("data-flip");e.set(a,t.getBoundingClientRect())})},endFlip(t=200){return new Promise(a=>{const n=[];document.querySelectorAll("[data-flip]").forEach(s=>{const i=s.getAttribute("data-flip"),l=e.get(i);if(!l)return;const r=s.getBoundingClientRect(),c=l.left-r.left,y=l.top-r.top;(c!==0||y!==0)&&(s.style.transform=`translate(${c}px, ${y}px)`,n.push(s))}),requestAnimationFrame(()=>{n.forEach(s=>{s.style.transition=`transform ${t}ms ease`,s.style.transform=""}),setTimeout(()=>{n.forEach(s=>{s.style.transition=""}),e.clear(),a()},t)})})}}}const ke=e=>{for(let t=e.length-1;t>0;t--){const a=Math.floor(Math.random()*(t+1));[e[t],e[a]]=[e[a],e[t]]}return e},R=e=>{if(!e)return"";let t=e.replace(/([a-z])([A-Z0-9])/g,"$1 $2");return t=t.toLowerCase(),t=t.charAt(0).toUpperCase()+t.slice(1),/[.!?]$/.test(t)||(t+="."),t},E=e=>e[Math.floor(Math.random()*e.length)],K=()=>Math.random(),ae=e=>Math.floor(Math.random()*e)+1,se=(e,t,a={})=>{var y,$;const n=e.getAttribute("d");if(!n)throw new Error(`Element "${id}" has no 'd' attribute`);const s=/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,i=(y=n.match(s))==null?void 0:y.map(Number),l=($=t.match(s))==null?void 0:$.map(Number);if(!i||!l||i.length!==l.length)throw new Error("Start and target paths must have identical command structure and number count.");const r=a.easing||(b=>.5-.5*Math.cos(Math.PI*b)),c=Math.max(1,a.duration||800);return new Promise(b=>{const C=(v,m,x)=>v+(m-v)*x;let g;function I(v){g??(g=v);const m=Math.min(1,(v-g)/c),x=r(m),d=i.map((u,w)=>C(u,l[w],x)),p=n.replace(s,()=>{const u=d.shift();return Math.abs(u)<1e-6?"0":u.toFixed(3).replace(/\.?0+$/,"")});e.setAttribute("d",p),m<1?requestAnimationFrame(I):b()}requestAnimationFrame(I)})},ne=e=>{const t=document.querySelectorAll(".upper-brow"),a=e?600:600+ae(200),n=`m-6,0l649,0l0,${a}c-119.17,-95.85 -41.92,-306.25 -163.12,-392.89c-104.61,-77.09 -381.27,-13.02 -485.88,-90.11z`;for(let s=0;s<t.length;s++)se(t[s],n,{duration:200+a*3})},Q=e=>{const t=document.querySelectorAll(".iris"),a=e?"m345.22,45c-188.76,49.98 -199.63,117.3 -216.1,197.88c2.69,140.76 156.4,202.98 220.35,210.12c2.13,0 200.44,-22.44 196.5,-210.12c-5.14,-149.94 -200.76,-197.88 -200.76,-197.88z":"m330.55,45c-23.96,49.98 -25.34,117.3 -27.43,197.88c0.34,140.76 19.85,202.98 27.97,210.12c0.27,0 25.44,-22.44 24.94,-210.12c-0.65,-149.94 -25.48,-197.88 -25.48,-197.88z";for(let n=0;n<t.length;n++)setTimeout(()=>{se(t[n],a,{duration:500})},2200)},M=(e,{size:t=256,cell:a=14,jitter:n=.85}={})=>{const s=t,i=d=>Math.max(0,Math.min(s-1,d)),l=document.createElement("canvas");l.width=l.height=s;const r=l.getContext("2d",{willReadFrequently:!0});function c(d,p){r.clearRect(0,0,s,s),r.textAlign="center",r.textBaseline="middle",r.font=`${s*.78}px ${p}`,r.fillStyle="#000",r.fillText(d,s/2,s/2)}function y(){const d=r.getImageData(0,0,s,s).data;for(let p=3;p<d.length;p+=4)if(d[p]!==0)return!0;return!1}const $=['"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif','"Segoe UI Emoji","Noto Color Emoji","Apple Color Emoji",sans-serif',"sans-serif"];let b=!1,C=e;for(let d=0;d<3&&!b;d++)c(C,$[d]),b=y(),!b&&d===0&&!/\uFE0F/.test(C)&&(C=e+"️",d--);b||(r.clearRect(0,0,s,s),r.fillStyle="#000",r.fillRect(s*.25,s*.25,s*.5,s*.5));const g=[],I=a*n*.5;for(let d=0;d<=s;d+=a){const p=[];for(let u=0;u<=s;u+=a){const w=u>0&&u<s?(Math.random()*2-1)*I:0,T=d>0&&d<s?(Math.random()*2-1)*I:0;p.push([i(u+w),i(d+T)])}g.push(p)}const v=document.createElement("canvas");v.width=v.height=s;const m=v.getContext("2d");function x(d,p,u){const w=i((d[0]+p[0]+u[0])/3|0),T=i((d[1]+p[1]+u[1])/3|0),P=r.getImageData(w,T,1,1).data;P[3]<1||(m.beginPath(),m.moveTo(d[0],d[1]),m.lineTo(p[0],p[1]),m.lineTo(u[0],u[1]),m.closePath(),m.fillStyle=`rgba(${P[0]},${P[1]},${P[2]},${(P[3]/255).toFixed(3)})`,m.fill())}for(let d=0;d<g.length-1;d++)for(let p=0;p<g[d].length-1;p++){const u=g[d][p],w=g[d][p+1],T=g[d+1][p],P=g[d+1][p+1];Math.random()<.5?(x(u,w,P),x(u,P,T)):(x(u,w,T),x(w,P,T))}return v.toDataURL("image/png")},ie=(e,t)=>{if(console.log(t),typeof t!="number"||t<=0){const a=e.get(),n=a.activePlayer==="player"?"player":"opponent";let s=0;for(let i=0;i<a[n].play.length;i++)a[n].play[i].types.includes(t)&&a[n].play[i].isExhausted===!1&&s++;return s}return t},Ae=e=>e.deck[e.deck.length-1],le=(e,t,a,{toStart:n=!1}={})=>{const s=e.findIndex(l=>l.id===a);if(s===-1)return null;const[i]=e.splice(s,1);return n?t.unshift(i):t.push(i),i},re=async(e,t)=>{for(let a=0;a<e&&await t(a)!==!1;a++);};async function N(e,t,a){const n=ie(e,a);await re(n,async()=>{const s=e.get(),i=Ae(s);if(!i)return!1;i.isFaceUp=!0,le(s.deck,s[t].play,i.id),e.set(s),await h(1e3)})}async function X(e,t,a){const n=ie(e,a);await re(n,async()=>{const s=e.get(),i=s[t].play;if(!i.length)return!1;const l=i[i.length-1];if(!l)return!1;l.isFaceUp=!1,le(i,s.deck,l.id,{toStart:!0}),e.set(s),await h(1e3)})}const V={floodOpponent$Time:async(e,t,a)=>{await N(e,t==="player"?"opponent":"player",a)},floodAllPlayers$Time:async(e,t,a)=>{await N(e,"player",a),await N(e,"opponent",a)},return$Time:async(e,t,a)=>{await X(e,t,a)},forEach$InYourPlayAreaFloodYourOpponent:async(e,t,a)=>{await N(e,t==="player"?"opponent":"player",a)},forEach$InYourPlayAreaReturnACard:async(e,t,a)=>{await X(e,t,a)},remianingCardsInPileGoToYourPlayArea:async(e,t,a)=>{await h(1e3);const n=e.get();n.isPileToPlay=!0,e.set(n)},turn2$OfYourOpponentsCardsFaceDown:async(e,t,a)=>{await h(1e3);const n=e.get(),s=n.activePlayer;let i=s==="player"?n.opponent.play:n.player.play,l=0;for(let r=0;r<i.length;r++){const c=i[r];if(console.log(c.types,a),!c.isExhausted&&c.types.includes(a)&&(c.isExhausted=!0,l++),l>=2)break}l>=15&&(n.winner=s==="player"?"You":"The Void"),e.set(n)},ifYouHave10OrMore$CardsYouWinTheGame:async(e,t,a)=>{await h(1e3);const n=e.get(),s=n.activePlayer;let i=s==="player"?n.player.play:n.opponent.play,l=0;i.forEach(r=>{!r.isExhausted&&r.types.includes(a)&&l++}),l>=10&&(n.winner=s==="player"?"You":"The Void"),e.set(n)}},oe=["💖","💘","💝","🔥","💃","💄","🌋","🌶️","🍅","🥩","🧨","🎈","🎉","📕","☎️","🚗","🚒","🛑","🦑","🧯","🦀","🦞","🦐","🧣","🦊","🦁","🪔","🛢️","🧱"],ce=["🧊","🌊","🌀","❄️","☃️","🌌","🪐","⭐","🌠","🧞","🦋","🐬","🐟","🐳","🐢","🐍","🐸","🦖","🌴","🌳","🍀","🌿","🍏","🥝","🥒","🥦","🫐","🧵","👖","📘","💎","🔵","🔷","🟩","🟦","🕺"],de=["🤍","🖤","🤎","🪨","🏺","🪵","🪑","⚱️","⚙️","📦","📜","📄","📓","📰","💼","🥋","🥔","🍞","🥖","🪙","💰","🛋️","🪞","🧳","🏚️","⚫","⚪","📎","🧂","🗿","🛡️"],U=["Umbral","Void","Eclipse","Oblivion","Specter","Nebula","Wraith","Abyss","Crypt","Ethereal","Stellar","Hollow","Phantom","Cosmic","Chasm","Lunar","Grave","Singularity","Haunt","Infernal","Asteroid","Orbit","Shadow"],F=["rift","echo","omen"],J={rift:Me,echo:Te,omen:Se},A=Object.keys(V),D={};let pe=3,ue=3,fe=3;const q=["c","c","c","c","c","c","c","c","c","u","u","u","u","r","r"],Ee=e=>{const t=[];for(let a=0;a<5;a++){const n=F[a]?F[a]:F[a-2];t.push(Y([n],t.length+1,void 0,a))}return q.forEach(a=>{const n=L(["rift"],a);pe++,t.push(Y(["rift"],t.length+1,n,3))}),q.forEach(a=>{const n=L(["echo"],a);ue++,t.push(Y(["echo"],t.length+1,n,3))}),q.forEach(a=>{const n=L(["omen"],a);fe++,t.push(Y(["omen"],t.length+1,n,3))}),ke(t)};function Y(e,t,a,n){return{id:t,name:a!=null&&a.name?a.name:he(),types:e,isFaceUp:!1,isSelected:!1,isActive:!1,abilityFunct:a?a.abilityFunct:[],abilityRule:a?a.abilityRule:[],isExhausted:!1,cardArt:a!=null&&a.art?a.art:s()};function s(){let i;return e.length>1||(e[0]==="rift"?i=M(oe[n],{size:100,cell:12}):e[0]==="echo"?i=M(ce[n],{size:100,cell:12}):i=M(de[n],{size:100,cell:12})),i}}function Me(e,t,a){let n=a||1,s=e==="c"?0:1;e==="r"&&(n=E(F),s=3);const i=A[s];return{funct:i+":"+n,rule:R(i.replace("$"," "+n+" "))}}function Te(e){let t=1,a=2;e==="r"&&(t=E(F),a=4);const n=A[a];return{funct:n+":"+t,rule:R(n.replace("$"," "+t+" "))}}function Se(e,t){if(e==="c")return{funct:A[5],rule:R(A[5])};if(e==="u"){const a=E(F);return{funct:A[6]+":"+t,rule:R(A[6].replace("$"," "+a+" "))}}else{const a=E(F);return{funct:A[7]+":"+t,rule:R(A[7].replace("$"," "+a+" "))}}}function L(e,t){let a=[],n=[];for(let l=0;l<e.length;l++){const r=e[l],c=J[r](t,e[l]);if(a.push(c.funct),n.push(c.rule),r==="omen"&&t==="r"){const y=J.rift("c","omen",2);a.push(y.funct),n.push(y.rule)}}const s=a.join("")+e.join("");let i={};if(D[s])i.name=D[s].name,i.art=D[s].art;else{let l;e.length>1||(e[0]==="rift"?l=M(oe[pe],{size:100,cell:12}):e[0]==="echo"?l=M(ce[ue],{size:100,cell:12}):l=M(de[fe],{size:100,cell:12})),i.name=he().slice(0,21),i.art=l,D[s]=i}return{name:i.name,art:i.art,abilityFunct:a,abilityRule:n}}function he(){const e=K(),t=K(),a=E(U),n=E(U),s=e>.5?a:`${a.slice(0,a.length-3)}'${E(U)}`,i=t>.5?n:`${E(U)}-${n}`;return`${s} ${i}`}const ye=Ee();console.log(ye);const me=["deal","take","end"],Fe={isStarted:!1,isPhaseButtonDisabled:!0,isPileToPlay:!1,winner:void 0,activePlayer:"player",currentPhase:void 0,phases:me,isModalOpen:!1,ui:{},deck:ye,selectedPile:"pile1",pile1:[],pile2:[],pile3:[],player:{id:1,hand:[],play:[],isComputer:!1},opponent:{id:2,hand:[],play:[],isComputer:!0}},Oe=M("🌌",{size:500,cell:15});function S(e,t,a,n,s){var l,r;let i=e.types[0];return e.types.length>1&&(i="multi"),f`
    <div class="card-wrapper ${e.isActive?"active-card":""} ${e.isExhausted?"played":""}" ${t?"":"data-flip="+e.id}>
      <div class="card-container ${e.isFaceUp||a?"face-up":"face-down"}">
        <div class="card ${n?"pulse-border":""}">
          <div class="card-face front ${i}">
            <div class="card-name">${e.name}</div>
            <img class="card-image" src="${e.cardArt}">
            ${e.isExhausted?"":f`<div class="card-type">${(l=e.types)==null?void 0:l.join(" - ")}</div>`}
            <div class="card-rules">${(r=e.abilityRule)==null?void 0:r.join(`.
`)}</div>
          </div>

          <div class="back">
          <img class="back-pattern" src="${Oe}">
          </div>
        </div>
      </div>
    </div>
  `}const Ce=M("😶",{size:500,cell:20}),Z=e=>f`
        <div class="eye-wrapper" ${e?"style='transform: scaleX(-1)'":""}>
            <img class="eye-background" src="${Ce}">
            <svg class="eye-layer" viewBox="0 0 622 500" preserveAspectRatio="xMaxYMin">
                <g class="layer">
                <path class="upper-brow" d="m-6,0l649,0l0,550c-119.17,-95.85 -41.92,-306.25 -163.12,-392.89c-104.61,-77.09 -381.27,-13.02 -485.88,-90.11z" fill="#000000" id="svg_16" stroke="#000000" stroke-width="0"/>
                <path d="m-3,-1c0.68,161 1.35,322 2.03,483l642.97,0c-94.8,-70.22 -336.89,9.59 -431.69,-60.63c-120.2,-90.78 -93.11,-331.59 -213.31,-422.37z" fill="#000000" id="svg_17" stroke="#000000" stroke-width="0"/>
                <path class="iris" d="m330.55,45c-23.96,49.98 -25.34,117.3 -27.43,197.88c0.34,140.76 19.85,202.98 27.97,210.12c0.27,0 25.44,-22.44 24.94,-210.12c-0.65,-149.94 -25.48,-197.88 -25.48,-197.88z" fill="#000000" stroke="#000000" stroke-width="0"/>
                </g>
            </svg>
        </div>
    `,Ie=()=>f`
        <div class="eyes-wrapper">
            ${Z(!1)}
            ${Z(!0)}
        </div>
    `;function Re(e){return f`
        <div class="dialog">
            <div class="game-rules-wrapper">
                <div class="flex-col">
                    <h2>Void Dance</h2>
                    <div>You must play a card game against The Void.</div>
                    <h3>Rules</h3>
                    <div>Goal: If a player ends their turn with 15 cards in their play area they lose the game.</div>
                    <div>
                    <ol>
                        <li>Each turn a card is dealt to each of 3 piles.</li>
                        <li>Then the active player then chooses a pile.</li>
                        <li>All cards from the chosen pile are played in the chosen order.</li>
                        <li>Played cards go to the bottom of the deck.</li>
                    </ol>
                    </div>
                    <div>
                    <h3>Terms</h3>
                    <ul>
                        <li>Flood: Force your opponent to draw a card and put it in their play area.</li>
                        <li>Return: Return a card from you play area to the bottom of teh deck. Face down cards are returned first followed by the last card you played.</li>
                    </ul>
                    </div>
                    <div><button class="jagged" onclick="methods.cancelPlayModal()">Start the Game</button></div>
                </div>
            </div>
        </div>
  `}function je(e){return f`
        <div class="dialog">
            <div>Select this pile of cards by clicking the take button. Cards resolve in numerical order.</div>
            <div class="flex-column">
                <div class="flex-cards">
                ${k(e[e.selectedPile],(t,a)=>{var n;return f`
                        <div>
                            <div class="deck-card-wrapper">${S(t,!0,!0)}</div>
                        ${((n=e[e.selectedPile])==null?void 0:n.length)>1?f`<div class="number-buttons-wrapper"><button class="jagged" onclick="methods.orderCards(['${e.selectedPile}'], ${t.id}, false)">⬅</button><div class="number">${a+1}</div><button class="jagged" onclick="methods.orderCards(['${e.selectedPile}'], ${t.id}, true)">⮕</button></div>`:""}
                        </div>`})}
                </div>

            </div>
            <div class="flex-row dialog-ui">
                <button class="jagged" onclick="methods.cancelTakeModal()">Close</button>
                <button class="jagged" onclick="methods.submitTakeModal()">Take & Pass</button>
            </div>
        </div>
  `}function Ne(e){var s,i,l;const t=me[e.currentPhase],n=(e.currentPhase?["play","end"]:["take","end"]).includes(t)?e.activePlayer==="player"?"opponent":"player":e.activePlayer;return f`
    <div>
        <div class="phases-wrapper ${n!=="player"?"void-phase jagged":""}">
            ${n==="player"?"YOUR TURN: ":"VOID'S TURN: "}
            ${k(e.phases,(r,c)=>f`<div class="phase-wrapper ${e.currentPhase===c?"active":""}">${r.toUpperCase()}</div>`)}
        </div>
        <div class="game-area-wrapper">
            <div class="deck-dealt-wrapper">
                <div class="deck-wrapper">${k(e.deck,(r,c)=>f`<div class="deck-card-wrapper" style="${"bottom:"+Math.floor(c/3)+"px;right:"+Math.floor(c/6)+"px"}">${S(r)}</div>`)}</div>
                <div class="pile-wrapper pile-1-wrapper">${((s=e.pile1)==null?void 0:s.length)>0?k(e.pile1,(r,c)=>f`<div onclick="methods.viewPile('pile1')" class="pile" style="${"bottom:"+c*2+"px;right:"+c*2+"px"}">${S(r,!1,!1,e.currentPhase===1&&e.activePlayer==="player")}</div>`):""}</div>
                <div class="pile-wrapper pile-2-wrapper">${((i=e.pile2)==null?void 0:i.length)>0?k(e.pile2,(r,c)=>f`<div onclick="methods.viewPile('pile2')" class="pile" style="${"bottom:"+c*2+"px;right:"+c*2+"px"}">${S(r,!1,!1,e.currentPhase===1&&e.activePlayer==="player")}</div>`):""}</div>
                <div class="pile-wrapper pile-3-wrapper">${((l=e.pile3)==null?void 0:l.length)>0?k(e.pile3,(r,c)=>f`<div onclick="methods.viewPile('pile3')" class="pile" style="${"bottom:"+c*2+"px;right:"+c*2+"px"}">${S(r,!1,!1,e.currentPhase===1&&e.activePlayer==="player")}</div>`):""}</div>
            </div>
            
        </div>

    </div>
    <div class="flex-row-top">
        <div class="play-area-wrapper area-wrappers play-area-min-height">
            <div class="play-area-header">⚪ YOUR PLAY AREA (${e.player.play.length+e.player.hand.length})</div>
            <div class="flex-cards">
            ${k(e.player.play,(r,c)=>f`<div>${S(r,!0,!0,!1)}</div>`)}
            </div>
        </div>

        <div class="play-area-wrapper area-wrappers play-area-min-height">
            <div class="play-area-header">⚫ THE VOIDS'S PLAY AREA (${e.opponent.play.length+e.opponent.hand.length})</div>
            <div class="flex-cards">
                ${k(e.opponent.play,(r,c)=>f`<div class="pile">${S(r,!0,!0,!1)}</div>`)}
            </div>
        </div>    
    
    </div>
    <div class="dialog-wrapper ${e.isModalOpen||e.isStarted===!1?"":"hidden"}">
        ${e.isStarted===!1?Re():null}
        ${e.currentPhase===1&&e.isStarted===!0?je(e):null}
    </div>  
  `}const ee=xe();let j=0,G=!1;const z=()=>{j++},B=()=>{j=Math.max(0,j-1),j===0&&G&&(G=!1,_())},O=async()=>{if(j>0){G=!0;return}await _()},h=e=>new Promise(t=>setTimeout(t,e)),ge=(e,t)=>t.length>1?e[t[0]][t[1]]:e[t[0]],Ue=document.querySelector("#app"),De=document.querySelector("#eyes"),Ye=e=>{ee.startFlip(),te(Ue,()=>Ne(e)),ee.endFlip(500)},o=be(Fe,Ye);te(De,()=>Ie());const ze=()=>{const e=o.get();return e.phases[e.currentPhase??0]},Be=e=>ze()===e,qe=e=>e.deck[e.deck.length-1],W=(e,t,a,{toStart:n=!1}={})=>{const s=e.findIndex(l=>l.id===a);if(s===-1)return!1;const[i]=e.splice(s,1);return n?t.unshift(i):t.push(i),!0},Le=e=>{const t=o.get();for(const a of["pile1","pile2","pile3"]){let n=t.deck;if(t.isPileToPlay&&(n=t.activePlayer==="player"?t.player.play:t.opponent.play),W(t[a],n,e,{toStart:!0}))return o.set(t),!0}return!1},ve=()=>{for(let e=1;e<=3;e++){const t=o.get(),a=qe(t);if(!a)break;W(t.deck,t[`pile${e}`],a.id),o.set(t)}},we=async(e,t,a)=>{if(!e||!Array.isArray(e.abilityFunct))return;z();for(let l=0;l<e.abilityFunct.length;l++){const r=e.abilityFunct[l];console.log("-=-=-=-",e.abilityFunct);const[c,y]=String(r).split(":");let $=y?parseInt(y,10):0;Number.isNaN($)&&($=y),V[c]&&await V[c](o,t,$)}const n=o.get();let s;a.length>1?s=n[a[0]][a[1]]:s=n[a[0]];const i=s.find(l=>l.id===e.id);i&&(i.isFaceUp=!1,i.isActive=!1,o.set(n)),B()},Ve=()=>{const e=o.get(),t=e.currentPhase===void 0||e.currentPhase+1>=e.phases.length?0:e.currentPhase+1;return e.currentPhase=t,o.set(e),e.phases[t]};async function _(){const e=o.get();if(e.winner){alert(`${e.winner} has won the game`);return}const t=Ve();e.activePlayer==="player"?await Ge(t):await He(t)}const H=e=>{const t=o.get();t.isPhaseButtonDisabled=e,o.set(t)};async function Ge(e){H(!0),e==="deal"&&(ne(!0),ve(),await h(500),await O()),e!=="take"&&e==="end"&&($e(),await O())}async function He(e){H(!0),e==="deal"&&(Q(!0),ve(),await h(500),await O()),e==="take"&&(await We(),await h(3e3),H(!1)),e==="end"&&(Q(!1),$e(),await O())}async function We(){z(),ne();const e=o.get(),t=Math.max(1,Math.min(3,ae(3)));e.selectedPile=`pile${t}`,o.set(e),await h(200),await Pe(),B(),await O()}async function Pe(){for(;;){const t=o.get(),a=t[t.selectedPile];if(!Array.isArray(a)||a.length===0)break;const n=a[a.length-1];if(!n||(n.isFaceUp=!0,n.isActive=!0,o.set(t),await h(1e3),await we({...n},t.activePlayer,[t.selectedPile]),!Le(n.id)))break;await h(1e3)}const e=o.get();e.isPileToPlay=!1,e.player.play=e.player.play.sort(t=>t.isExhausted),e.opponent.play=e.opponent.play.sort(t=>t.isExhausted),o.set(e)}const _e=async()=>{const e=o.get();for(e.isModalOpen=!1,o.set(e),z();;){const t=o.get(),a=t.player.hand.find(s=>s.isSelected===!0);if(!a)break;a.isFaceUp=!0,a.isSelected=!1,a.isActive=!0,o.set(t),await h(1e3),await we({...a},"player",["player","hand"]);const n=o.get();a.isFaceUp=!1,W(n.player.hand,n.player.play,a.id),o.set(n),await h(1e3)}B(),await O()},Ke=()=>{const e=o.get();e.isModalOpen=!1,e.isStarted=!0,o.set(e),window.methods.advancePhase()},Qe=async()=>{const e=o.get();e.isModalOpen=!1,e[e.selectedPile],e[e.selectedPile]=[...e[e.selectedPile].reverse()],o.set(e),z(),await h(500),await Pe(),await h(500),B(),await O()},Xe=()=>{const e=o.get();e.isModalOpen=!1,o.set(e)};function $e(){const e=o.get(),t=e.player.play.length,a=e.opponent.play.length;e.activePlayer==="player"&&t>15&&(e.winner="The Void"),e.activePlayer==="opponent"&&a>15&&(e.winner="You"),e.activePlayer=e.activePlayer==="player"?"opponent":"player",o.set(e)}const Je=e=>{if(!Be("take"))return;const t=o.get();t.activePlayer!=="opponent"&&(t.selectedPile=e,t.isModalOpen=!0,o.set(t))},Ze=(e,t)=>{const a=o.get(),n=ge(a,e),s=n==null?void 0:n.find(i=>i.id===t);s&&(s.isSelected=!s.isSelected,o.set(a))},et=(e,t,a)=>{const n=o.get(),s=ge(n,e);if(!Array.isArray(s)){o.set(n);return}const i=s.findIndex(c=>c.id===t);if(i===-1){o.set(n);return}const[l]=s.splice(i,1),r=a?Math.min(i+1,s.length):Math.max(i-1,0);s.splice(r,0,l),o.set(n)};window.methods={advancePhase:_,submitTakeModal:Qe,cancelTakeModal:Xe,submitPlayModal:_e,cancelPlayModal:Ke,setSelected:Ze,viewPile:Je,orderCards:et};
