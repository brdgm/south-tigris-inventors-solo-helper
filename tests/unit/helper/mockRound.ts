import CardDeck from '@/services/CardDeck'
import Player from '@/services/enum/Player'
import { Round, RoundTurn } from '@/store/state'
import mockCardDeck from './mockCardDeck'
import DummyCardDeck from '@/services/DummyCardDeck'
import mockDummyCardDeck from './mockDummyCardDec'

export default function mockRound(params?: MockRoundParams) : Round {
  const round : Round = {
    round: params?.round ?? 1,
    startPlayer: params?.startPlayer ?? Player.PLAYER,
    initialCardDeck: params?.initialCardDeck?.toPersistence() ?? mockCardDeck().toPersistence(),
    dummyCardDeck: params?.dummyCardDeck?.toPersistence() ?? mockDummyCardDeck().toPersistence(),
    turns: params?.turns ?? []
  }
  // renumber turnOrderIndex
  let previousTurn = 0
  let turnOrderIndex = 0
  for (const turn of round.turns) {
    if (turn.turn != previousTurn) {
      turnOrderIndex = 0
      previousTurn = turn.turn
    }
    turn.turnOrderIndex = turnOrderIndex++
  }
  return round
}

export interface MockRoundParams {
  round? : number
  turns? : RoundTurn[]
  startPlayer? : Player,
  initialCardDeck? : CardDeck,
  dummyCardDeck? : DummyCardDeck
}
