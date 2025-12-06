import { shuffle } from 'lodash'
import { DummyCardDeckPersistence } from '@/store/state'
import { ref } from 'vue'
import DummyCard from './DummyCard'
import DummyCards from './DummyCards'

/**
 * Manages the dummy player cards.
 */
export default class DummyCardDeck {

  private readonly _pile
  private readonly _discard

  private constructor(pile : DummyCard[], discard : DummyCard[]) {
    this._pile = ref(pile)
    this._discard = ref(discard)
  }

  public get currentCard() : DummyCard|undefined {
    return this._discard.value[0]
  }

  public get pile() : readonly DummyCard[] {
    return this._pile.value
  }

  public get discard() : readonly DummyCard[] {
    return this._discard.value
  }

  /**
   * Draws next card.
   * If not sufficient cards are left, an error is thrown.
   * @returns Next action card
   */
  public draw() : DummyCard {
    const card = this._pile.value.shift()
    if (!card) {
      throw new Error('Pile is empty.')
    }
    this._discard.value.unshift(card)
    return card
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : DummyCardDeckPersistence {
    return {
      pile: this._pile.value.map(card => card.id),
      discard: this._discard.value.map(card => card.id)
    }
  }

  /**
   * Creates a shuffled new card deck.
   */
  public static new() : DummyCardDeck {
    const cards = shuffle(DummyCards.getAll())
    return new DummyCardDeck(cards, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : DummyCardDeckPersistence) : DummyCardDeck {
    return new DummyCardDeck(
      persistence.pile.map(DummyCards.get),
      persistence.discard.map(DummyCards.get)
    )
  }

}
