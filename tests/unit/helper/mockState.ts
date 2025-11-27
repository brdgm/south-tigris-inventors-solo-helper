import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import RoundCount from '@/services/enum/RoundCount'
import { Round, State } from '@/store/state'

export default function mockState(params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.LEVEL_1,
      roundCount: params?.roundCount ?? RoundCount.STANDARD_4_ROUNDS,
      expansions: params?.expansions ?? []
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  roundCount?: RoundCount
  expansions?: Expansion[]
  rounds?: Round[]
}
