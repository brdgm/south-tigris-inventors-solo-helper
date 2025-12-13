import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { expect } from 'chai'
import mockBotResources from '../helper/mockBotResources'

describe('services/BotActions', () => {
  it('card-1', () => {
    const deck = CardDeck.fromPersistence({pile: [1,3,5,6], discard: [4], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:0, workers:2}), false)

    expect(underTest.actions).to.eql([
      { action: Action.TEST },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('card-4', () => {
    const deck = CardDeck.fromPersistence({pile: [4,1,3,5,6], discard: [], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:5, workers:2}), false)

    expect(underTest.actions).to.eql([
      { action: Action.BUILD, silverCost: 3 },
      { action: Action.TEST },
      { action: Action.SILVER, silverBonus: 2 }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('card-4-not-enough-silver', () => {
    const deck = CardDeck.fromPersistence({pile: [4,1,3,5,6], discard: [], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:1, workers:2}), false)

    expect(underTest.actions).to.eql([
      { action: Action.TEST },
      { action: Action.SILVER, silverBonus: 2 }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('card-5-second-last-card', () => {
    const deck = CardDeck.fromPersistence({pile: [5,6], discard: [3,1,4], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:1, workers:2}), false)

    expect(underTest.actions).to.eql([
      { action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE], silverBonus: 1 }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(true)
  })

  it('card-6-last-card', () => {
    const deck = CardDeck.fromPersistence({pile: [6], discard: [5,3,1,4], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:1, workers:2}), false)

    expect(underTest.actions).to.eql([])
    expect(underTest.placeTent).to.eq(true)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('card-10', () => {
    const deck = CardDeck.fromPersistence({pile: [10,5,6], discard: [], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:5, workers:2}), false)

    expect(underTest.actions).to.eql([
      { action: Action.RESEARCH, placeWorker: true, influenceCost: [Guild.BLUE,Guild.BLUE] },
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('card-10-not-enough-workers', () => {
    const deck = CardDeck.fromPersistence({pile: [10,5,6], discard: [], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:5, workers:0}), false)

    expect(underTest.actions).to.eql([
      { action: Action.INFLUENCE, influenceBonus: [Guild.BLUE,Guild.ORANGE,Guild.BLACK] }
    ])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })

  it('placedTent', () => {
    const deck = CardDeck.fromPersistence({pile: [], discard: [6,5,3,1,4], reserveDice: [8,9], reserveWorker: [10,11]})
    const underTest = BotActions.drawCard(deck, mockBotResources({silver:1, workers:2}), true)

    expect(underTest.actions).to.eql([{action:Action.SILVER, silverBonus:1}])
    expect(underTest.placeTent).to.eq(false)
    expect(underTest.secondLastCard).to.eq(false)
  })
})
