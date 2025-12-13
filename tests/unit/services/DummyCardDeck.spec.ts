import DummyCardDeck from '@/services/DummyCardDeck'
import { expect } from 'chai'

describe('services/DummyCardDeck', () => {
  it('new', () => {
    const deck = DummyCardDeck.new()

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(6)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(6)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = DummyCardDeck.fromPersistence({ pile: [3,5,2], discard: [4] })

    expect(deck.currentCard?.id).to.eq(4)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(3)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(5)
  })
})
