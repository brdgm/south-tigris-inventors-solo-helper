import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { expect } from 'chai'

describe('services/BotActions', () => {
  it('card-1', () => {
    const deck = CardDeck.fromPersistence({pile: [1,3,5,6], discard: [4], reserve: [8,9]})
    const underTest = BotActions.drawCard(deck, {silver:0}, false)

    expect(underTest.actions).to.eql([
      { action: Action.TEST },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('card-5-second-last-card', () => {
    const deck = CardDeck.fromPersistence({pile: [5,6], discard: [3,1,4], reserve: [8,9]})
    const underTest = BotActions.drawCard(deck, {silver:1}, false)

    expect(underTest.actions).to.eql([
      { action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE], silverBonus: 1 }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(true)
  })

  it('card-6-last-card', () => {
    const deck = CardDeck.fromPersistence({pile: [6], discard: [5,3,1,4], reserve: [8,9]})
    const underTest = BotActions.drawCard(deck, {silver:1}, false)

    expect(underTest.actions).to.eql([])
    expect(underTest.placeTent).to.eq(true)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('placedTent', () => {
    const deck = CardDeck.fromPersistence({pile: [], discard: [6,5,3,1,4], reserve: [8,9]})
    const underTest = BotActions.drawCard(deck, {silver:1}, true)

    expect(underTest.actions).to.eql([{action:Action.SILVER, silverBonus:1}])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })
})
