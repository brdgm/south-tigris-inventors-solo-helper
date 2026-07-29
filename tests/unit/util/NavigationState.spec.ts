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
import TentSpace from '@/services/enum/TentSpace'
import mockBotResources from '../helper/mockBotResources'
import RoundCount from '@/services/enum/RoundCount'

const state = mockState({difficultyLevel: DifficultyLevel.LEVEL_3, rounds:[
  mockRound({round:1, startPlayer: Player.PLAYER, initialCardDeck:mockCardDeck({pile:[1,2,3,4]}), turns:[
    mockTurn({round:1,turn:1,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[1,2,3,4]}),silver:6,workers:2})}),
    mockTurn({round:1,turn:1,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[2,3,4], discard:[1]}),silver:2,workers:2})}),
    mockTurn({round:1,turn:2,player:Player.PLAYER,tentPlaced:TentSpace.GUILD_BLUE,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[2,3,4], discard:[1]}),silver:2,workers:2})}),
    mockTurn({round:1,turn:2,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[3,4], discard:[2,1]}),silver:4,workers:2})}),
    mockTurn({round:1,turn:3,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[3,4], discard:[2,1]}),silver:4,workers:2})}),
    mockTurn({round:1,turn:3,player:Player.BOT,tentPlaced:TentSpace.GUILD_BLACK,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[4], discard:[3,2,1]}),silver:4,workers:2})})
  ]})
]})

// short 3-round game: first round is round 2
const shortGameState = mockState({difficultyLevel: DifficultyLevel.LEVEL_1, roundCount: RoundCount.SHORT_3_ROUNDS, rounds:[
  mockRound({round:2, startPlayer: Player.PLAYER, initialCardDeck:mockCardDeck({pile:[1,2,3,4]}), turns:[
    mockTurn({round:2,turn:1,player:Player.PLAYER,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[1,2,3,4]}),silver:3,workers:2,builtDevices:1,publishedDevices:1})}),
    mockTurn({round:2,turn:1,player:Player.BOT,botPersistence:mockBotPersistence({cardDeck:mockCardDeck({pile:[2,3,4], discard:[1]}),silver:5,workers:2,builtDevices:1,publishedDevices:1})})
  ]}),
  mockRound({round:3, startPlayer: Player.PLAYER, initialCardDeck:mockCardDeck({pile:[1,2,3,4]}), turns:[]})
]})

describe('util/NavigationState', () => {
  it('round1-turn1-player', () => {
    const underTest = navigationState('RoundTurnPlayer',{round:'1',turn:'1',turnOrderIndex:'0'})
    expect(underTest.round).to.equal(1)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence()).to.eql(mockCardDeck({pile:[1,2,3,4]}).toPersistence())
    expect(underTest.botResources).to.eql(mockBotResources({silver:6, workers:3}))
    expect(underTest.tentPlaced).to.eql([])
  })

  it('round1-turn1-bot', () => {
    const underTest = navigationState('RoundTurnBot',{round:'1',turn:'1',turnOrderIndex:'1'})
    expect(underTest.round).to.equal(1)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence()).to.eql(mockCardDeck({pile:[2,3,4],discard:[1]}).toPersistence())
    expect(underTest.botResources).to.eql(mockBotResources({silver:6, workers:2}))
    expect(underTest.tentPlaced).to.eql([])
  })

  it('round1-turn2-bot', () => {
    const underTest = navigationState('RoundTurnBot',{round:'1',turn:'2',turnOrderIndex:'1'})
    expect(underTest.round).to.equal(1)
    expect(underTest.turn).to.equal(2)
    expect(underTest.cardDeck.toPersistence()).to.eql(mockCardDeck({pile:[3,4],discard:[2,1]}).toPersistence())
    expect(underTest.botResources).to.eql(mockBotResources({silver:2, workers:2}))
    expect(underTest.tentPlaced).to.eql([Player.PLAYER])
  })

  it('round2-turn1-player', () => {
    const underTest = navigationState('RoundTurnPlayer',{round:'2',turn:'1',turnOrderIndex:'0'})
    expect(underTest.round).to.equal(2)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence().discard).to.have.lengthOf(0)
    expect(underTest.botResources).to.eql(mockBotResources({silver:7, workers:3}))
    expect(underTest.tentPlaced).to.eql([])
  })

  it('shortGame-round2-turn1-player', () => {
    const underTest = navigationState('RoundTurnPlayer',{round:'2',turn:'1',turnOrderIndex:'0'}, shortGameState)
    expect(underTest.round).to.equal(2)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence()).to.eql(mockCardDeck({pile:[1,2,3,4]}).toPersistence())
    expect(underTest.botResources).to.eql(mockBotResources({silver:3, workers:3, builtDevices:1, publishedDevices:1}))
    expect(underTest.tentPlaced).to.eql([])
  })

  it('shortGame-round3-turn1-player', () => {
    const underTest = navigationState('RoundTurnPlayer',{round:'3',turn:'1',turnOrderIndex:'0'}, shortGameState)
    expect(underTest.round).to.equal(3)
    expect(underTest.turn).to.equal(1)
    expect(underTest.cardDeck.toPersistence().discard.length).to.eq(0)
    expect(underTest.botResources).to.eql(mockBotResources({silver:8, workers:3, builtDevices:1, publishedDevices:1}))
    expect(underTest.tentPlaced).to.eql([])
  })
})

function navigationState(routeName:string, params:RouteParams, navigationStateForState=state) : NavigationState {
  return new NavigationState(mockRouteLocation({name:routeName, params}), navigationStateForState)
}
