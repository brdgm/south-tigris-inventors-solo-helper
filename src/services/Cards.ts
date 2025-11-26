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
    guildPriorities: [Guild.BLUE, Guild.YELLOW, Guild.BLACK],
    rowPriorities: [1, 3, 2],
    actions: [
      Action.TEST,
      Action.INFLUENCE_EACH_1
    ],
    tentPosition: 4,
    dummyPlayerTentPosition: 1
  },
  {
    id: 2,
    cardType: CardType.DICE,
    guildPriorities: [Guild.BLUE, Guild.YELLOW, Guild.BLACK],
    rowPriorities: [2, 1, 3],
    actions: [
      Action.TEST,
      Action.INVENT,
      Action.SILVER_2
    ],
    tentPosition: 5,
    dummyPlayerTentPosition: 3
  },
  {
    id: 3,
    cardType: CardType.DICE,
    guildPriorities: [Guild.BLUE, Guild.YELLOW, Guild.BLACK],
    rowPriorities: [2, 3, 1],
    actions: [
      Action.INVENT_SILVER_1,
      Action.TEST,
      Action.SILVER_2
    ],
    tentPosition: 1,
    dummyPlayerTentPosition: 3
  },
  {
    id: 4,
    cardType: CardType.DICE,
    guildPriorities: [Guild.BLUE, Guild.YELLOW, Guild.BLACK],
    rowPriorities: [3, 2, 1],
    actions: [
      Action.BUILD_PAY_SILVER_3,
      Action.TEST,
      Action.SILVER_2
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
      Action.PUBLISH_PAY_SILVER_3,
      Action.INFLUENCE_YELLOW_1_SILVER_1
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
      Action.BUILD_PAY_SILVER_3,
      Action.INVENT,
      Action.SILVER_2
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
      Action.INVENT,
      Action.SILVER_3
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
      Action.BUILD_OR_PUBLISH_SILVER_4,
      Action.INFLUENCE_BLACK_1_SILVER_1
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
      Action.BUILD_OR_PUBLISH_SILVER_4,
      Action.INFLUENCE_BLUE_1_SILVER_1
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
      Action.RESEARCH_LOOSE_INFLUENCE_BLUE_2,
      Action.INFLUENCE_EACH_1
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
      Action.RESEARCH_LOOSE_INFLUENCE_YELLOW_2,
      Action.SILVER_3
    ],
    tentPosition: 2,
    dummyPlayerTentPosition: 1
  },
  {
    id: 12,
    cardType: CardType.WORKER,
    guildPriorities: [Guild.BLUE, Guild.YELLOW, Guild.BLACK],
    rowPriorities: [3, 1, 2],
    actions: [
      Action.RESEARCH_LOOSE_INFLUENCE_BLACK_2,
      Action.TEST,
      Action.SILVER_2
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
      Action.ADD_DICE_RESERVE_CARD_SILVER_1_LOOSE_INFLUENCE_EACH_1,
      Action.INFLUENCE_BLUE_1_BLACK_1_SILVER_1
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
      Action.RESEARCH_LOOSE_INFLUENCE_EACH_1,
      Action.INFLUENCE_BLUE_1_YELLOW_1_SILVER_1
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
      Action.ADVANCE_SHIP_LOOSE_INFLUENCE_EACH_1,
      Action.INFLUENCE_YELLOW_1_BLACK_1_SILVER_1
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
