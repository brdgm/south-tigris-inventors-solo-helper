import { BotPersistence, RoundTurn } from '@/store/state'
import mockBotPersistence from './mockBotPersistence'

export default function mockTurn(params?: MockTurnParams) : RoundTurn {
  return {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    turnOrderIndex: params?.turnOrderIndex ?? 0,
    botPersistence: params?.botPersistence ?? mockBotPersistence()
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  turnOrderIndex? : number
  pass?: boolean
  botPersistence?: BotPersistence
}
