import { shuffle } from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import { ref } from 'vue'
import DifficultyLevel from './enum/DifficultyLevel'
import CardType from './enum/CardType'

/**
 * Manages the scheme cards.
 */
export default class CardDeck {

  private readonly _pile
  private readonly _discard
  private readonly _reserve

  private constructor(pile : Card[], discard : Card[], reserve : Card[]) {
    this._pile = ref(pile)
    this._discard = ref(discard)
    this._reserve = ref(reserve)
  }

  public get currentCard() : Card|undefined {
    return this._discard.value[0]
  }

  public get pile() : readonly Card[] {
    return this._pile.value
  }

  public get discard() : readonly Card[] {
    return this._discard.value
  }

  public get reserve() : readonly Card[] {
    return this._reserve.value
  }

  public get pileEmpty() : boolean {
    return this._pile.value.length == 0
  }

  /**
   * Draws next card.
   * If not sufficient cards are left, an error is thrown.
   * @returns Next action card
   */
  public draw() : Card {
    const card = this._pile.value.shift()
    if (!card) {
      throw new Error('Pile is empty.')
    }
    this._discard.value.unshift(card)
    return card
  }

  /**
   * Add 1 dice card from the reserve to the pile an shuffles it.
   */
  public addReserveCard() : undefined {
    const card = this._reserve.value.shift()
    if (!card) {
      return
    }
    this._pile.value = shuffle([...this._pile.value, card])
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.value.map(card => card.id),
      discard: this._discard.value.map(card => card.id),
      reserve: this._reserve.value.map(card => card.id)
    }
  }

  /**
   * Creates a shuffled new card deck.
   * @param round Round
   * @param difficultyLevel Difficulty level
   * @returns New card deck
   */
  public static new(round : number, difficultyLevel: DifficultyLevel) : CardDeck {
    const diceCardAdd = [DifficultyLevel.LEVEL_3, DifficultyLevel.LEVEL_4].includes(difficultyLevel) ? 1 : 0
    const workerCardAdd = [DifficultyLevel.LEVEL_4].includes(difficultyLevel) ? 1 : 0
    let diceCardCount
    let workerCardCount
    switch (round) {
      case 1:
        diceCardCount = 4 + diceCardAdd
        workerCardCount = 2 + workerCardAdd
        break
      case 2:
        diceCardCount = 5 + diceCardAdd
        workerCardCount = 2 + workerCardAdd
        break
      case 3:
        diceCardCount = 5 + diceCardAdd
        workerCardCount = 3 + workerCardAdd
        break
      case 4:
        diceCardCount = 6 + diceCardAdd
        workerCardCount = 3 + workerCardAdd
        break
      default:
        throw new Error(`Invalid round number: ${round}`)
    }
    const allDiceCards = shuffle(Cards.getAll(CardType.DICE))
    const allWorkerCards = shuffle(Cards.getAll(CardType.WORKER))
    const cards : Card[] = [
      ...allDiceCards.slice(0, diceCardCount),
      ...allWorkerCards.slice(0, workerCardCount)
    ]
    const remainingDiceCards = allDiceCards.slice(diceCardCount)
    return new CardDeck(cards, [], remainingDiceCards)
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.discard.map(Cards.get),
      persistence.reserve.map(Cards.get)
    )
  }

}
