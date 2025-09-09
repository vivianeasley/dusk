import { emojiLowPolyPNGString, shuffleArray } from "./utils";

const rarityRatio = ['c', 'c', 'c', 'c', 'c','c', 'c', 'c', 'c','u', 'u','u', 'u', 'r' ]

const typesArr = ['rift', 'echo', 'omen']

// 🔥 Red / Orange / Hot Colors
export const hotEmojis = ["🦀","🔥","🥩","🧣"];
  
// ❄️ Blue / Green / Purple / Cool Colors
export const coolEmojis = ["🫐","🦋","🌀","❄️"];
  
// ⚪ Neutral / Earthy Colors (unchanged, still covering browns, grays, blacks, whites)
export const neutralEmojis = ["🪙","⚙️","🪞","📓"];

const getGoalCard = (type, player) => {
    let emoji = neutralEmojis[3];
    if (type === "rift") emoji = hotEmojis[3]
    if (type === "echo") emoji = coolEmojis[3]
    return {
        name: `${String(type).charAt(0).toUpperCase() + String(type).slice(1)} Goal Card`,
        types: [type],
        zone: player + 'Goal',
        abilityFunct: [],
        abilityRule: [`At the end of your turn if you have 7 or more other ${type} cards in your play area you win.`],
        cardArt: emojiLowPolyPNGString(emoji, { size: 100, cell: 10 })
    }
}

const distinctCards = {
    blank: {
        name: "Eclipse Void",
        types: ['rift', 'echo', 'omen'],
        abilityFunct: [],
        abilityRule: [],
        cardArt: emojiLowPolyPNGString('🎭', { size: 100, cell: 10 })
    },
    cRift: {
        name: "Stellar Crypt",
        types: ['rift'],
        abilityFunct: ['floodOpponent$Time:2'],
        abilityRule: ['Flood your opponent 2 time.'],
        cardArt: emojiLowPolyPNGString(hotEmojis[0], { size: 100, cell: 10 })
    },
    uRift: {
        name:  "Grave Haunt",
        types: ['rift'],
        abilityFunct: ['floodOpponent$Time:3'],
        abilityRule: ['Flood your opponent 3 times.'],
        cardArt: emojiLowPolyPNGString(hotEmojis[1], { size: 100, cell: 10 })
    },
    rRift: {
        name: "Chasm Infernal",
        types: ['rift'],
        abilityFunct: ['floodAllPlayers$Time:2'],
        abilityRule: ['Flood all players 2 times.'],
        cardArt: emojiLowPolyPNGString(hotEmojis[2], { size: 100, cell: 10 })
    },
    cEcho: {
        name: "Ethereal Nebula",
        types: ['echo'],
        abilityFunct: ['return$Time:1'],
        abilityRule: ['Return a card 1 time.'],
        cardArt: emojiLowPolyPNGString(coolEmojis[0], { size: 100, cell: 10 })
    },
    uEcho: {
        name: "Cosmic Lunar",
        types: ['echo'],
        abilityFunct: ['returnAllExhaustedCards'],
        abilityRule: ['Return all your exhuasted cards.'],
        cardArt: emojiLowPolyPNGString(coolEmojis[1], { size: 100, cell: 10 })
    },
    rEcho: {
        name: "Umbral Aster",
        types: ['echo'],
        abilityFunct: ['unexhaustAllYourExhaustedCards'],
        abilityRule: ['Unexhaust all your exhuasted cards.'],
        cardArt: emojiLowPolyPNGString(coolEmojis[2], { size: 100, cell: 10 })
    },
    cOmen: {
        name: "Orbit Crypt",
        types: ['omen'],
        abilityFunct: ['remianingCardsInPileGoToYourPlayArea'],
        abilityRule: ['The remaining cards in this pile go to your play area.'],
        cardArt: emojiLowPolyPNGString(neutralEmojis[0], { size: 100, cell: 10 })
    },
    uOmen: {
        name: "Nebula Specter",
        types: ['omen'],
        abilityFunct: ['exhaust$OfYourOpponentsUnexhaustedCardsAtRandom:2'],
        abilityRule: ['Exhaust 2 random unexhausted cards in your opponents play area.'],
        cardArt: emojiLowPolyPNGString(neutralEmojis[1], { size: 100, cell: 10 })
    },
    rOmen: {
        name: "Shadow Singularity",
        types: ['omen'],
        abilityFunct: ['exhaust$OfYourOpponentsUnexhaustedCardsAtRandom:4'],
        abilityRule: ['Exhaust 4 random unexhausted cards in your opponents play area.'],
        cardArt: emojiLowPolyPNGString(neutralEmojis[2], { size: 100, cell: 10 })
    }
}


const getCard = (cardValues, index, rarity) => {
    return {...{
        id: index,
        zoneOrder: 0,
        zone: "deck", // pile1, pile2, pile3, takeModal, opponentPlay, playerPlay, active, goal
        isSelected: false,
        isActive: false,
        isExhausted: false,
        rarity
    }, ...cardValues}
}

export const genCards = () => {
    const cards = []

    for (let index = 0; index < 5; index++) {
        const distinctBlankCard = distinctCards.blank
        cards.push(getCard(distinctBlankCard, cards.length + 1, 'U'))
    }
    const shuffledTypes = shuffleArray(typesArr)
    cards.push(getGoalCard(shuffledTypes[0], 'player'))
    cards.push(getGoalCard(shuffledTypes[1], 'opponent'))

    rarityRatio.forEach((rarity)=>{
        const distinctRiftCard = distinctCards[rarity+"Rift"]
        cards.push(getCard(distinctRiftCard, cards.length + 1, rarity))
    })
    rarityRatio.forEach((rarity)=>{
        const distinctRiftCard = distinctCards[rarity+"Echo"]
        cards.push(getCard(distinctRiftCard, cards.length + 1, rarity))
    })
    rarityRatio.forEach((rarity)=>{
        const distinctRiftCard = distinctCards[rarity+"Omen"]
        cards.push(getCard(distinctRiftCard, cards.length + 1, rarity))
    })

    const shuffledCards = shuffleArray(cards)
    
    return shuffledCards.map((card, i)=>{card.zoneOrder = i; return card})
}




  





export const testDeck = [
    {
        "id": 0,
        "zoneOrder": 0,
        "zone": "deck",
        "isSelected": false,
        "isActive": false,
        "isExhausted": false,
        "name": "Test",
        "types": [
            "omen"
        ],
        "abilityFunct": ['return$Time:1'],
        "abilityRule": ["return all"],
        "cardArt": ''
    }, 
    {
        "id": 1,
        "zoneOrder": 1,
        "zone": "deck",
        "isSelected": false,
        "isActive": false,
        "isExhausted": false,
        "name": "Eclipse Void",
        "types": [
            "rift",
            "echo",
            "omen"
        ],
        "abilityFunct": [],
        "abilityRule": [],
        "cardArt": ''
    },
    {
        "id": 2,
        "zoneOrder": 2,
        "zone": "deck",
        "isSelected": false,
        "isActive": false,
        "isExhausted": false,
        "name": "Eclipse Void",
        "types": [
            "rift",
            "echo",
            "omen"
        ],
        "abilityFunct": [],
        "abilityRule": [],
        "cardArt": ''
    },
    {
        "id": 3,
        "zoneOrder": 3,
        "zone": "deck",
        "isSelected": false,
        "isActive": false,
        "isExhausted": false,
        "name": "Eclipse Void",
        "types": [
            "rift",
            "echo",
            "omen"
        ],
        "abilityFunct": [],
        "abilityRule": [],
        "cardArt": ''
    },
    {
        "id": 4,
        "zoneOrder": 4,
        "zone": "deck",
        "isSelected": false,
        "isActive": false,
        "isExhausted": false,
        "name": "Eclipse Void",
        "types": [
            "rift",
            "echo",
            "omen"
        ],
        "abilityFunct": [],
        "abilityRule": [],
        "cardArt": ''
    },
    {
        "id": 5,
        "zoneOrder": 5,
        "zone": "deck",
        "isSelected": false,
        "isActive": false,
        "isExhausted": false,
        "name": "Eclipse Void",
        "types": [
            "rift",
            "echo",
            "omen"
        ],
        "abilityFunct": [],
        "abilityRule": [],
        "cardArt": ''
    },
    {
        "id": 6,
        "zoneOrder": 6,
        "zone": "playerPlay",
        "isSelected": false,
        "isActive": false,
        "isExhausted": true,
        "name": "Test Area",
        "types": [
            "rift",
            "echo",
            "omen"
        ],
        "abilityFunct": [],
        "abilityRule": [],
        "cardArt": ''
    },
    {
        "id": 7,
        "zoneOrder": 7,
        "zone": "playerPlay",
        "isSelected": false,
        "isActive": false,
        "isExhausted": true,
        "name": "Test Area",
        "types": [
            "rift",
            "echo",
            "omen"
        ],
        "abilityFunct": [],
        "abilityRule": [],
        "cardArt": ''
    },  
]
// "forEach$InYourPlayAreaFloodYourOpponent:echo"
// ifYouHave10OrMore$CardsYouWinTheGame:omen
export const testPlayer = [

]

export const testOpponent = []

//   let ability = randArr(keys);
//   const hasValue = ability.includes("$")
//   if (hasValue) {
//       const randomValue = randArr(abilityValueArr)
//       if (typeof randomValue === "string") {
//           return {
//               abilityFunct: ability + ":" + randomValue,
//               abilityRule: camelToText(ability.replace("$", "ForEach " + randomValue + "InYourPlayArea"))
//           }
//       }
//       return {
//           abilityFunct: ability + ":" + randomValue,
//           abilityRule: camelToText(ability.replace("$", randomValue + " "))
//       }
//   }
//   return {
//       abilityFunct: ability,
//       abilityRule: camelToText(ability),
//   }


// for (let index = 0; index < num; index++) {
        
//     if (index < 5) {
//         const cardType = types[index] ? types[index] : types[index - 2]
//         cards.push(createCard([cardType], index, undefined, index))
//     } else if (index >= 5 && index < 25) {
//         const abil = createAbilities([types[0]], 'c')
//         cards.push(createCard([types[0]], index, abil, 3))
//     } else if (index >= 25 && index < 35) {
//         const abil = createAbilities([types[1]], 'c')
//         cards.push(createCard([types[1]], index, abil, 3))           
//     } else if (index >= 35 && index < 45) {
//         // const abil = createAbilities([types[2]], 'c')
//         // console.log("abil", abil.abilityFunct[0])
//         // cards.push(createCard([types[2]], index, abil, 3))
//     }
//     // cards.push(createCard(Math.floor(num/10), index)) 
// }
// for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
//     const type = types[typeIndex];
//     for (let abIndex = 0; abIndex < 3; abIndex++) {
//         const abilType = createAbilities(type, [type], 'c')
//         console.log("abil", abilType.abilityFunct[0])
//         cards.push(createCard([type], 3+abIndex, abilType))
//     }
// }