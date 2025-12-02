import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import { RouteParams } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import Player from '@/services/enum/Player'
import mockBotPersistence from '../helper/mockBotPersistence'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

const state = mockState({difficultyLevel: DifficultyLevel.LEVEL_3, rounds:[
  mockRound({round:1, startPlayer: Player.PLAYER, initialCardDeck:mockCardDeck({pile:[1,2,3,4]}), turns:[
    mockTurn({round:1,turn:1,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[1,2,3,4]}),silver:6})}),
    mockTurn({round:1,turn:1,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[2,3,4], discard:[1]}),silver:2})}),
    mockTurn({round:1,turn:2,player:Player.PLAYER,tentPlaced:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[2,3,4], discard:[1]}),silver:2})}),
    mockTurn({round:1,turn:2,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[3,4], discard:[2,1]}),silver:4})}),
    mockTurn({round:1,turn:3,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[3,4], discard:[2,1]}),silver:4})}),
    mockTurn({round:1,turn:3,player:Player.BOT,tentPlaced:true,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[4], discard:[3,2,1]}),silver:4})})
  ]})
]})

describe('util/NavigationState', () => {
  it('round1-turn1-player', () => {
    const underTest = navigationState('RoundTurnPlayer',{round:'1',turn:'1',turnOrderIndex:'0'})
    expect(underTest.round).to.equal(1)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence()).to.eql(mockCardDeck({pile:[1,2,3,4]}).toPersistence())
    expect(underTest.botResources).to.eql({silver:6})
    expect(underTest.tentPlaced).to.eql([])
  })

  it('round1-turn1-bot', () => {
    const underTest = navigationState('RoundTurnBot',{round:'1',turn:'1',turnOrderIndex:'1'})
    expect(underTest.round).to.equal(1)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence()).to.eql(mockCardDeck({pile:[2,3,4],discard:[1]}).toPersistence())
    expect(underTest.botResources).to.eql({silver:6})
    expect(underTest.tentPlaced).to.eql([])
  })

  it('round1-turn2-bot', () => {
    const underTest = navigationState('RoundTurnBot',{round:'1',turn:'2',turnOrderIndex:'1'})
    expect(underTest.round).to.equal(1)
    expect(underTest.turn).to.equal(2)
    expect(underTest.cardDeck.toPersistence()).to.eql(mockCardDeck({pile:[3,4],discard:[2,1]}).toPersistence())
    expect(underTest.botResources).to.eql({silver:2})
    expect(underTest.tentPlaced).to.eql([Player.PLAYER])
  })

  it('round2-turn1-player', () => {
    const underTest = navigationState('RoundTurnPlayer',{round:'2',turn:'1',turnOrderIndex:'0'})
    expect(underTest.round).to.equal(2)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence().discard.length).to.eq(0)
    expect(underTest.botResources).to.eql({silver:4})
    expect(underTest.tentPlaced).to.eql([])
  })
})

function navigationState(routeName:string, params:RouteParams) : NavigationState {
  return new NavigationState(mockRouteLocation({name:routeName, params}), state)
}
