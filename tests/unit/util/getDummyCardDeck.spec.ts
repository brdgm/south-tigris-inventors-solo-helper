import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockDummyCardDeck from '../helper/mockDummyCardDec'
import getDummyCardDeck from '@/util/getDummyCardDeck'

describe('util/getDummyCardDeck', () => {
  it('getDummyCardDeck', () => {
    const state = mockState({rounds: [
      mockRound({round:1, dummyCardDeck:mockDummyCardDeck({pile:[1,2,3],discard:[4]})})
    ]})
    expect(getDummyCardDeck(state, 1).currentCard?.id).to.eq(4)
    expect(getDummyCardDeck(state, 2)).to.not.undefined
  })
})
