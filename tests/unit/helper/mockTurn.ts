import { BotPersistence, RoundTurn } from '@/store/state'
import mockBotPersistence from './mockBotPersistence'
import Player from '@/services/enum/Player'
import TentSpace from '@/services/enum/TentSpace'

export default function mockTurn(params?: MockTurnParams) : RoundTurn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    turnOrderIndex: params?.turnOrderIndex ?? 0,
    player: params?.player ?? Player.PLAYER,
    tentPlaced: params?.tentPlaced,
    botPersistence: params?.botPersistence ?? mockBotPersistence()
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  turnOrderIndex? : number
  player? : Player
  tentPlaced?: TentSpace
  botPersistence?: BotPersistence
}
