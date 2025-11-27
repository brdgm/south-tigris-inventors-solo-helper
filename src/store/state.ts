import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'
import RoundCount from '@/services/enum/RoundCount'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1,
      setup: {
        difficultyLevel: DifficultyLevel.LEVEL_1,
        roundCount: RoundCount.STANDARD_4_ROUNDS,
        expansions: []
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    },
    setupToggleExpansion(expansion: Expansion) : void {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    storeRound(round : Round) : void {
      this.rounds = this.rounds.filter(item => item.round < round.round)
      this.rounds.push(round)
    },
    storeRoundTurn(roundTurn : RoundTurn) : void {
      const round = this.rounds.find(item => item.round == roundTurn.round)
      if (!round) {
        throw new Error(`Round ${roundTurn.round} not found.`)
      }
      round.turns = round.turns.filter(item => (item.turn < roundTurn.turn) || (item.turn == roundTurn.turn && item.turnOrderIndex < roundTurn.turnOrderIndex))
      round.turns.push(roundTurn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  roundCount: RoundCount
  expansions: Expansion[]
  debugMode?: boolean
}

export interface Round {
  round: number
  turns: RoundTurn[]
}
export interface RoundTurn {
  round: number
  turn: number
  turnOrderIndex: number
  botPersistence: BotPersistence
}
export interface BotPersistence {
  cardDeck: CardDeckPersistence
}
export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
  reserve: number[]
}
export interface DummyCardDeckPersistence {
  pile: number[]
  discard: number[]
}
