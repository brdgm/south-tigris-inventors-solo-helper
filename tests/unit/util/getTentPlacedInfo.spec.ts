import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import Player from '@/services/enum/Player'
import getTentPlacedInfo from '@/util/getTentPlacedInfo'
import mockTurn from '../helper/mockTurn'
import TentSpace from '@/services/enum/TentSpace'
import { MAX_TURN } from '@/util/getTurnOrder'

describe('util/getTentPlacedInfo', () => {
  it('noTentsPlaced', () => {
    const state = mockState({rounds: [
      mockRound({round:1, startPlayer: Player.PLAYER})
    ]})
    expect(getTentPlacedInfo(state, 1, 2, 0)).to.eql({
      tentPlaced: [],
      firstPlayer: Player.PLAYER,
      botAdditionalDiceSchemeCard: false,
      botAdditionalWorkerSchemeCard: false
    })
  })

  it('botFirstTent', () => {
    const state = mockState({rounds: [
      mockRound({round:1, startPlayer: Player.PLAYER, turns:[
        mockTurn({round:1,turn:1,player:Player.PLAYER}),
        mockTurn({round:1,turn:1,player:Player.BOT}),
        mockTurn({round:1,turn:2,player:Player.PLAYER,tentPlaced:TentSpace.HIRE_CAMEL}),
        mockTurn({round:1,turn:2,player:Player.BOT,tentPlaced:TentSpace.GUILD_BLACK}),
      ]})
    ]})
    expect(getTentPlacedInfo(state, 1, MAX_TURN, 0)).to.eql({
      tentPlaced: [Player.PLAYER, Player.BOT],
      firstPlayer: Player.BOT,
      botAdditionalDiceSchemeCard: false,
      botAdditionalWorkerSchemeCard: false
    })
  })

  it('playerFirstTent-botEnvoy', () => {
    const state = mockState({rounds: [
      mockRound({round:1, startPlayer: Player.PLAYER, turns:[
        mockTurn({round:1,turn:1,player:Player.PLAYER}),
        mockTurn({round:1,turn:1,player:Player.BOT,tentPlaced:TentSpace.ENVOY}),
        mockTurn({round:1,turn:2,player:Player.PLAYER,tentPlaced:TentSpace.GUILD_ORANGE})
      ]})
    ]})
    expect(getTentPlacedInfo(state, 1, MAX_TURN, 0)).to.eql({
      tentPlaced: [Player.BOT, Player.PLAYER],
      firstPlayer: Player.PLAYER,
      botAdditionalDiceSchemeCard: false,
      botAdditionalWorkerSchemeCard: true
    })
  })

  it('playerFirstTent-botHireCamel', () => {
    const state = mockState({rounds: [
      mockRound({round:1, startPlayer: Player.PLAYER, turns:[
        mockTurn({round:1,turn:1,player:Player.PLAYER}),
        mockTurn({round:1,turn:1,player:Player.BOT,tentPlaced:TentSpace.HIRE_CAMEL}),
        mockTurn({round:1,turn:2,player:Player.PLAYER,tentPlaced:TentSpace.GUILD_ORANGE})
      ]})
    ]})
    expect(getTentPlacedInfo(state, 1, MAX_TURN, 0)).to.eql({
      tentPlaced: [Player.BOT, Player.PLAYER],
      firstPlayer: Player.PLAYER,
      botAdditionalDiceSchemeCard: true,
      botAdditionalWorkerSchemeCard: false
    })
  })
})
