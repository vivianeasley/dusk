import { delay, filterByZone, shuffleArray  } from "./utils";


// TODO Remove remove all string value handling
const getTypeValue = (store, amount) => {
    // const owner = target === "player" ? "opponent" : "player"
    if (typeof amount !== 'number' || amount <= 0) {
        const s = store.get()
        const owner = s.activePlayer === "player" ? "player" : "opponent";
        let value = 0
        for (let index = 0; index < s[owner].play.length; index++) {
            if (s[owner].play[index].types.includes(amount) && s[owner].play[index].isExhausted === false) value++   
        }
        return value
    }
    return amount
}

/** --------------------------------------------------------------
 * Ability runtime: tiny primitives
 * -------------------------------------------------------------*/

// Simple sequential loop with delays inside
const forEachNSequential = async (n, fn) => {
  for (let i = 0; i < n; i++) {
    // eslint-disable-next-line no-await-in-loop
    const shouldContinue = await fn(i);
    if (shouldContinue === false) break;
  }
};

/** --------------------------------------------------------------
 * Ability actions (clean, symmetric)
 * -------------------------------------------------------------*/

/**
 * dealDamage: target draws `amount` cards from DECK TOP into their HAND.
 * - Player draws face-up (visible), opponent draws face-down.
 */
async function dealDamage(store, target /* 'player'|'opponent' */, amount) {
  const val = getTypeValue(store, amount)

  await forEachNSequential(val, async () => {
    const s = store.get();
    const deck = filterByZone(s.cards, "deck")
    const top = deck[deck.length - 1];
    if (!top) return false; // deck empty

    top.zone = `${target}Play`
    store.set(s);
    await delay(1000);
  });
}

/**
 * healDamage: target returns `amount` cards from HAND to the BOTTOM OF DECK.
 * - Always face-down when returned.
 */
async function healDamage(store, target /* 'player'|'opponent' */, amount) {
    const val = getTypeValue(store, amount)

  await forEachNSequential(val, async () => {
    const s = store.get();
    const playArea = `${target}Play`;
    const play = filterByZone(s.cards, playArea)
    if (!play.length) return false;

    const exhaustedCard = play.find((data)=>data.isExhausted)
    const card = exhaustedCard ?? play[play.length - 1];
    if (!card || card.zone === "playerGoal" || card.zone === "opponentGoal") return false;

    const deck = filterByZone(s.cards, "deck")
    card.zone = "deck";
    card.zoneOrder = deck[deck.length - 1].zoneOrder + 1
    card.isExhausted = false;
    store.set(s);
    await delay(1000);
  });
}

export const abilities = {
    'floodOpponent$Time': async (store, cardOwner, value) => {
        const target = cardOwner === 'player' ? 'opponent' : 'player'
        await dealDamage(store, target, value)
    },
    'floodAllPlayers$Time': async (store, cardOwner, value) => {
        await dealDamage(store, 'player', value)
        await dealDamage(store, 'opponent', value)
    },
    'return$Time': async (store, cardOwner, value) => {
        await healDamage(store, cardOwner, value)
    },
    'returnAllExhaustedCards': async (store, cardOwner, value) => {
        await delay(1000);
        const s = store.get();
        let playAreaCards = s.activePlayer === 'player' ? filterByZone(s.cards, 'playerPlay') : filterByZone(s.cards, 'opponentPlay')
        const deck = filterByZone(s.cards, "deck")
        for (let index = 0; index < playAreaCards.length; index++) {
            const card = playAreaCards[index];
            if (card.isExhausted) {
                card.zone = deck;
                card.zoneOrder = deck[deck.length - 1].zoneOrder + 1
            }   
        }
        store.set(s)
    },
    'unexhaustAllYourExhaustedCards': async (store, cardOwner, value) => {
        await delay(1000);
        const s = store.get();
        let playAreaCards = s.activePlayer === 'player' ? filterByZone(s.cards, 'playerPlay') : filterByZone(s.cards, 'opponentPlay')
        for (let index = 0; index < playAreaCards.length; index++) {
            const card = playAreaCards[index];
            if (card.isExhausted) {
                card.isExhausted = false;
            }   
        }
        store.set(s)        
    },
    'remianingCardsInPileGoToYourPlayArea': async (store, cardOwner, value) => {
        await delay(1000)
        const s = store.get()
        s.isPileToPlay = "next";
        store.set(s)
    },
    'exhaust$OfYourOpponentsUnexhaustedCardsAtRandom': async (store, cardOwner, value) => {
        await delay(1000);
        const s = store.get();
        const activePlayer = s.activePlayer;
        let playAreaCards = activePlayer === 'opponent' ? filterByZone(s.cards, 'playerPlay') : filterByZone(s.cards, 'opponentPlay')
        const cardIds = playAreaCards.map((data)=>data.id)
        const randomIds = shuffleArray(cardIds)
        let count = 0;
        for (let index = 0; index < randomIds.length; index++) {
            const card = playAreaCards.find((data)=>data.id === randomIds[index]);
            if (!card.isExhausted && (card.zone !== "playerGoal" || card.zone !== "opponentGoal")) {
                card.isExhausted = true;
                count++
            }
            if (count >= value) break    
        }
        store.set(s)
    }
    
  }

/*

Bugs:
- Make opponents cards face down
- Reveal all their cards on game end

- shorten ability names and remove parsing code


*/

/*
Prioritize rifts
If 10+ cards in play area prioritize echos
If omen try to get matched cards in play area
*/