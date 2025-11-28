import DifficultyLevel from '@/services/enum/DifficultyLevel'

/**
 * Get settings for difficulty level.
 * @param difficultyLevel Difficulty level
 * @returns Difficulty level settings
 */
export default function getDifficultyLevelSettings(difficultyLevel : DifficultyLevel) : DifficultyLevelSettings {
  switch (difficultyLevel) {
    case DifficultyLevel.LEVEL_1:
      return { }
    case DifficultyLevel.LEVEL_2:
      return { additionalSetupSilver: 3, additionalSetupInfluence: 1 }
    case DifficultyLevel.LEVEL_3:
      return { additionalSetupSilver: 3, additionalSetupInfluence: 1, additionalDiceSchemeCards: 1 }
    case DifficultyLevel.LEVEL_4:
        return { additionalSetupSilver: 3, additionalSetupInfluence: 1, additionalDiceSchemeCards: 1, additionalWorkerSchemeCards: 1 }
    default:
      throw new Error(`Invalid difficulty level: ${difficultyLevel}`)
  }
}

export interface DifficultyLevelSettings {
  additionalSetupSilver?: number
  additionalSetupInfluence?: number
  additionalDiceSchemeCards?: number
  additionalWorkerSchemeCards?: number
}
