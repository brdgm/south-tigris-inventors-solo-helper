import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import CardType from './enum/CardType'
import Guild from './enum/Guild'

/**
 * Scheme cards
 */
const cards : Card[] = [
  {
    id: 1,
    cardType: CardType.DICE,
    guildPriorities: [Guild.BLUE, Guild.ORANGE, Guild.BLACK],
    rowPriorities: [1, 3, 2],
    actions: [
      { action: Action.TEST },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] }
    ],
    tentPosition: 4,
    dummyPlayerTentPosition: 1
  },
  {
    id: 2,
    cardType: CardType.DICE,
    guildPriorities: [Guild.BLUE, Guild.ORANGE, Guild.BLACK],
    rowPriorities: [2, 1, 3],
    actions: [
      { action: Action.TEST },
      { action: Action.INVENT },
      { action: Action.SILVER, silverBonus: 2 }
    ],
    tentPosition: 5,
    dummyPlayerTentPosition: 3
  },
  {
    id: 3,
    cardType: CardType.DICE,
    guildPriorities: [Guild.BLUE, Guild.ORANGE, Guild.BLACK],
    rowPriorities: [2, 3, 1],
    actions: [
      { action: Action.INVENT, silverBonus: 1 },
      { action: Action.TEST },
      { action: Action.SILVER, silverBonus: 2 }
    ],
    tentPosition: 1,
    dummyPlayerTentPosition: 3
  },
  {
    id: 4,
    cardType: CardType.DICE,
    guildPriorities: [Guild.BLUE, Guild.ORANGE, Guild.BLACK],
    rowPriorities: [3, 2, 1],
    actions: [
      { action: Action.BUILD, silverCost: 3 },
      { action: Action.TEST },
      { action: Action.SILVER, silverBonus: 2 }
    ],
    tentPosition: 3,
    dummyPlayerTentPosition: 2
  },
  {
    id: 5,
    cardType: CardType.DICE,
    guildPriorities: [],
    rowPriorities: [1, 2, 3],
    actions: [
      { action: Action.PUBLISH, silverCost: 3 },
      { action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE], silverBonus: 1 }
    ],
    tentPosition: 4,
    dummyPlayerTentPosition: 3
  },
  {
    id: 6,
    cardType: CardType.DICE,
    guildPriorities: [],
    rowPriorities: [1, 3, 2],
    actions: [
      { action: Action.BUILD, silverCost: 3 },
      { action: Action.INVENT },
      { action: Action.SILVER, silverBonus: 2 }
    ],
    tentPosition: 2,
    dummyPlayerTentPosition: 4
  },
  {
    id: 7,
    cardType: CardType.DICE,
    guildPriorities: [],
    rowPriorities: [2, 1, 3],
    actions: [
      { action: Action.INVENT },
      { action: Action.SILVER, silverBonus: 3 }
    ],
    tentPosition: 2,
    dummyPlayerTentPosition: 5
  },
  {
    id: 8,
    cardType: CardType.DICE,
    guildPriorities: [],
    rowPriorities: [2, 3, 1],
    actions: [
      { action: Action.BUILD, silverCost: 4 },
      { action: Action.PUBLISH, silverCost: 4 },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLACK], silverBonus: 1 }
    ],
    tentPosition: 1,
    dummyPlayerTentPosition: 5
  },
  {
    id: 9,
    cardType: CardType.DICE,
    guildPriorities: [],
    rowPriorities: [3, 1, 2],
    actions: [
      { action: Action.BUILD, silverCost: 4 },
      { action: Action.PUBLISH, silverCost: 4 },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE], silverBonus: 1 }
    ],
    tentPosition: 3,
    dummyPlayerTentPosition: 5
  },
  {
    id: 10,
    cardType: CardType.WORKER,
    guildPriorities: [],
    rowPriorities: [],
    actions: [
      { action: Action.RESEARCH, influenceCost: [Guild.BLUE,Guild.BLUE] },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] }
    ],
    tentPosition: 5,
    dummyPlayerTentPosition: 1
  },
  {
    id: 11,
    cardType: CardType.WORKER,
    guildPriorities: [],
    rowPriorities: [],
    actions: [
      { action: Action.RESEARCH, influenceCost: [Guild.ORANGE,Guild.ORANGE] },
      { action: Action.SILVER, silverBonus: 3 }
    ],
    tentPosition: 2,
    dummyPlayerTentPosition: 1
  },
  {
    id: 12,
    cardType: CardType.WORKER,
    guildPriorities: [Guild.BLUE, Guild.ORANGE, Guild.BLACK],
    rowPriorities: [3, 1, 2],
    actions: [
      { action: Action.RESEARCH, influenceCost: [Guild.BLACK,Guild.BLACK] },
      { action: Action.TEST },
      { action: Action.SILVER, silverBonus: 2 }
    ],
    tentPosition: 1,
    dummyPlayerTentPosition: 4
  },
  {
    id: 13,
    cardType: CardType.WORKER,
    guildPriorities: [],
    rowPriorities: [1, 3, 2],
    actions: [
      { action: Action.ADD_DICE_RESERVE_CARD, influenceCost: [Guild.BLUE,Guild.ORANGE,Guild.BLACK], silverBonus: 1 },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.BLACK], silverBonus: 1 }
    ],
    tentPosition: 3,
    dummyPlayerTentPosition: 1
  },
  {
    id: 14,
    cardType: CardType.WORKER,
    guildPriorities: [],
    rowPriorities: [2, 1, 3],
    actions: [
      { action: Action.RESEARCH, influenceCost: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.ORANGE], silverBonus: 1 }
    ],
    tentPosition: 4,
    dummyPlayerTentPosition: 2
  },
  {
    id: 15,
    cardType: CardType.WORKER,
    guildPriorities: [],
    rowPriorities: [3, 2, 1],
    actions: [
      { action: Action.ADVANCE_SHIP, influenceCost: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] },
      { action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE,Guild.BLACK], silverBonus: 1 }
    ],
    tentPosition: 5,
    dummyPlayerTentPosition: 2
  },
]

const cardsMap = new Map<number,Card>()
for (const card of cards) {
  cardsMap.set(card.id, card)
}

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns Cards
   */
  getAll(cardType: CardType) : Card[] {
    return cards.filter(card => card.cardType == cardType)
  }

}
