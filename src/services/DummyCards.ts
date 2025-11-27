import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import DummyCard from './DummyCard'
import InfluencePlace from './enum/InfluencePlace'
import WorkerSpace from './enum/WorkerSpace'
import Guild from './enum/Guild'

/**
 * Dummy player cards
 */
const cards : DummyCard[] = [
  {
    id: 1,
    influencePlace: InfluencePlace.BLUE_2_ORANGE_1,
    shipMovement: 3,
    increaseCostWorkerSpace: WorkerSpace.HIRE_CAMEL,
    increaseCostGuild: Guild.BLUE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLACK_INFLUENCE_2, WorkerSpace.GUILD_ORANGE_INFLUENCE_1_CRAFTSPERSON]
  },
  {
    id: 2,
    influencePlace: InfluencePlace.ORANGE_2_BLACK_1,
    shipMovement: 3,
    increaseCostWorkerSpace: WorkerSpace.ADVANCE_SHIP,
    increaseCostGuild: Guild.ORANGE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLUE_INFLUENCE_2, WorkerSpace.GUILD_BLACK_INFLUENCE_1_DISCARD_DEVICE_CARD]
  },
  {
    id: 3,
    influencePlace: InfluencePlace.BLUE_1_ORANGE_2,
    shipMovement: 4,
    increaseCostWorkerSpace: WorkerSpace.REFRESH_CRAFTSPEOPLE,
    increaseCostGuild: Guild.BLUE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_ORANGE_INFLUENCE_2, WorkerSpace.GUILD_BLACK_INFLUENCE_1_DISCARD_DEVICE_CARD]
  },
  {
    id: 4,
    influencePlace: InfluencePlace.BLUE_1_BLACK_2,
    shipMovement: 4,
    increaseCostWorkerSpace: WorkerSpace.ADVANCE_SHIP,
    increaseCostGuild: Guild.BLACK,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLUE_INFLUENCE_2, WorkerSpace.GUILD_ORANGE_INFLUENCE_1_CRAFTSPERSON]
  },
  {
    id: 5,
    influencePlace: InfluencePlace.ORANGE_1_BLACK_2,
    shipMovement: 4,
    increaseCostWorkerSpace: WorkerSpace.HIRE_CAMEL,
    increaseCostGuild: Guild.ORANGE,
    blockGuildWorkerSpaces: [WorkerSpace.GUILD_BLACK_INFLUENCE_2, WorkerSpace.GUILD_BLUE_INFLUENCE_1_SILVER_1]
  },
  {
    id: 6,
    influencePlace: InfluencePlace.BLUE_2_BLACK_1,
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
