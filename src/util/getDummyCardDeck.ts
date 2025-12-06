import DummyCardDeck from '@/services/DummyCardDeck'
import { State } from '@/store/state'

/**
 * Get dummy player card deck for current round.
 * @param state State
 * @param round Current round
 */
export default function getDummyCardDeck(state : State, round : number) : DummyCardDeck {
  const persistence = state.rounds.find(r => r.round==round)?.dummyCardDeck
  if (persistence) {
    return DummyCardDeck.fromPersistence(persistence)
  }
  return DummyCardDeck.new()
}