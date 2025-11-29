import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import DummyCard from './DummyCard'
import WorkerSpace from './enum/WorkerSpace'
import Guild from './enum/Guild'

/**
 * Dummy player cards
 */
const cards : DummyCard[] = [
  {
    id: 1,
    influenceBlue: 2,
    influenceOrange: 1,
    influenceBlack: 0,
    shipMovement: 3,
    increaseCostWorkerSpace: WorkerSpace.HIRE_CAMEL,
    increaseCostGuild: Guild.BLUE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLACK_INFLUENCE_2, WorkerSpace.GUILD_ORANGE_INFLUENCE_1_CRAFTSPERSON]
  },
  {
    id: 2,
    influenceBlue: 0,
    influenceOrange: 2,
    influenceBlack: 1,
    shipMovement: 3,
    increaseCostWorkerSpace: WorkerSpace.ADVANCE_SHIP,
    increaseCostGuild: Guild.ORANGE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLUE_INFLUENCE_2, WorkerSpace.GUILD_BLACK_INFLUENCE_1_DISCARD_DEVICE_CARD]
  },
  {
    id: 3,
    influenceBlue: 1,
    influenceOrange: 2,
    influenceBlack: 0,
    shipMovement: 4,
    increaseCostWorkerSpace: WorkerSpace.REFRESH_CRAFTSPEOPLE,
    increaseCostGuild: Guild.BLUE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_ORANGE_INFLUENCE_2, WorkerSpace.GUILD_BLACK_INFLUENCE_1_DISCARD_DEVICE_CARD]
  },
  {
    id: 4,
    influenceBlue: 1,
    influenceOrange: 0,
    influenceBlack: 2,
    shipMovement: 4,
    increaseCostWorkerSpace: WorkerSpace.ADVANCE_SHIP,
    increaseCostGuild: Guild.BLACK,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLUE_INFLUENCE_2, WorkerSpace.GUILD_ORANGE_INFLUENCE_1_CRAFTSPERSON]
  },
  {
    id: 5,
    influenceBlue: 0,
    influenceOrange: 1,
    influenceBlack: 2,
    shipMovement: 4,
    increaseCostWorkerSpace: WorkerSpace.HIRE_CAMEL,
    increaseCostGuild: Guild.ORANGE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLACK_INFLUENCE_2, WorkerSpace.GUILD_BLUE_INFLUENCE_1_SILVER_1]
  },
  {
    id: 6,
    influenceBlue: 2,
    influenceOrange: 0,
    influenceBlack: 1,
    shipMovement: 5,
    increaseCostWorkerSpace: WorkerSpace.REFRESH_CRAFTSPEOPLE,
    increaseCostGuild: Guild.BLACK,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_ORANGE_INFLUENCE_2, WorkerSpace.GUILD_BLUE_INFLUENCE_1_SILVER_1]
  },
]

const cardsMap = new Map<number,DummyCard>()
for (const card of cards) {
  cardsMap.set(card.id, card)
}

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : DummyCard {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns Cards
   */
  getAll() : DummyCard[] {
    return cards
  }

}
