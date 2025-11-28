import { expect } from 'chai'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('util/getDifficultyLevelSettings', () => {
  it('getDifficultyLevelSettings', () => {
    for (const difficultyLevel of getAllEnumValues(DifficultyLevel)) {
      const settings = getDifficultyLevelSettings(difficultyLevel)
      expect(settings).to.not.undefined
    }
  })
})
