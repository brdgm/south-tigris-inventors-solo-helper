import CardDeck from '@/services/CardDeck'
import CardType from '@/services/enum/CardType'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new-round-1-level-1', () => {
    const deck = CardDeck.new(1, DifficultyLevel.LEVEL_1)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.filter(card => card.cardType==CardType.DICE) .length, 'pile-dice').to.eq(4)
    expect(deck.pile.filter(card => card.cardType==CardType.WORKER) .length, 'pile-worker').to.eq(2)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.reserveDice.length, 'reserve').to.eq(5)
    expect(deck.reserveWorker.length, 'reserve').to.eq(4)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(6)
    expect(persistence.discard.length, 'discard').to.eq(0)
    expect(persistence.reserveDice.length, 'reserve').to.eq(5)
    expect(persistence.reserveWorker.length, 'reserve').to.eq(4)
  })

  it('new-round-1-level-3', () => {
    const deck = CardDeck.new(1, DifficultyLevel.LEVEL_3)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.filter(card => card.cardType==CardType.DICE) .length, 'pile-dice').to.eq(5)
    expect(deck.pile.filter(card => card.cardType==CardType.WORKER) .length, 'pile-worker').to.eq(2)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.reserveDice.length, 'reserve').to.eq(4)
    expect(deck.reserveWorker.length, 'reserve').to.eq(4)
  })

  it('new-round-1-level-4', () => {
    const deck = CardDeck.new(1, DifficultyLevel.LEVEL_4)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.filter(card => card.cardType==CardType.DICE) .length, 'pile-dice').to.eq(5)
    expect(deck.pile.filter(card => card.cardType==CardType.WORKER) .length, 'pile-worker').to.eq(3)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.reserveDice.length, 'reserve').to.eq(4)
    expect(deck.reserveWorker.length, 'reserve').to.eq(3)
  })

  it('new-round-2-level-2', () => {
    const deck = CardDeck.new(2, DifficultyLevel.LEVEL_2)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.filter(card => card.cardType==CardType.DICE) .length, 'pile-dice').to.eq(5)
    expect(deck.pile.filter(card => card.cardType==CardType.WORKER) .length, 'pile-worker').to.eq(2)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.reserveDice.length, 'reserve').to.eq(4)
    expect(deck.reserveWorker.length, 'reserve').to.eq(4)
  })

  it('new-round-3-level-1', () => {
    const deck = CardDeck.new(3, DifficultyLevel.LEVEL_1)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.filter(card => card.cardType==CardType.DICE) .length, 'pile-dice').to.eq(5)
    expect(deck.pile.filter(card => card.cardType==CardType.WORKER) .length, 'pile-worker').to.eq(3)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.reserveDice.length, 'reserve').to.eq(4)
    expect(deck.reserveWorker.length, 'reserve').to.eq(3)
  })

  it('new-round-4-level-2', () => {
    const deck = CardDeck.new(4, DifficultyLevel.LEVEL_2)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.filter(card => card.cardType==CardType.DICE) .length, 'pile-dice').to.eq(6)
    expect(deck.pile.filter(card => card.cardType==CardType.WORKER) .length, 'pile-worker').to.eq(3)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.reserveDice.length, 'reserve').to.eq(3)
    expect(deck.reserveWorker.length, 'reserve').to.eq(3)
  })

  it('new-round-4-level-4', () => {
    const deck = CardDeck.new(4, DifficultyLevel.LEVEL_4)

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.filter(card => card.cardType==CardType.DICE) .length, 'pile-dice').to.eq(7)
    expect(deck.pile.filter(card => card.cardType==CardType.WORKER) .length, 'pile-worker').to.eq(4)
    expect(deck.discard.length, 'discard').to.eq(0)
    expect(deck.reserveDice.length, 'reserve').to.eq(2)
    expect(deck.reserveWorker.length, 'reserve').to.eq(2)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({ pile: [3,10,2], discard: [4], reserveDice: [1,6], reserveWorker: [7,8] })

    expect(deck.currentCard?.id).to.eq(4)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(3)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(10)
  })

  it('addDiceReserveCard', () => {
    const deck = CardDeck.fromPersistence({ pile: [3,10,2], discard: [4], reserveDice: [1,6], reserveWorker: [7,8] })

    deck.addDiceReserveCard()
    expect(deck.pile.length, 'pile-length').to.eq(4)
    expect(deck.pile.includes(deck.pile.find(card => card.id==1)!)).to.true
  })

  it('addWorkerReserveCard', () => {
    const deck = CardDeck.fromPersistence({ pile: [3,10,2], discard: [4], reserveDice: [1,6], reserveWorker: [7,8] })

    deck.addWorkerReserveCard()
    expect(deck.pile.length, 'pile-length').to.eq(4)
    expect(deck.pile.includes(deck.pile.find(card => card.id==7)!)).to.true
  })
})
