import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'

/**
 * Solo cards
 */
const cards : Card[] = [
  {
    id: 1,
    action: Action.LAUNCH
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
  getAll() : Card[] {
    return cards
  }

}
